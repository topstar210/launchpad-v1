import { contract } from "../hooks/constant";
import { supportNetwork } from "./network";
import Multicall from "@dopex-io/web3-multicall";
import multiCallAbi from "../json/multicall.json";
import { getWeb3 } from "./connectors";

export const MulticallContractWeb3 = (chainId) => {
  let multicallAddress = contract[chainId]
    ? contract[chainId].multicallAddress
    : contract["default"].multicallAddress;

  let provider = supportNetwork[chainId]
    ? supportNetwork[chainId].rpc
    : supportNetwork["default"].rpc;

  const multicall = new Multicall({
    multicallAddress,
    provider,
  });

  return multicall;
};

export const multiCallContractConnect = (chainId) => {
  let multicallAddress = contract[chainId]
    ? contract[chainId].multicallAddress
    : contract["default"].multicallAddress;
  let web3 = getWeb3(chainId);
  return new web3.eth.Contract(multiCallAbi, multicallAddress);
};
