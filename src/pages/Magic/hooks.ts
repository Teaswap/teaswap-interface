import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'


const contractAddr = '0x5e2DFA18BEF12d45164D181628BD8CE2220FF498';

export function useMagicContract(): Contract | null {
  return useContract(contractAddr, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId != ChainId.MAINNET || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log("tsp: TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("tsp: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const useBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [tspBalance, setBalance] = useState(0);
  useEffect(() => {
    if (chainId != ChainId.MAINNET || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("tsp: ", {res})
        setBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("tsp: ", {err})
    })
  }, [account, chainId])

  return tspBalance

}
export const usePrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId != ChainId.MAINNET) return
    contract?.price().then((res: any) => {
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log("tsp: ", {err})
    })
  }, [chainId])
  return price
}