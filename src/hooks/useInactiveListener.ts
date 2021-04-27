import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { SUPPORTED_WALLETS } from '../constants'

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()
  useEffect(() => {
    if (suppress) {
      return () => {}
    }
    const { ethereum } = window as any
    const injected: any = SUPPORTED_WALLETS['METAMASK'].connector

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = (chainId: any) => {
        console.log('chainChanged', chainId)
        activate(injected)
      }

      const handleAccountsChanged = (accounts: any) => {
        console.log('accountsChanged', accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      const handleNetworkChanged = (networkId: any) => {
        console.log('networkChanged', networkId)
        activate(injected)
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      activate(injected)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }

    return () => {}
  }, [active, error, suppress, activate])
}
