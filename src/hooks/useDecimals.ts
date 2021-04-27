import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getContract } from "../utils/erc20"

const useDecimals = (tokenAddress: string) => {
    const [decimals, setDecimals] = useState("18")
    const { account, ethereum } = useWallet()

    const contract = useMemo(() => {
      return getContract(ethereum as provider, tokenAddress)
    }, [ethereum, tokenAddress])

    const fetchTotalSupply = useCallback(async () => {
        const totalSupply = await contract.methods.decimals().call()
        setDecimals(totalSupply)
    }, [contract])

    useEffect(() => {
      if (account && contract) {
        fetchTotalSupply()
      }
    }, [account, fetchTotalSupply, contract, setDecimals])

    return decimals
}

export default useDecimals
