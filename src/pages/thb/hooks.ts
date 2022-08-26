import { ChainId as ChainIdType } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'

export const ChainId = 56;
export const contractAddresses = '0xc219122e32e7B84F85741D74dAD3b6F3e41D212F';

export function useNFTContract(): Contract | null {
  return useContract(contractAddresses, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainIdType|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== ChainId || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log(": TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log(": ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const useBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainIdType|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [Balance, setBalance] = useState(0);
  useEffect(() => {
    if (chainId !== ChainId || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log(": ", {res})
        setBalance(res.toNumber());
    }).catch((err: any) => {
      console.log(": ", {err})
    })
  }, [account, chainId])

  return Balance

}
export const usePrice = (contract: Contract|null, chainId: ChainIdType|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId !== ChainId) return
    contract?.cost().then((res: any) => {
      console.log(" price", res)
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log(" err: ", {err})
    })
  }, [chainId])
  return price
}
