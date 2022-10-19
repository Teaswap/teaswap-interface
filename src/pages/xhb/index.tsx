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
import {calculateGasMargin, shortenAddress} from "../../utils";
// import airdropAPI from "../../webAPI/airdropAPI";
import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../utils/wallet";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { BigNumber } from "@ethersproject/bignumber";
import AddToken from "../../components/AddToken";

const names = [1, 2];

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
        gasLimit: calculateGasMargin(estimatedGas),
        value: toWei(String(e.target.value * parseFloat(price))),
      })
      .then(async (response: TransactionResponse) => {
        console.log("buy: res", { response });
        setHash(response.hash);
        setMsg("You have an airdrop, go to claim in about 3s");
        setTimeout(() => {
          navigate("/thb");
        }, 3000);
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
          <Text>
            HotBox Og
          </Text>
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
          <Text>
            Address: {account ? shortenAddress(account) : ""}
          </Text>
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            // color: "rgb(37, 232, 255)",
          }}
        >
          <Text>
            NFTs: {totalSupply}/11100
          </Text>
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            // color: "rgb(37, 232, 255)",
          }}
        >
          <Text>
            Price: {price} ETH
          </Text>
        </div>
        <div
          style={{
            fontSize: "1rem",
            // color: "rgb(37, 232, 255)",
          }}
        >
          <p>
            <Text>
              You can now mint up to 10 XHB.
            </Text>
          </p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p>
              <Text>
                # NFTs minted by you so far: {xhbBalance}/10
              </Text>
            </p>
          </div>
        </div>
        <div>
          {account && chainId === xhbChainId && (
            <FormControl
              style={{
                backgroundColor: "#000000"
              }}
            >
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
              // color: "rgb(37, 232, 255)",
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
                      backgroundColor: "#1e1e1e",
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
                      backgroundColor: "#1e1e1e",
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
              <AddToken contractAddress={contractAddresses} symbol={'XHB'} bgColor='#1e1e1e' />
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
                children="Switch to Eth Mainnet  to  Mint"
              />
            </div>
          )}

          {(
            <div style={{ marginTop: 40, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#1e1e1e",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                  minWidth: "300px",
                }}
                onClick={() => {
                  window.open('https://forms.gle/icHG6ZtrpAppySV88')
                }}
                children="Questions?"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://opensea.io/collection/hotboxog`}>
              View on OpenSea
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
  background: url("https://teaswap.mypinata.cloud/ipfs/QmQiXeRzxZCUTKjGeiQAFByYeG2JRYGsWk6BWnrrhkfhvr/hotboxOG_minting%20background_2.jpg.png");
  background-size: 100% 100%;
  padding: 100px 0;
  @media (max-width: 768px) {
    background: url("https://teaswap.mypinata.cloud/ipfs/QmQiXeRzxZCUTKjGeiQAFByYeG2JRYGsWk6BWnrrhkfhvr/hotboxogWeb3IRO%20mobile%20image.jpg");
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

const Text = styled.span`
  padding: 4px;
  color: #fff;
  background-color: black;
`

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
