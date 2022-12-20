import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'

export const xhbChainId = 1;
export const contractAddresses = '0xBa2f291070Ddd49d005dbd3Ff06Cd1b986B6c542';

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

export function usePreSalePaused(contract: Contract | null, chainId: ChainId|undefined) {
  const [totalSupply, setTotalSupply] = useState(true);
  useEffect(() => {
    if (chainId !== xhbChainId || !contract) return
    contract?.preSalePaused().then((res: any) => {
      setTotalSupply(res)
    }).catch((err: any) => {
      console.log("read presale paused: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export function useOwner(contract: Contract | null, chainId: ChainId|undefined) {
  const [owner, setOwner] = useState('');
  useEffect(() => {
    if (chainId !== xhbChainId || !contract) return
    contract?.owner().then((res: any) => {
      console.log("xhb: TotalSupply", { res })
      setOwner(res.toNumber())
    }).catch((err: any) => {
      console.log("xhb: ", { err })
    })
  }, [chainId])
  return owner
}

export function useMaxSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== xhbChainId || !contract) return
    contract?.maxSupply().then((res: any) => {
      console.log("xhb: MaxSupply", { res })
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

export function useMaxMintPerAccount(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== xhbChainId || !contract) return
    contract?.maxMintPerAccount().then((res: any) => {
      console.log("xhb: maxMintPerAccount", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("xhb: ", { err })
    })
  }, [chainId])
  return totalSupply
}
