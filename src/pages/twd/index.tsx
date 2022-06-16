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
  useTwdBalance,
  useTwdPrice,
  useTwdContract,
  twdChainId,
  contractAddresses
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
// import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { BigNumber } from "@ethersproject/bignumber";

const names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const twdContract = useTwdContract();
  // const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const twdBalance = useTwdBalance(account ?? "", twdContract, chainId);
  const totalSupply = useTotalSupply(twdContract, chainId);
  const price = useTwdPrice(twdContract, chainId);
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  console.log({ twdContract });

  const handleChange = async (e: any) => {
    setMsg("");
    setHash("");
    setAmount(e.target.value);
    if (!twdContract || e.target.value == "Mint") return;
    const args = [JSBI.BigInt(e.target.value).toString()];
    const estimatedGas = await twdContract.estimateGas.mint(...args).catch(() => {
      return BigNumber.from(1950000)
    })
    console.log("estimatedGas", estimatedGas)
    twdContract
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
        <img src="https://teaswap.mypinata.cloud/ipfs/QmZW99ZD6iJKgqFoyGtjqNKjoavVzse4tBa6Zf9ydiNbYd" />
      </Left>
      <Right className="panel">
        <div
          style={{
            marginBottom: "30px",
            fontSize: "1.25rem",
            color: "#FFFFFF",
          }}
        >
          TSA Web3 Dictionary Music Mystery Box
        </div>
        <div
          style={{
            fontSize: "6rem",
            marginBottom: "30px",
            color: "#09afb6",
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
          NFTs: {totalSupply}/8800
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Price: {price} MATIC
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "#FFFFFF",
          }}
        >
          <p>You can now mint up to 10 TWD.</p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p># NFTs minted by you so far: {twdBalance}/10</p>
          </div>
        </div>
        <div>
          {account && chainId === twdChainId && (
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
          {/* <div style={{
            marginTop: "10px",
            marginBottom: "10px",
            color: "#ffffff"
          }}> OR </div>
          <div style={{
            textTransform: 'uppercase'
          }}>
            <CrossmintPayButton
              collectionTitle="TSA Web3 Dictionary Music Mystery Box"
              collectionDescription="Description of TSA Web3 Wearables Dictionary."
              collectionPhoto="https://teaswap.mypinata.cloud/ipfs/QmPzc8bT3REhoU2XsyBgywZe4yArdYbZwYBetgkaZzeGfD"
              clientId="5aac8c76-13bd-4aff-b274-00da5656ac93"
              mintConfig={{ price: "1", _count: 1, _to: account}}
            />
          </div> */}
          {account && chainId === twdChainId && (
            <div>
              {
                <div style={{ marginTop: 20, marginLeft: -20 }}>
                  <NormalButton
                    style={{
                      padding: 0,
                      backgroundColor: "#09afb6",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      window.open(
                        "https://polygonscan.com/address/" + contractAddresses
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
                      backgroundColor: "#09afb6",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      window.open(
                        "https://opensea.io/collection/tsaweb3dictionarymusic"
                      );
                    }}
                    children="OPENSEA"
                  />
                </div>
              }
            </div>
          )}

          {account && chainId !== twdChainId && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(twdChainId);
                }}
                children="Switch to Polygon Mainnet  to  Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://polygonscan.com/tx/${hash}`}>
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
  background-color: rgb(128, 200, 215);
  padding: 100px 0;
  /* position: absolute;
  bottom: 100px; */

  /* ::before {
    content: "";
    display: table;
  } */
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
