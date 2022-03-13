import { hexValue } from 'ethers/lib/utils';

// switch network to ethereum
export const switchNetwork = async (chainId: number) => {
  try {
    await window.ethereum?.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexValue(chainId) }],
    });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};
