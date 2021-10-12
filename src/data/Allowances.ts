import { Token, TokenAmount } from '@teaswap/uniswap-sdk'
import { useMemo } from 'react'

import {useERC1155Contract, useTokenContract} from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import {ZERO_ADDRESS} from "../constants";

export function useTokenAllowance(token?: Token, owner?: string, spender?: string,isNFT?:boolean,tokenid?:string): TokenAmount | undefined {

  const contract = useTokenContract(token?.address===ZERO_ADDRESS?undefined:token?.address, false,isNFT)

  const inputs = useMemo(() => isNFT?[tokenid]:[owner, spender], [isNFT,owner, spender,tokenid])
  const allowance = useSingleCallResult(contract, isNFT?'getApproved':'allowance', inputs).result?.[0]

  return useMemo(() => (token && allowance ? isNFT ? allowance.toString() : new TokenAmount(token, allowance.toString()) : undefined), [
    token,
    allowance
  ])
}

export function useNFTAllowance(tokenAddress?:string,tokenId?:number): string | undefined {

  const contract = useERC1155Contract(tokenAddress)

  const inputs = useMemo(() => [tokenId != undefined?tokenId:undefined], [tokenId])
  const spenderAddress = useSingleCallResult(contract, 'getApproved', inputs).result?.[0]

  return useMemo(() => (contract && spenderAddress ? spenderAddress.toString() : undefined), [
    contract,
    spenderAddress
  ])
}
