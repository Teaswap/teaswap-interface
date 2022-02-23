import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../hooks";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { NormalButton } from "../../components/NFTButton";

import { useTotalSupply, useTspBalance, useTspPrice } from "./hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { BigNumber } from "ethers";
import { useTspContract } from "../../hooks/useContract";
import { JSBI } from "@teaswap/uniswap-sdk";
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ExternalLink } from "../../theme";
import { fromWei, toWei } from "web3-utils";
import { shortenAddress } from "../../utils";

const names = [1, 2, 3];

export default () => {
  const { account, chainId } = useActiveWeb3React();
  const [tspBalance, setTspBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [price, setPrice] = useState("0");
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  const tspBalanceHook = useTspBalance(account ?? "");
  const tspTotalSupplyHook = useTotalSupply();
  const priceHook = useTspPrice();
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const tspContract = useTspContract();
  useEffect(() => {
    tspBalanceHook.then((res: BigNumber) => {
      setTspBalance(res.toNumber());
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
      .then((response: TransactionResponse) => {
        console.log("buy: res", { response });
        setHash(response.hash);
      })
      .catch((error: any) => {
        console.log({
          gasLimit: 350000,
          value: toWei(String(e.target.value * parseFloat(price))),
        });
        setMsg("int error: " + error.mesage);
      });
  };
  console.log("tsp: ", { tspBalance, balance });
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
          Penguin Brothers
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
          NFTs: {totalSupply}/8888
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
          <p>You can now mint up to 3 TSP.</p>
          <div style={{ position: "relative", top: "-10px" }}>
            <p># NFTs minted by you so far: {tspBalance}/3</p>
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
                        "https://etherscan.io/address/0x538dD4eF8E46cEDc59dFEc723879b85a67e9fa56"
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
                        "https://opensea.io/collection/penguin-brother"
                      );
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
