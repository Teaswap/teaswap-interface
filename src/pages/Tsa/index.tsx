import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../hooks";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { NormalButton } from "../../components/NFTButton";

import { useTotalSupply, useTsaBalance, useTsaPrice } from "./hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { BigNumber } from "ethers";
import { useTsaContract } from "../../hooks/useContract";
import { ChainId, JSBI } from "@teaswap/uniswap-sdk";
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ExternalLink } from "../../theme";
import { fromWei, toWei } from "web3-utils";
import { shortenAddress } from "../../utils";
import airdropAPI from "../../webAPI/airdropAPI";
import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../utils/wallet";

const names = [1, 2, 3];

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const [tsaBalance, setTsaBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [price, setPrice] = useState("0");
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const tsaBalanceHook = useTsaBalance(account ?? "");
  const tspTotalSupplyHook = useTotalSupply();
  const priceHook = useTsaPrice();
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const tspContract = useTsaContract();
  const navigate = useNavigate();
  useEffect(() => {
    if (!account) return;
    tsaBalanceHook.then((res: BigNumber) => {
      setTsaBalance(res.toNumber());
    });
    tspTotalSupplyHook.then((res: BigNumber) => {
      setTotalSupply(res.toNumber());
    });
    priceHook.then((res: BigNumber) => {
      setPrice(fromWei(res.toString(), "ether"));
    });
  });

  const handleChange = async (e: any) => {
    setMsg("");
    setHash("");
    setAmount(e.target.value);
    if (!tspContract || e.target.value == "Mint") return;
    const args = [JSBI.BigInt(e.target.value).toString()];
    tspContract
      .mint(...args, {
        gasLimit: 350000,
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
  console.log("tsp: ", { tsaBalance, balance });
  return (
    <Wrapper>
      <Left className="panel">
        <img src="/web60.gif" />
      </Left>
      <Right className="panel">
        <div
          style={{
            marginBottom: "30px",
            fontSize: "1.25rem",
            color: "#FFFFFF",
          }}
        >
          Penguin Punks
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
          NFTs: {totalSupply}/12888
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
          <p>You can now mint up to 3 TSA.</p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p># NFTs minted by you so far: {tsaBalance}/3</p>
          </div>
        </div>
        <div>
          {account && chainId == 1 && (
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
          {account && chainId === 1 && (
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
                        "https://etherscan.io/address/0xa788E2bcCeC8D35F116e7a19BF423F2a8EED98F5"
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
                      window.open("https://opensea.io/collection/tsa-penguin");
                    }}
                    children="OPENSEA"
                  />
                </div>
              }
            </div>
          )}

          {account && chainId != 1 && (
            <div style={{ marginTop: 20, marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(ChainId.MAINNET);
                }}
                children="Switch to ETH Mainnet  to  Mint"
              />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://etherscan.io/tx/${hash}`}>
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
  background-color: #4d0896;
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
