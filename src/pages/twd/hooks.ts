import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'

export const twdChainId = 137;
export const contractAddresses = '0x772F309924Cb8bF18406ad1Ca5a5bcF0cA5fD363';

export function useTwdContract(): Contract | null {
  return useContract(contractAddresses, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== twdChainId || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log("twd: TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("twd: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const useTwdBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [twdBalance, setTwdBalance] = useState(0);
  useEffect(() => {
    if (chainId !== twdChainId || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("twd: ", {res})
        setTwdBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("twd: ", {err})
    })
  }, [account, chainId])

  return twdBalance
}

export const useTwdPrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId !== twdChainId) return
    contract?.cost().then((res: any) => {
      console.log("twd price", res)
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log("twd err: ", {err})
    })
  }, [chainId])
  return price
}

export const useOwnerOf = (tokenId: number, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (chainId !== twdChainId || !contract) return
    contract?.ownerOf(tokenId).then((res: any) => {
      console.log("twd owner of: ", {res})
      setAddress(res);
    }).catch((err: any) => {
      console.log("twd: ", {err})
    })
  }, [chainId])

  return address
}
