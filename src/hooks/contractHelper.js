import { ethers } from "ethers";
import { getWeb3 } from "./connectors";


export const getContract = (abi, address, library) => {
  try{
    return new ethers.Contract(address, abi, library.getSigner())
  }
  catch{
    return false;
  }
}


export const formatPrice = (num) => {
  //return parseFloat(num.toFixed(decimals)).toLocaleString();
  return new Intl.NumberFormat('ja-JP').format(parseFloat(num).toFixed(3));
}


export const getWeb3Contract = (abi, address, chainId) => {
  let web3 = getWeb3(chainId);
  return new web3.eth.Contract(abi, address);
}

export const mulDecimal = (amount, decimal) => {
  return ethers.utils.parseUnits(amount.toString(), decimal);
}

