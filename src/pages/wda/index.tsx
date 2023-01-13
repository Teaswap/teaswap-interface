import React, {useEffect, useState} from "react";
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
  contractAddresses, useMaxMintPerAccount, useMaxSupply, usePreSalePaused,
} from "./hooks";
import { useETHBalances } from "../../state/wallet/hooks";
// import { JSBI } from "@teaswap/uniswap-sdk";
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ExternalLink } from "../../theme";
import { toWei } from "web3-utils";
import {calculateGasMargin, shortenAddress} from "../../utils";
// import airdropAPI from "../../webAPI/airdropAPI";
// import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../utils/wallet";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { BigNumber } from "@ethersproject/bignumber";
import AddToken from "../../components/AddToken";
import whitelistAPI from "../../webAPI/whitelistAPI";
// import Decimal from "decimal.js";

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const [whitelist, setWhitelist] = useState(0);
  const xhbContract = useXhbContract();
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const xhbBalance = useXhbBalance(account ?? "", xhbContract, chainId);
  const totalSupply = useTotalSupply(xhbContract, chainId);
  const maxSupply = useMaxSupply(xhbContract, chainId);
  const maxMintPerAccount = useMaxMintPerAccount(xhbContract, chainId);
  const price = useXhbPrice(xhbContract, chainId);
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const preSalePaused = usePreSalePaused(xhbContract, chainId);
  // const navigate = useNavigate();
  console.log({ account, balance, preSalePaused, price, chainId });

  useEffect(() => {
    whitelistAPI.getCountAPI(account, contractAddresses, xhbChainId).then((res) => {
console.log(res);
      if (res.data > 0) {
        setWhitelist(res.data)
      }
    })
  }, [account])

  const handlePreSale = async (e: any) => {
    setMsg("");
    setHash("");
    setAmount(e.target.value);
    if (!xhbContract) return;
    if (!whitelist) {
      setMsg("Not part of presale list");
      return;
    }
    // if (new Decimal(balance?.toFixed(18) ?? 0).toNumber() <= new Decimal(e.target.value).mul(price).toNumber()) {
    //   setMsg("Insufficient balance");
    //   return;
    // }
    whitelistAPI.signAPI(account, contractAddresses, xhbChainId, e.target.value).then((res) => {
      console.log(res);
      if (!res.data) {
        setMsg("Not part of presale list");
      }else{
        const args = [res.data.amount, res.data.nonce, res.data.hash, res.data.signature];
        console.log({args})
        xhbContract
          .preSale(...args, {
            gasLimit: calculateGasMargin(BigNumber.from(350000)),
            value: toWei(String(res.data.amount * parseFloat(price))),
          })
          .then(async (response: TransactionResponse) => {
            console.log("buy: res", { response });
            setHash(response.hash);
          }).catch((err: any) => {
            console.log(err);
            setMsg("Transaction failed");
        })
      }
    })
  }

  // const handleChange = async (e: any) => {
  //   setMsg("");
  //   setHash("");
  //   setAmount(e.target.value);
  //   if (!xhbContract || e.target.value == "Mint") return;
  //   const args = [JSBI.BigInt(e.target.value).toString()];
  //   // const estimatedGas = await xhbContract.estimateGas
  //   //   .mint(...args)
  //   //   .catch(() => {
  //   //     return BigNumber.from(195000);
  //   //   });
  //   const estimatedGas = BigNumber.from(355000)
  //   console.log("estimatedGas", estimatedGas);
  //   xhbContract
  //     .mint(...args, {
  //       gasLimit: calculateGasMargin(estimatedGas),
  //       value: toWei(String(e.target.value * parseFloat(price))),
  //     })
  //     .then(async (response: TransactionResponse) => {
  //       console.log("buy: res", { response });
  //       setHash(response.hash);
  //       setMsg("You have an airdrop, go to claim in about 3s");
  //       setTimeout(() => {
  //         navigate("/thb");
  //       }, 10000);
  //       // const res = await airdropAPI.mintAPI(account, response.hash);
  //       // if (res.ok == 1) {
  //       //   // todo you have an airdrop
  //       //   setMsg("You have an airdrop, go to claim in about 3s");
  //       //   setTimeout(() => {
  //       //     navigate("/blind-box");
  //       //   }, 3000);
  //       // }
  //     })
  //     .catch((error: any) => {
  //       console.log({
  //         gasLimit: 350000,
  //         value: toWei(String(e.target.value * parseFloat(price))),
  //       });
  //       setMsg("int error: " + error.mesage);
  //     });
  // };
  return (
    <Wrapper>
      <Left className="panel">
         <img src="https://teaswap.mypinata.cloud/ipfs/QmbMGnJ61UE3ccbA4uafhwsKbjdhM9HFD4kmXAeRpdQiAw" />
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
            WEB3 Dictionary Album
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
            NFTs: {totalSupply}/{maxSupply}
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
              You can now mint up to {whitelist} TWD.
            </Text>
          </p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p>
              <Text>
                # NFTs minted by you so far: {xhbBalance}/{maxMintPerAccount}
              </Text>
            </p>
          </div>
        </div>
        <div>
          {msg && <span className="mint-msg">{msg}</span>}
        </div>
        <div>
          {preSalePaused && <Text>pre sale paused</Text>}
        </div>
        <div>
          {account && chainId === xhbChainId && !preSalePaused && (
            <FormControl
              style={{
                backgroundColor: "#000000"
              }}
            >
              {/* <InputLabel id="tsp-mint"></InputLabel> */}
              <Select
                style={{ minWidth: 300 }}
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
                onChange={handlePreSale}
                label="preSale"
                value={amount}
                input={<OutlinedInput />}
                renderValue={() => {
                  if (!amount) {
                    return <span style={{ color: "#fff", fontFamily: "" }}>Presale</span>;
                  }
                  return amount;
                }}
              >
                <MenuItem value="PreSale">
                  <span>PreSale</span>
                </MenuItem>
                {[...Array(whitelist).keys()].map((name) => (
                  <MenuItem key={name} value={name+1}>
                    {name+1}
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
              collectionTitle="Web3 Dictionary Album"
              collectionDescription={`Web3 Dictionary Album 100 is designed to provide very basic, simple, clear and easy to understand introductory explanations of new terms and technology surrounding the so called “Web3” as well as the “ Metaverse ”. These include things like blockchain, bitcoin, decentralized finance, NFTs, and more.`}
              collectionPhoto="https://teaswap.mypinata.cloud/ipfs/QmbMGnJ61UE3ccbA4uafhwsKbjdhM9HFD4kmXAeRpdQiAw"
              clientId="078967bf-62a7-4b3e-87e3-652f91aa963a"
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
                      window.open("https://opensea.io/collection/web3dictionaryalbum");
                    }}
                    children="OPENSEA"
                  />
                </div>
              }
              <AddToken contractAddress={contractAddresses} symbol={'TWD'} bgColor='#1e1e1e' />
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
            <div style={{ marginTop: 20, marginLeft: -20 }}>
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
              <ExternalLink href={`https://opensea.io/collection/web3dictionaryalbum`}>
                <div
                  style={{
                    display: "inline-block",
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#1e1e1e",
                    color: "#FFFFFF",
                    letterSpacing: ".1rem",
                    minWidth: "300px",
                    textAlign: "center",
                  }}
                >
                  View on OpenSea
                </div>
              </ExternalLink>
            </div>
          )}
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
  background-color: #60a7ac;
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