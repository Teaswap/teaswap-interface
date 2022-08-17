import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'

export const xhbChainId = 10;
export const contractAddresses = '0x4CeBC5818a2280Ee54127CC14A03A36b928f2b9f';

export function useXhbContract(): Contract | null {
  return useContract(contractAddresses, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== xhbChainId || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log("xhb: TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("xhb: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const useXhbBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [xhbBalance, setXhbBalance] = useState(0);
  useEffect(() => {
    if (chainId !== xhbChainId || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("xhb: ", {res})
        setXhbBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("xhb: ", {err})
    })
  }, [account, chainId])

  return xhbBalance

}
export const useXhbPrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId !== xhbChainId) return
    contract?.cost().then((res: any) => {
      console.log("xhb price", res)
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log("xhb err: ", {err})
    })
  }, [chainId])
  return price
}
