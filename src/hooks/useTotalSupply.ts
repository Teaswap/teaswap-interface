import BigNumber from "bignumber.js"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getContract } from "../utils/pool"
import useFarm from "./useFarm"

const useTotalSupply = (pid: number) => {
    const [totalSupply, setTotalSupply] = useState(new BigNumber(0))
    const { account, ethereum } = useWallet()
    const farm = useFarm(pid)

    const contract = useMemo(() => {
      return farm ? getContract(ethereum as provider, farm.poolAddress):undefined
    }, [ethereum, farm])

    const fetchTotalSupply = useCallback(async () => {
        if (contract){
          const totalSupply = await contract.methods.totalSupply().call()
          setTotalSupply(new BigNumber(totalSupply))
        }else{
          console.log('null contract')
        }

    }, [contract])

    useEffect(() => {
      if (account && contract) {
        fetchTotalSupply()
      }
    }, [account, fetchTotalSupply, contract, setTotalSupply])

    return totalSupply
}

export default useTotalSupply
