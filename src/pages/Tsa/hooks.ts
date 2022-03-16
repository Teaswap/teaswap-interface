// import {useTsaContract} from '../../hooks/useContract'
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
      console.log("tsa: TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log("tsa: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export const useTsaBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [tsaBalance, setTsaBalance] = useState(0);
  useEffect(() => {
    if (chainId != ChainId.MAINNET || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log("tsa: ", {res})
        setTsaBalance(res.toNumber());
    }).catch((err: any) => {
      console.log("tsa: ", {err})
    })
  }, [account, chainId])

  return tsaBalance

}
export const useTsaPrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId != ChainId.MAINNET) return
    contract?.price().then((res: any) => {
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log("tsa: ", {err})
    })
  }, [chainId])
  return price
}