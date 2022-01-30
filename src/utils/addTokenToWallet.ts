/* eslint-disable no-console */

interface Token {
  address: string,
  symbol: string,
  decimals:number,
  image: string
}

const addTokenToWallet = async (token: Token) => {
  const { address, symbol, decimals = 18, image } = token;
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    if (!isMetamask) return
    const wasAdded = await window.ethereum?.request({
      method: 'wallet_watchAsset',
      params:{
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address, // The address that the token is at.
          symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals, // The number of decimals in the token
          image, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.error(error);
  }
};

export default addTokenToWallet;

export async function addTSA (){ 
  await addTokenToWallet({
    address: '0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b',
    symbol: 'TSA',
    decimals: 18,
    image: 'https://www.teaswap.art/default-token-list/images/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b.png'
  })
}