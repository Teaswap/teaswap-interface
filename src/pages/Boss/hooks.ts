import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'


const contractAddr = '0x5e2DFA18BEF12d45164D181628BD8CE2220FF498';

export function useBossContract(): Contract | null {
  return useContract(contractAddr, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId != 137 || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log("boss: TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("boss: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const useBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [bossBalance, setBalance] = useState(0);
  useEffect(() => {
    console.log("boss user balance", {chainId, account, contract})
    if (chainId != 137 || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("boss balance ", {res})
        setBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("boss balance err: ", {err})
    })
  }, [account, chainId])

  return bossBalance

}

export const usePrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId != 137) return
    contract?.price().then((res: any) => {
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log("boss: ", {err})
    })
  }, [chainId])
  return price
}

export const useMaxPerWallert = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [max, setMax] = useState("0");
  useEffect(() => {
    if (chainId != 137) return
    contract?.maxPerWallet().then((res: any) => {
      setMax(res.toNumber());
    }).catch((err: any) => {
      console.log("boss: ", {err})
    })
  }, [chainId])
  return max
}