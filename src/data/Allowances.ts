import { Token, TokenAmount } from '@teaswap/uniswap-sdk'
import { useMemo } from 'react'

import { useTokenContract } from '../hooks/useContract'
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
