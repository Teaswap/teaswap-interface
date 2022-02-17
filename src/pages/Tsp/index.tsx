import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useActiveWeb3React } from '../../hooks'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {NormalButton} from '../../components/NFTButton';

import { useTotalSupply, useTspBalance, useTspPrice } from './hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import { BigNumber } from 'ethers';
import { useTspContract } from '../../hooks/useContract';
import { JSBI } from '@teaswap/uniswap-sdk';
// import { calculateGasMargin } from '../../utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { ExternalLink } from '../../theme';
import {fromWei, toWei} from 'web3-utils'

const names = [1, 2, 3]

export default () => {
  const { account, chainId } = useActiveWeb3React()
  const [tspBalance, setTspBalance] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [price, setPrice] = useState('0')
  const balance = useETHBalances(account ? [account] : [])?.[ account ?? "" ];
  const tspBalanceHook = useTspBalance(account ?? "")
  const tspTotalSupplyHook = useTotalSupply()
  const priceHook = useTspPrice()
  const [amount, setAmount] = useState(0)
  const [hash, setHash] = useState('')
  const [msg, setMsg] = useState('')
  const tspContract = useTspContract()
  useEffect(() => {
    tspBalanceHook.then((res: BigNumber) => {
      setTspBalance(res.toNumber())
    }) 
    tspTotalSupplyHook.then((res: BigNumber) => {
      setTotalSupply(res.toNumber())
    })
    priceHook.then((res: BigNumber) => {
      setPrice(fromWei(res.toString(), 'ether'));
    })
  })
  
  const handleChange = async (e: any) => {
    setMsg('')
    setHash('')
    setAmount(e.target.value)
    if (!tspContract) return
    const args = [
      JSBI.BigInt(e.target.value).toString(),
    ]
    tspContract.mint(...args, { gasLimit: 350000, value: toWei(String(e.target.value * parseFloat(price)))})
      .then((response: TransactionResponse) => {
        console.log('buy: res', {response})
        setHash(response.hash)
      })
      .catch((error: any) => {
        console.log( { gasLimit: 350000, value: toWei(String(e.target.value * parseFloat(price)))})
        setMsg("int error: " + error.mesage)
      }) 
  }
  console.log("tsp: ", {tspBalance, balance})
  return (
    <Wrapper>
      <Left className='panel'>
        <img src='/web60.gif'/>    
      </Left>
      <Right className='panel'>
        <div>Penguin Punks brothers</div>
        <div>Mint</div>
        <div>address: {account}</div>
        <div>NFTs: {totalSupply}/8888</div>
        <div>Price: {price} ETH</div>
        <div>
          <p>You can now mint up to 3 TSP</p>
          <p>NFTs minted by you so far: {tspBalance}/3</p>
        </div>
        <div>
          {account && chainId == 1 && (
            <FormControl>
              {/* <InputLabel id="tsp-mint">Mint</InputLabel> */}
              <Select
                style={{minWidth: 300}}
                inputProps={{ 'aria-label': 'Without label' }}
                displayEmpty
                onChange={handleChange}
                label="Mint"
                value={amount}
                input={<OutlinedInput />}
                renderValue={() => {
                  if (!amount) {
                    return <em>Mint</em>;
                  }
      
                  return amount;
                }}
              >
                <MenuItem disabled value="">
                  <em>Mint</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {account && chainId != 1 && (
            <div style={{marginTop: 20}}>
              <NormalButton style={{padding: 0}} children='Switch to eth mainnet to mint' />
            </div>
          )}
          {hash && (
            <div>
              <ExternalLink href={`https://etherscan.io/tx/${hash}`}>
                View on Etherscan
              </ExternalLink>
            </div>
          )}
          {msg && (
            <div className='error-msg'>{msg}</div>
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
  height: calc(100vh - 394px);
  background-color: #D4D4D4;
  .panel{
    width: 50%;
    height: 100%;;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Left = styled.div`
  img {
    width: 60%;
  }
`

const Right = styled.div`
  flex-direction: column;
  align-items: flex-start;
  > div{
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }
`