import { Token, TokenAmount } from '@teaswap/uniswap-sdk'
import { useMemo } from 'react'

import {useERC1155Contract, useTokenContract} from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import {ZERO_ADDRESS} from "../constants";

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {

  const contract = useTokenContract(token?.address===ZERO_ADDRESS?undefined:token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(() => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined), [
    token,
    allowance
  ])
}

export function useNFTAllowance(tokenAddress?:string,tokenId?: number): string | undefined {

  const contract = useERC1155Contract(tokenAddress)

  const inputs = useMemo(() => [tokenId], [tokenId])
  const spenderAddress = useSingleCallResult(contract, 'getApproved', inputs).result

  return useMemo(() => (contract && spenderAddress ? spenderAddress.toString() : undefined), [
    contract,
    spenderAddress
  ])
}
