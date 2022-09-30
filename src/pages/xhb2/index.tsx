import React, { useState } from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../hooks";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { NormalButton } from "../../components/NFTButton";

import {
  useTotalSupply,
  useXhbBalance,
  useXhbPrice,
  useXhbContract,
  xhbChainId,
  contractAddresses,
} from "./hooks";
// import { useETHBalances } from "../../state/wallet/hooks";
import { JSBI } from "@teaswap/uniswap-sdk";
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { toWei } from "web3-utils";
import { shortenAddress } from "../../utils";
// import airdropAPI from "../../webAPI/airdropAPI";
// import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../utils/wallet";
import { BigNumber } from "@ethersproject/bignumber";
// import airdropAPI from "../../webAPI/airdropAPI";
import AddToken from "../../components/AddToken";

const names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const xhbContract = useXhbContract();
  // const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const xhbBalance = useXhbBalance(account ?? "", xhbContract, chainId);
  const totalSupply = useTotalSupply(xhbContract, chainId);
  const price = useXhbPrice(xhbContract, chainId);
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();
  console.log({ xhbContract });

  const handleChange = async (e: any) => {
    setMsg("");
    setHash("");
    setAmount(e.target.value);
    if (!xhbContract || e.target.value == "Mint") return;
    const args = [JSBI.BigInt(e.target.value).toString()];
    const estimatedGas = await xhbContract.estimateGas
      .mint(...args)
      .catch(() => {
        return BigNumber.from(1950000);
      });
    console.log("estimatedGas", estimatedGas);
    xhbContract
      .mint(...args, {
        gasLimit: 1950000,
        value: toWei(String(e.target.value * parseFloat(price))),
      })
      .then(async (response: TransactionResponse) => {
        console.log("buy: res", { response });
        setHash(response.hash);
        // const res = await airdropAPI.mintAPI(account, response.hash);
        // if (res.ok == 1) {
        //   // todo you have an airdrop
        //   setMsg("You have an airdrop, go to claim in about 3s");
        //   setTimeout(() => {
        //     navigate("/blind-box");
        //   }, 3000);
        // }
      })
      .catch((error: any) => {
        console.log({
          gasLimit: 350000,
          value: toWei(String(e.target.value * parseFloat(price))),
        });
        setMsg("int error: " + error.mesage);
      });
  };
  return (
    <Wrapper>
      <Left className="panel">
        {/* <img src="https://teaswap.mypinata.cloud/ipfs/QmSRysXV7XRAJ3dsZMA3fdSxiUYjVTKhHw1gTM29GsbXmC" /> */}
      </Left>
      <Right style={{color: '#ffffff'}} className="panel">
        <div
          style={{
            marginBottom: "30px",
            fontSize: "1.25rem",
            color: "#FFFFFF",
          }}
        >
          HotBox Og
        </div>
        <div
          style={{
            fontSize: "6rem",
            marginBottom: "30px",
            color: "#FFD014",
          }}
        >
          Mint
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#ffffff",
          }}
        >
          Address: {account ? shortenAddress(account) : ""}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            // color: "rgb(37, 232, 255)",
          }}
        >
          NFTs: {totalSupply}/200
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            // color: "rgb(37, 232, 255)",
          }}
        >
          Price: {price} ETH
        </div>
        <div
          style={{
            fontSize: "1rem",
            // color: "rgb(37, 232, 255)",
          }}
        >
          <p>You can now mint up to 10 XHB.</p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p># NFTs minted by you so far: {xhbBalance}/10</p>
          </div>
        </div>
        <div>
          {account && chainId === xhbChainId && (
            <FormControl>
              {/* <InputLabel id="tsp-mint">Mint</InputLabel> */}
              <Select
                style={{ minWidth: 300 }}
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
                onChange={handleChange}
                label="Mint"
                value={amount}
                input={<OutlinedInput />}
                renderValue={() => {
                  if (!amount) {
                    return <span style={{ color: "#fff" }}>Mint</span>;
                  }

                  return amount;
                }}
              >
                <MenuItem value="Mint">
                  <span>Mint</span>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {account && chainId === xhbChainId && (
            <div>
              {
                <div style={{ marginTop: 20, marginLeft: -20 }}>
                  <NormalButton
                    style={{
                      padding: 0,
                      backgroundColor: "#1e1e1e",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      window.open(
                        "https://optimistic.etherscan.io/token/" + contractAddresses
                      );
                    }}
                    children="SMART CONTRACT"
                  />
                </div>
              }
              {
                <div style={{ marginTop: 20, marginLeft: -20 }}>
                  <NormalButton
                    style={{
                      padding: 0,
                      backgroundColor: "#1e1e1e",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      window.open("https://quixotic.io/collection/xhb");
                    }}
                    children="VIEW ON QUIXOTIC"
                  />
                </div>
              }
              <AddToken contractAddress={contractAddresses} symbol={'XHB2'} bgColor='#1e1e1e' />
            </div>
          )}

          {account && chainId !== xhbChainId && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#1e1e1e",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(xhbChainId);
                }}
                children="Switch to Optimism Mainnet  to  Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              {/*<ExternalLink href={`https://opensea.io/collection/hotboxog`}>*/}
              {/*View on OpenSea*/}
              {/*</ExternalLink>*/}
            </div>
          )}
          {msg && <div className="mint-msg">{msg}</div>}
        </div>
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  background: url("https://teaswap.mypinata.cloud/ipfs/QmeezTah5C9jcdeDzKJ3QYPZegjCmctZa6dysC9iCMzwBk");
  background-size: 100% 100%;
  padding: 100px 0;
  @media (max-width: 768px) {
    background: url("https://teaswap.mypinata.cloud/ipfs/QmSCQa68C11wn8Jj4aLkEkehVYrUwyPBb81tgLAxWmYX5M");
    flex-direction: column;
    height: auto;
  }
  /* #f2d3f8 */
  .panel {
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      padding: 20px;
    }
  }
`;

const Left = styled.div`
  @media (max-width: 768px) {
    margin-top: 30px;
  }
  img {
    width: 60%;
  }
`;

const Right = styled.div`
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  > div {
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }
`;
