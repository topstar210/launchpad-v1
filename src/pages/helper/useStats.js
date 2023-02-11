import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import presalePoolAbi from "../../json/presalePool.json";
import ERC20Abi from "../../json/ERC20.json";
import {
  MulticallContractWeb3,
  multiCallContractConnect,
} from "../../hooks/useContracts";
import { getWeb3 } from "../../hooks/connectors";
import tokenAbi from "../../json/token.json";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { supportNetwork } from "../../hooks/network";
import { currencies } from "../../hooks/currencies";

export const useCommonStats = (update) => {
  const context = useWeb3React();
  const { chainId } = context;
  let history = useHistory();

  // let poolAddress = "0x6816e27bca20fbbe779ca9725d48c1e01a02943c";

  const location = useLocation();
  let urlAddress = location.pathname.split("/").pop();
  const search = useLocation().search;
  const queryChainId = new URLSearchParams(search).get("chainId");

  const getCurrencyList = (currencies) => {
    let currencyList = [];
    currencies.map((currency, index) => {
      currencyList[currency.address] = currency.symbol;
    });
    return currencyList;
  };

  let currencyList = getCurrencyList(
    currencies[chainId] !== undefined
      ? currencies[chainId]
      : currencies["default"]
  );

  let web3 = getWeb3(queryChainId ? queryChainId : chainId);
  let poolContract = new web3.eth.Contract(presalePoolAbi, urlAddress);

  const [stats, setStats] = useState({
    endTime: 0,
    startTime: 0,
    hardCap: 0,
    softCap: 0,
    liquidityListingRate: 0,
    liquidityLockDays: 0,
    liquidityPercent: 0,
    liquidityUnlockTime: 0,
    maxContribution: 0,
    poolDetails: 0,
    poolState: 0,
    rate: 0,
    remainingContribution: 0,
    tgeDate: 0,
    tgeBps: 0,
    cycleBps: 0,
    token: 0,
    totalClaimed: 0,
    totalRaised: 0,
    totalVestedTokens: 0,
    useWhitelisting: 0,
    minContribution: 0,
    tokenName: "",
    tokenDecimal: 0,
    tokenSymbol: "",
    percentageRaise: 0,
    tokenSupply: 0,
    refundType: 0,
    cycle: 0,
    poolAddress: "",
    governance: 0,
    kyc: 0,
    audit: 0,
    auditStatus: 0,
    kycStatus: 0,
    currencyAddress: "0x0000000000000000000000000000000000000000",
    currencySymbol: supportNetwork[queryChainId ? queryChainId : chainId]
      ? supportNetwork[queryChainId ? queryChainId : chainId].symbol
      : supportNetwork["default"].symbol,
  });

  const mc = MulticallContractWeb3(queryChainId ? queryChainId : chainId);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await mc.aggregate([
          poolContract.methods.endTime(), //0
          poolContract.methods.startTime(), //1
          poolContract.methods.hardCap(), //2
          poolContract.methods.softCap(), //3
          poolContract.methods.liquidityListingRate(), //4
          poolContract.methods.liquidityLockDays(), //5
          poolContract.methods.liquidityPercent(), //6
          poolContract.methods.liquidityUnlockTime(), //7
          poolContract.methods.maxContribution(), //8
          poolContract.methods.poolDetails(), //9
          poolContract.methods.poolState(), //10
          poolContract.methods.rate(), //11,
          poolContract.methods.remainingContribution(), //12
          poolContract.methods.tgeDate(), //13
          poolContract.methods.tgeBps(), //14
          poolContract.methods.cycle(), //15
          poolContract.methods.cycleBps(), //16
          poolContract.methods.token(), //17
          poolContract.methods.totalClaimed(), //18
          poolContract.methods.totalRaised(), //19
          poolContract.methods.useWhitelisting(), //20
          poolContract.methods.minContribution(), //21
          poolContract.methods.refundType(), //22
          poolContract.methods.governance(), //23
          poolContract.methods.kyc(), //24
          poolContract.methods.audit(), //25
          poolContract.methods.auditStatus(), //26
          poolContract.methods.kycStatus(), //27
          poolContract.methods.currency(),
        ]);

        let tokenContract = new web3.eth.Contract(tokenAbi, data[17]);

        const tokendata = await mc.aggregate([
          tokenContract.methods.name(),
          tokenContract.methods.decimals(),
          tokenContract.methods.symbol(),
          tokenContract.methods.totalSupply(),
        ]);

        setStats({
          endTime: data[0],
          startTime: data[1],
          hardCap: data[2] / Math.pow(10, 18),
          softCap: data[3] / Math.pow(10, 18),
          liquidityListingRate: data[4] / Math.pow(10, tokendata[1]),
          liquidityLockDays: data[5],
          liquidityPercent: data[6],
          liquidityUnlockTime: data[7],
          maxContribution: data[8] / Math.pow(10, 18),
          poolDetails: data[9],
          poolState: data[10],
          rate: data[11] / Math.pow(10, tokendata[1]),
          remainingContribution: data[12] / Math.pow(10, 18),
          tgeDate: data[13],
          tgeBps: data[14],
          cycleBps: data[16],
          token: data[17],
          totalClaimed: data[18],
          totalRaised: data[19] / Math.pow(10, 18),
          useWhitelisting: data[20],
          minContribution: data[21] / Math.pow(10, 18),
          tokenName: tokendata[0],
          tokenDecimal: tokendata[1],
          tokenSymbol: tokendata[2],
          percentageRaise:
            (data[19] / Math.pow(10, 18) / (data[2] / Math.pow(10, 18))) * 100,
          tokenSupply: tokendata[3] / Math.pow(10, tokendata[1]),
          refundType: data[22],
          cycle: data[15],
          poolAddress: urlAddress,
          governance: data[23],
          kyc: data[24],
          audit: data[25],
          auditStatus: data[26],
          kycStatus: data[27],
          currencyAddress: data[28],
          currencySymbol: currencyList[data[28].toLowerCase()],
        });
      } catch (err) {
        toast.error("wrong network selected !");
        history.push("/sale-list");
      }
    };

    if (mc) {
      fetch();
    } else {
      setStats({
        endTime: 0,
        startTime: 0,
        hardCap: 0,
        softCap: 0,
        liquidityListingRate: 0,
        liquidityLockDays: 0,
        liquidityPercent: 0,
        liquidityUnlockTime: 0,
        maxContribution: 0,
        poolDetails: 0,
        poolState: 0,
        rate: 0,
        remainingContribution: 0,
        tgeDate: 0,
        tgeBps: 0,
        cycleBps: 0,
        token: 0,
        totalClaimed: 0,
        totalRaised: 0,
        totalVestedTokens: 0,
        useWhitelisting: 0,
        minContribution: 0,
        tokenName: "",
        tokenDecimal: 0,
        tokenSymbol: "",
        percentageRaise: 0,
        tokenSupply: 0,
        refundType: 0,
        cycle: 0,
        poolAddress: "",
        governance: 0,
        kyc: 0,
        audit: 0,
        auditStatus: 0,
        kycStatus: 0,
        currencyAddress: "0x0000000000000000000000000000000000000000",
        currencySymbol: supportNetwork[queryChainId ? queryChainId : chainId]
          ? supportNetwork[queryChainId ? queryChainId : chainId].symbol
          : supportNetwork["default"].symbol,
      });
    }
    // eslint-disable-next-line
  }, [update, chainId]);

  return stats;
};

export const useAccountStats = (updater) => {
  const context = useWeb3React();
  const { chainId, account } = context;
  const location = useLocation();
  let history = useHistory();
  let urlAddress = location.pathname.split("/").pop();
  const search = useLocation().search;
  const queryChainId = new URLSearchParams(search).get("chainId");

  let web3 = getWeb3(queryChainId ? queryChainId : chainId);

  try {
    let poolAddress = web3.utils.isAddress(urlAddress);
    let isCode = web3.eth.getCode(urlAddress);
    if (isCode === "0x" || !poolAddress) {
      history.push("/project-details");
    }
  } catch (err) {
    history.push("/");
  }

  let poolContract = new web3.eth.Contract(presalePoolAbi, urlAddress);

  const [stats, setStats] = useState({
    allowance: 0,
    balance: 0,
    contributionOf: 0,
    userAvalibleClaim: 0,
  });

  const mc = MulticallContractWeb3(queryChainId ? queryChainId : chainId);
  const mcc = multiCallContractConnect(queryChainId ? queryChainId : chainId);

  useEffect(() => {
    const fetch = async () => {
      try {
        const currency = await mc.aggregate([poolContract.methods.currency()]);

        const data = await mc.aggregate([
          mcc.methods.getEthBalance(account),
          poolContract.methods.contributionOf(account),
          poolContract.methods.userAvalibleClaim(account),
          poolContract.methods.token(),
        ]);

        let tokenContract = new web3.eth.Contract(tokenAbi, data[3]);

        const tokenDecimals = await mc.aggregate([
          tokenContract.methods.decimals(),
        ]);

        if (currency[0] !== "0x0000000000000000000000000000000000000000") {
          let currencyContract = new web3.eth.Contract(ERC20Abi, currency[0]);

          const currencyData = await mc.aggregate([
            currencyContract.methods.allowance(account, urlAddress),
            currencyContract.methods.balanceOf(account),
          ]);

          setStats({
            allowance: currencyData[0],
            balance: currencyData[1] / Math.pow(10, 18),
            contributionOf: data[1] / Math.pow(10, 18),
            userAvalibleClaim: data[2] / Math.pow(10, tokenDecimals),
          });
        } else {
          setStats({
            allowance: 0,
            balance: data[0] / Math.pow(10, 18),
            contributionOf: data[1] / Math.pow(10, 18),
            userAvalibleClaim: data[2] / Math.pow(10, tokenDecimals),
          });
        }
      } catch (err) {
        toast.error(err.reason);
        history.push("/sale-list");
      }
    };

    if (mc && account) {
      fetch();
    } else {
      setStats({
        balance: 0,
        contributionOf: 0,
        userAvalibleClaim: 0,
      });
    }
    // eslint-disable-next-line
  }, [account, updater, chainId]);

  return stats;
};
