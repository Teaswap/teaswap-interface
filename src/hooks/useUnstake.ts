import { useCallback, useMemo } from 'react'
import { provider } from 'web3-core'

// import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

// import { unstake, getMasterChefContract } from '../sushi/utils'
import useFarm from './useFarm'
import { getContract } from '../utils/pool'
import BigNumber from 'bignumber.js'

const useUnstake = (pid: number) => {
  const { account, ethereum } = useWallet()
  const farm = useFarm(pid)

  if(!farm){
    console.log('null farm')
    return 0
  }

  const contract = useMemo(() => {
    return getContract(ethereum as provider, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const handleUnstake = useCallback(
    async (amount: string) => {
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
      const txHash = await contract.methods
      .withdraw(
        value,
      )
      .send({ from: account })
      .on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
