import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../hooks";
import FormControl from "@mui/material/FormControl";
import { NormalButton } from "../../components/NFTButton";

import { useTotalSupply, useBlindBoxBalance, useBlindBoxPrice } from "./hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { useBlindBoxContract } from "../../hooks/useContract";
import { ChainId, JSBI } from "@teaswap/uniswap-sdk";
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ExternalLink } from "../../theme";
import { toWei } from "web3-utils";
import { shortenAddress } from "../../utils";
import airdropAPI from '../../webAPI/airdropAPI'
import { switchNetwork } from "../../utils/wallet";
import { useNavigate } from "react-router-dom";

const symbol = "BBBPENGUIN"

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const [blindBoxBalance] = useBlindBoxBalance(account ?? "");
  const [totalSupply] = useTotalSupply();
  const [price]= useBlindBoxPrice();
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const blindBoxContract = useBlindBoxContract();
  const navigate = useNavigate()
  useEffect(() => {
    airdropAPI.getCountAPI(account).then((res: any) => {
      if (res.count) {
        setAmount(res.count)
      }
    })
  }, [account])

  const onMint = async () => {
    setMsg("");
    setHash("");
    if (!blindBoxContract) return;
    if (!amount) {
      setMsg("You have no airdrop");
      return;
    }
    const args = [JSBI.BigInt(amount).toString()];
    blindBoxContract
      .mint(...args, {
        gasLimit: 350000,
        value: toWei(String(amount * parseFloat(price))),
      })
      .then(async (response: TransactionResponse) => {
        console.log("buy: res", { response });
        // todo send airdrop
        setHash(response.hash);
        await airdropAPI.mintedAPI(account)
      })
      .catch(async (error: any) => {
        console.log({
          gasLimit: 350000,
          value: toWei(String(amount * parseFloat(price))),
        });
        setMsg("int error: " + error.mesage);
        const res = await airdropAPI.mintAPI(account, "asdfsadf")
        console.log("airdrop res", res)
      });
  };
  console.log("blindBox: ", { blindBoxBalance, balance });
  return (
    <Wrapper>
      <Left className="panel">
        <img src="/brother2.gif" />
      </Left>
      <Right className="panel">
        <div
          style={{
            marginBottom: "30px",
            fontSize: "1.25rem",
            color: "#FFFFFF",
          }}
        >
          Blink Box
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
          Address: {shortenAddress(account ?? "")}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          NFTs: {totalSupply}/10000
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Balance: {blindBoxBalance} {blindBoxBalance > 0 && (
            <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  navigate("/staking")
                }}
                children="Go Stake"
              />
          )}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Price: 0 BNB
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Mint fee: 0.01 BNB
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "#FFFFFF",
          }}
        >
          <p>You have {amount} airdrop {symbol}.</p>
          {/* <div style={{ position: "relative", top: "-10px" }}>
            <p># NFTs minted by you so far: {blindBoxBalance}/3</p>
          </div> */}
        </div>
        <div>
          {account && chainId === ChainId.BSC_MAINNET && (
            <FormControl>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={onMint}
                children="Claim"
              />
            </FormControl>
          )}

          {account && chainId !== ChainId.BSC_MAINNET && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(ChainId.BSC_MAINNET)
                }}
                children="Switch to BSC Mainnet  to  Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://bscscan.com/tx/${hash}`}>
                View on Etherscan
              </ExternalLink>
            </div>
          )}
          {msg && <div className="error-msg">{msg}</div>}
        </div>
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* color: #09afb6; */
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #d6d952;
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
