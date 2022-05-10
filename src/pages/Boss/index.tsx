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
  useBalance,
  usePrice,
  useBossContract,
  useMaxPerWallert,
} from "./hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { JSBI } from "@teaswap/uniswap-sdk";
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ExternalLink } from "../../theme";
import { toWei } from "web3-utils";
import { shortenAddress } from "../../utils";
import airdropAPI from "../../webAPI/airdropAPI";
import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../utils/wallet";

const names = [1, 2, 3];

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const bossContract = useBossContract();
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const bossBalance = useBalance(account, bossContract, chainId);
  const totalSupply = useTotalSupply(bossContract, chainId);
  const price = usePrice(bossContract, chainId);
  const maxPerWallert = useMaxPerWallert(bossContract, chainId);
  console.log("boss", {
    bossContract,
    account,
    chainId,
    balance,
    bossBalance,
    totalSupply,
    price,
    maxPerWallert,
  });

  const handleChange = async (e: any) => {
    setMsg("");
    setHash("");
    setAmount(e.target.value);
    if (!bossContract || e.target.value == "Mint") return;
    const args = [JSBI.BigInt(e.target.value).toString()];
    bossContract
      .mint(...args, {
        gasLimit: 350000,
        value: toWei(String(e.target.value * parseFloat(price))),
      })
      .then(async (response: TransactionResponse) => {
        console.log("buy: res", { response });
        // todo send airdrop
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
      .catch(async (error: any) => {
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
        <img src="/art1.gif" />
      </Left>
      <Right className="panel">
        <div
          style={{
            marginBottom: "30px",
            fontSize: "1.25rem",
            color: "#FFFFFF",
          }}
        >
          Who's the Boss?
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
          NFTs: {totalSupply}/300
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
          <p>You can now mint up to 3 WTB.</p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p>
              # NFTs minted by you so far: {bossBalance}/{maxPerWallert}
            </p>
          </div>
        </div>
        <div>
          {account && chainId == 137 && (
            <FormControl>
              {/* <InputLabel id="boss-mint">Mint</InputLabel> */}
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
          {account && chainId === 137 && (
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
                        "https://polygonscan.com/address/0x5e2dfa18bef12d45164d181628bd8ce2220ff498"
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
                        "https://opensea.io/collection/who-is-the-boss-v2"
                      );
                    }}
                    children="OPENSEA"
                  />
                </div>
              }
            </div>
          )}

          {account && chainId != 137 && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(137);
                }}
                children="Switch to Polygon Mainnet to Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://polygonscan.com/tx/${hash}`}>
                View on Etherscan
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
  padding: 100px 0;
  background-color: rgb(1, 91, 187);
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
  align-items: flex-start;
  > div {
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }
`;
