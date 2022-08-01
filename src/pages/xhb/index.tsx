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
import { ExternalLink } from "../../theme";
import { toWei } from "web3-utils";
import { shortenAddress } from "../../utils";
import airdropAPI from "../../webAPI/airdropAPI";
import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../utils/wallet";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { BigNumber } from "@ethersproject/bignumber";

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
  const navigate = useNavigate();
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
        const res = await airdropAPI.mintAPI(account, response.hash);
        if (res.ok == 1) {
          // todo you have an airdrop
          setMsg("You have an airdrop, go to claim in about 3s");
          setTimeout(() => {
            navigate("/blind-box");
          }, 3000);
        }
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
      <Right className="panel">
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
            color: "#FFFFFF",
          }}
        >
          Mint
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Address: {account ? shortenAddress(account) : ""}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          NFTs: {totalSupply}/11100
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Price: {price} ETH
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "#FFFFFF",
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
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              color: "#ffffff",
            }}
          >
            {" "}
            OR{" "}
          </div>
          <div
            style={{
              textTransform: "uppercase",
            }}
          >
            <CrossmintPayButton
              collectionTitle="Hot Box OG"
              collectionDescription={`Hot Box OG is a mystery airdrop collection for XTincT's upcoming album "Melancholy Dr."  Smoke some Hot Box OG in the metaverse as we cruise thru Melancholy Drive.`}
              collectionPhoto="https://teaswap.mypinata.cloud/ipfs/QmSRysXV7XRAJ3dsZMA3fdSxiUYjVTKhHw1gTM29GsbXmC"
              clientId="ae21e18e-aa37-4ded-ac21-3ff49dae63f1"
              mintConfig={{ type: "erc-721", price: price, _count: "1" }}
            />
          </div>
          {account && chainId === xhbChainId && (
            <div>
              {
                <div style={{ marginTop: 20, marginLeft: -20 }}>
                  <NormalButton
                    style={{
                      padding: 0,
                      backgroundColor: "#FFFFFF",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      window.open(
                        "https://etherscan.io/token/" + contractAddresses
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
                      backgroundColor: "#FFFFFF",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      window.open("https://opensea.io/collection/hotboxog");
                    }}
                    children="OPENSEA"
                  />
                </div>
              }
            </div>
          )}

          {account && chainId !== xhbChainId && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "rgb(37, 232, 255)",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(xhbChainId);
                }}
                children="Switch to Eth Mainnet  to  Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://etherscan.io/tx/${hash}`}>
                View on ethereum scan
              </ExternalLink>
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
  background: url("https://teaswap.mypinata.cloud/ipfs/QmPYA9QPcMHg1qUYfeBSDtbMT4PjTH2azinpjvN7dYASpF");
  background-size: 100% 100%;
  padding: 100px 0;
  @media (max-width: 768px) {
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
