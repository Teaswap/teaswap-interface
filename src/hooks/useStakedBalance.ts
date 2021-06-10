import { useCallback, useEffect, useMemo, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

// import { getStaked, getMasterChefContract } from '../sushi/utils'
// import useSushi from './useSushi'
// import useBlock from './useBlock'
import useFarm from './useFarm'
import { getContract } from '../utils/pool'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum } = useWallet()
  const farm = useFarm(pid)

  if(!farm ){
    console.log('null farm or contract')
    return 0
  }

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.methods.balanceOf(account).call();
    setBalance(new BigNumber(balance))
  }, [account, contract])

  useEffect(() => {
    if (account && contract) {
      fetchBalance()
    }
    let refreshInterval = setInterval(fetchBalance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, pid, setBalance, contract, fetchBalance])

  return balance
}

export default useStakedBalance
