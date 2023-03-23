import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'

export const theChainId = ChainId.BSC_TESTNET;
export const contractAddresses = '0x2602246FcE06E0861F70154a5e6Bb0D4ACE635BF';

export function useTheContract(): Contract | null {
  return useContract(contractAddresses, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== theChainId || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log(": TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log(": ", { err })
    })
  }, [chainId])
  return totalSupply
}

export function usePaused(contract: Contract | null, chainId: ChainId|undefined) {
  const [totalSupply, setTotalSupply] = useState(true);
  useEffect(() => {
    if (chainId !== theChainId || !contract) return
    contract?.paused().then((res: any) => {
      setTotalSupply(res)
    }).catch((err: any) => {
      console.log("read paused: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export function useOwner(contract: Contract | null, chainId: ChainId|undefined) {
  const [owner, setOwner] = useState('');
  useEffect(() => {
    if (chainId !== theChainId || !contract) return
    contract?.owner().then((res: any) => {
      console.log(": TotalSupply", { res })
      setOwner(res.toNumber())
    }).catch((err: any) => {
      console.log(": ", { err })
    })
  }, [chainId])
  return owner
}

export const useBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [Balance, setBalance] = useState(0);
  useEffect(() => {
    if (chainId !== theChainId || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log(": ", {res})
        setBalance(res.toNumber());
    }).catch((err: any) => {
      console.log(": ", {err})
    })
  }, [account, chainId])

  return Balance

}
export const usePrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId !== theChainId) return
    contract?.price().then((res: any) => {
      console.log(" price", res)
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log(" err: ", {err})
    })
  }, [chainId])
  return parseFloat(price)
}
