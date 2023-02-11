import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { ethers } from "ethers";
import Web3 from "web3";
import { supportNetwork, RPC_URLS } from "./network";

export const CHAIN_ID = 56;
export const infura_Id = "84842078b09946638c03157f83405213";

export const getRpcUrl = () => {
  return {
    56: "https://bsc-dataseed.binance.org",
  }[CHAIN_ID];
};

export const getWeb3 = (chainId) => {
  let setRpc = supportNetwork[chainId]
    ? supportNetwork[chainId].rpc
    : supportNetwork["default"].rpc;
  return new Web3(setRpc);
};

export const supportChainId = Object.keys(supportNetwork).map(function (key) {
  return parseInt(key);
});

export const injected = new InjectedConnector({
  supportedChainIds: supportChainId,
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
  infuraId: infura_Id,
});

export const coinbaseWallet = new WalletLinkConnector({
  url: `https://bsc-dataseed.binance.org`,
  appName: "NovaPad",
  supportedChainIds: supportChainId,
});

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(
  getRpcUrl()
);
// export const web3 = new Web3(getRpcUrl());
