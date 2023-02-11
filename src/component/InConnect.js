import React from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";

import { useEffect, useState } from "react";
import { injected, walletconnect, coinbaseWallet } from "../hooks/connectors";
import Modal from "react-bootstrap/Modal";
import { supportNetwork } from "../hooks/network";
import useEagerConnect from "../hooks/useWeb3";

export const InConnect = function () {
  const context = useWeb3React();
  const { connector, account, activate, deactivate, chainId, active, error } =
    context;
  const [show, setShow] = useState(false);
  const [networkshow, setNetworkshow] = useState(false);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEagerConnect();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return "Metamask not deteced";
    }
    if (error instanceof UnsupportedChainIdError) {
      return (
        <span
          className="btn-text"
          onClick={(e) => switchNetwork(supportNetwork["default"].chainId)}
        >
          <img
            src={require("../images/heartbeat.png").default}
            alt="wrong-network"
            height="17px"
            width="17px"
            className="mx-2"
          />
          Wrong Network
        </span>
      );
    }

    deactivate(injected);
  }

  const activating = (connection) => connection === activatingConnector;
  const connected = (connection) => connection === connector;

  const switchNetwork = (networkid) => {
    try {
      // @ts-ignore
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${networkid.toString(16)}` }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <React.Fragment>
      <div>
        {error && (
          <button
            type="button"
            className="btn"
            onClick={() => {
              setActivatingConnector();
            }}
          >
            {getErrorMessage(error)}
          </button>
        )}
        {!error && (
          <>
            {!active &&
              (!connected(injected) ||
                !connected(walletconnect) ||
                !connected(coinbaseWallet)) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {(activating(injected) ||
                    activating(walletconnect) ||
                    activating(coinbaseWallet)) && (
                    <span className="btn-text">
                      <i className="mdi mdi-wallet-plus-outline me-1"></i>
                      Connecting...
                    </span>
                  )}
                  {(!activating(injected) ||
                    !activating(walletconnect) ||
                    !activating(coinbaseWallet)) && (
                    <span className="btn-text">
                      <i className="mdi mdi-wallet-plus-outline me-1"></i>
                      <span>Connect Wallet</span>
                    </span>
                  )}
                </button>
              )}
          </>
        )}
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="sm"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            <h6>Connect to wallet</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div
            data-bs-dismiss="modal"
            id="wallet-connect-metamask"
            className="c-list border-b px-3 py-2 d-flex align-items-center"
            onClick={() => {
              activate(injected);
              setShow(false);
            }}
          >
            <img
              src={require("../images/metamask.svg").default}
              width="30px"
              className="me-2"
              alt="bscpad"
            />
            <div className="text-white">Metamask</div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={networkshow}
        onHide={() => setNetworkshow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="ms"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a Network</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {Object.keys(supportNetwork).map(function (key) {
                if (key === "default")
                  return <React.Fragment key={key}></React.Fragment>;
                return (
                  <div className="col-12" key={key}>
                    <button
                      className="btn btn-dark modal-btn-connect"
                      onClick={() => {
                        switchNetwork(supportNetwork[key].chainId);
                        setNetworkshow(false);
                      }}
                    >
                      <div className="div-modal-btn">
                        <img
                          src={supportNetwork[key].image}
                          alt="Meta-mask-Im"
                          className="modal-img"
                        />
                        <div className="text-modal-line">
                          {supportNetwork[key].name}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default InConnect;
