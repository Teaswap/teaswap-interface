import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'

export function usePoapContract(): Contract | null {
  return useContract('0x0565d665E1C6c07210fc3C9375cC8a97e87E337D', abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId != 1 || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log("poap: TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("poap: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const usePoapBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [poapBalance, setPoapBalance] = useState(0);
  useEffect(() => {
    if (chainId != 1 || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("poap: ", {res})
        setPoapBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("poap: ", {err})
    })
  }, [account, chainId])

  return poapBalance

}
export const usePoapPrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId != 1) return
    contract?.cost().then((res: any) => {
      console.log("poap price", res)
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log("poap err: ", {err})
    })
  }, [chainId])
  return price
}