import { useState } from 'react'
import {useBlindBoxContract} from '../../hooks/useContract'
import { fromWei } from "web3-utils";

export function useTotalSupply() {
  const [totalSupply, setTotalSupply] = useState(0);
  const contract = useBlindBoxContract()
  contract?.totalSupply().then((res: any) => {
    console.log("blindBox: TotalSupply", { res })
    setTotalSupply(res.toNumber());
  }).catch((err: any) => {
    console.log("blindBox: ", { err })
  })
  return [totalSupply]
}

export const useBlindBoxBalance = (account: string) => {
  const [blindBoxBalance, setBlindBoxBalance] = useState(0);
  const contract = useBlindBoxContract() 
  contract?.balanceOf(account).then((res: any) => {
    console.log("blindBox: ", {res})
    setBlindBoxBalance(res.toNumber());
  }).catch((err: any) => {
    console.log("blindBox: ", {err})
  })
  return [blindBoxBalance]
}
export const useBlindBoxPrice = () => {
  const [price, setPrice] = useState("0");
  const contract = useBlindBoxContract() 
  contract?.cost().then((res: any) => {
    console.log("blindBox: Price", {res})
    setPrice(fromWei(res.toString(), "ether"));
  }).catch((err: any) => {
    console.log("blindBox: ", {err})
  })
  return [price]
}