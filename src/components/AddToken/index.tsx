import React from 'react';
import {NormalButton} from "../NFTButton";
import addTokenToWallet from "../../utils/addTokenToWallet";
import MetamaskIcon from "../../assets/images/metamask.png";

interface Props {
  color?: string
  bgColor?: string
  contractAddress: string
  symbol: string
  decimal?: number
  image?: string
}

function Index({color, bgColor, contractAddress, symbol, decimal=0, image=''}: Props) {
  return (
    <div style={{ marginTop: 20, marginLeft: -20 }}>
      <NormalButton
        style={{
          padding: 0,
          backgroundColor: bgColor ? bgColor : "#1e1e1e",
          color: color ? color : "#FFFFFF",
          cursor: "pointer",
          minWidth: "300px",
        }}
        onClick={async () => {
          await addTokenToWallet({
            address: contractAddress,
            symbol: symbol,
            decimals: decimal,
            image: image
          })
        }}
      >
        <span>Add Token to Wallet</span> <img style={{marginLeft: 5}} src={MetamaskIcon} width={15} />
      </NormalButton>
    </div>
  );
}

export default Index;
