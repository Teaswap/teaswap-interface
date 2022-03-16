// import {useTspContract} from '../../hooks/useContract'
// import { useActiveWeb3React } from "../../hooks";
import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';

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

export const useTspBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [tspBalance, setTspBalance] = useState(0);
  useEffect(() => {
    if (chainId != ChainId.MAINNET || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("tsp: ", {res})
        setTspBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("tsp: ", {err})
    })
  }, [account, chainId])

  return tspBalance

}
export const useTspPrice = (contract: Contract|null, chainId: ChainId|undefined) => {
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