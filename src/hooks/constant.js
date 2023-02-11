export const trimAddress = (addr) => {
  return `${addr.substring(0, 8)}...${addr.substring(addr.length - 8)}`;
};

export const contract = {
  56: {
    multicallAddress: "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb",
  },
  default: {
    multicallAddress: "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb",
  },
};
