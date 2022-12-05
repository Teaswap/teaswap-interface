import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../hooks";
import { NormalButton } from "../../components/NFTButton";

import { useTotalSupply, useBlindBoxBalance, useBlindBoxPrice } from "./hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { useBlindBoxContract } from "../../hooks/useContract";
import { ChainId, JSBI } from "@teaswap/uniswap-sdk";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ExternalLink } from "../../theme";
import { toWei } from "web3-utils";
import { shortenAddress } from "../../utils";
import airdropAPI from "../../webAPI/airdropAPI";
import { switchNetwork } from "../../utils/wallet";
import { useNavigate } from "react-router-dom";
import addTokenToWallet from "../../utils/addTokenToWallet";
import MetamaskIcon from "../../assets/images/metamask.png";
import {blindBoxAddr} from "../../sushi/lib/constants";

const symbol = "BBBPENGUIN";

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const [blindBoxBalance] = useBlindBoxBalance(account ?? "");
  const [totalSupply] = useTotalSupply();
  const [price] = useBlindBoxPrice();
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const blindBoxContract = useBlindBoxContract();
  const navigate = useNavigate();
  useEffect(() => {
    if (!account) return;
    airdropAPI.getCountAPI(account).then((res: any) => {
      if (res.count) {
        setAmount(res.count);
      }
    });
  }, [account]);

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
        await airdropAPI.mintedAPI(account);
      })
      .catch(async (error: any) => {
        console.log({
          gasLimit: 350000,
          value: toWei(String(amount * parseFloat(price))),
        });
        setMsg("int error: " + error.mesage);
      });
  };
  console.log("blindBox: ", { blindBoxBalance, balance });
  return (
    <Wrapper>
      <Left className="panel">
        <img src="/magicbox.png" />
      </Left>
      <Right className="panel">
        <div
          style={{
            marginBottom: "30px",
            fontSize: "1.25rem",
            color: "#FFFFFF",
          }}
        >
          TSA Magic Box
        </div>
        <div
          style={{
            fontSize: "6rem",
            marginBottom: "30px",
            color: "#ffffff",
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
          NFTs: {totalSupply}/10000
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            paddingBottom: "15px",
            color: "#FFFFFF",
          }}
        >
          Balance: {blindBoxBalance}{" "}
          {blindBoxBalance > 0 && (
            <NormalButton
              style={{
                padding: 0,
                backgroundColor: "#09afb6",
                color: "#FFFFFF",
                letterSpacing: ".1rem",
                width: 100,
              }}
              onClick={() => {
                navigate("/staking/0x68caacEEf02723f5589490128a25f0bDE9cd5b47/0xA0c9a4ebC96737E8f9f61A88D6361Bb26250a068/0x6e1e33bc278eb40b546660d9b6af4ff4026a0e2a");
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
          Mint fee: {price} BNB
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "#FFFFFF",
          }}
        >
          <p>
            You have {amount} airdrop {symbol}.
          </p>
          {/* <div style={{ position: "relative", top: "-10px" }}>
            <p># NFTs minted by you so far: {blindBoxBalance}/3</p>
          </div> */}
        </div>
        <div>
          {account && chainId === ChainId.BSC_MAINNET && amount > 0 && (
            <div style={{ marginTop: 20, marginLeft: -18 }}>
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
            </div>
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
                  switchNetwork(ChainId.BSC_MAINNET);
                }}
                children="Switch to BSC Mainnet  to  Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://bscscan.com/tx/${hash}`}>
                View on Bscscan
              </ExternalLink>
            </div>
          )}
          {msg && <div className="mint-msg">{msg}</div>}
          {blindBoxBalance === 0 && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  location.href="https://www.teaswap.live/post/how-to-join-the-allowlist-blindbox-tsa-magic-box"
                }}
                children="Join Allowlist"
              />
            </div>
          )}
          {account && chainId === ChainId.BSC_MAINNET && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={async () => {
                  await addTokenToWallet({
                    address: blindBoxAddr,
                    symbol: 'BBBPENGUIN',
                    decimals: 0,
                    image: ''
                  })
                }}
              >
                <span>Add Token to Wallet</span> <img style={{marginLeft: 5}} src={MetamaskIcon} width={15} />
              </NormalButton>
            </div>
          )}
          <div style={{ marginTop: 20, marginLeft: -20 }}>
            <NormalButton
              style={{
                padding: 0,
                backgroundColor: "#09afb6",
                color: "#FFFFFF",
                letterSpacing: ".1rem",
              }}
              onClick={async () => {
                location.href="https://opensea.io/collection/tsamagicbox"
              }}
            >
              View On OpensSea
            </NormalButton>
          </div>
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
  background-color: rgb(18, 185, 200);
  @media (max-width: 768px) {
    position: relative;
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
