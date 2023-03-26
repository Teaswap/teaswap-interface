import { ChainId } from '@teaswap/uniswap-sdk'
import { useEffect, useState } from 'react';
import { fromWei } from "web3-utils";
import { Contract } from 'ethers';
import { useContract } from '../../hooks/useContract';
import abi from './abi.json'
import bep20Abi from './bep20.json'
import { getContract } from '../../utils';

export const theChainId = ChainId.BSC_TESTNET;
export const contractAddresses = '0x5fE96A4301C07A6ED416B2359cf18228d506aBf4';

export function useTheContract(): Contract | null {
  return useContract(contractAddresses, abi, true)
}

export function useTotalSupply(contract: Contract | null, chainId: ChainId|undefined) {
  // todo refactor with hooks and return 0 if chainId != 0
  const [totalSupply, setTotalSupply] = useState(0);
  useEffect(() => {
    if (chainId !== theChainId || !contract) return
    contract?.totalSupply().then((res: any) => {
      console.log(": TotalSupply", { res })
      setTotalSupply(res.toNumber())
    }).catch((err: any) => {
      console.log(": ", { err })
    })
  }, [chainId])
  return totalSupply
}

export function usePaused(contract: Contract | null, chainId: ChainId|undefined) {
  const [totalSupply, setTotalSupply] = useState(true);
  useEffect(() => {
    if (chainId !== theChainId || !contract) return
    contract?.paused().then((res: any) => {
      setTotalSupply(res)
    }).catch((err: any) => {
      console.log("read paused: ", { err })
    })
  }, [chainId])
  return totalSupply
}

export function useOwner(contract: Contract | null, chainId: ChainId|undefined) {
  const [owner, setOwner] = useState('');
  useEffect(() => {
    if (chainId !== theChainId || !contract) return
    contract?.owner().then((res: any) => {
      console.log(": TotalSupply", { res })
      setOwner(res.toNumber())
    }).catch((err: any) => {
      console.log(": ", { err })
    })
  }, [chainId])
  return owner
}

export const useBalance = (account: string|undefined|null, contract: Contract | null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [Balance, setBalance] = useState(0);
  useEffect(() => {
    if (chainId !== theChainId || !account || !contract) return
    contract?.balanceOf(account).then((res: any) => {
      console.log(": ", {res})
        setBalance(res.toNumber());
    }).catch((err: any) => {
      console.log(": ", {err})
    })
  }, [account, chainId])

  return Balance

}
export const usePrice = (contract: Contract|null, chainId: ChainId|undefined) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [price, setPrice] = useState("0");
  useEffect(() => {
    if (chainId !== theChainId) return
    contract?.price().then((res: any) => {
      console.log(" price", res)
      setPrice(fromWei(res.toString(), "ether"));
    }).catch((err: any) => {
      console.log(" err: ", {err})
    })
  }, [chainId])
  return parseFloat(price)
}

export const useGetContractsForWallet = (contract: Contract|null, wallet: string, chainId: ChainId|undefined, library: any) => {
  // todo refactor with hooks and return 0 if chainId != 0
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    if (chainId !== theChainId) return
    getContractsForWallet(contract, wallet, chainId, library).then((res: any) => {
      console.log(" tokens", res)
      setTokens(res);
    }).catch((err: any) => {
      console.log(" err: ", {err})
    })
  }, [chainId])
  return tokens
}

export const getContractsForWallet = async (contract: Contract|null, wallet: string, chainId: ChainId|undefined, library: any) => {
  
  if (chainId !== theChainId) return []
  const tokens = []
  try{
    const contractAddresses = await contract?.getContractsForWallet(wallet)
    for (let i = 0; i < contractAddresses.length; i++) {
      const address = contractAddresses[i];
      const ABI = bep20Abi
      const withSignerIfPossible = false
      const account = wallet
      const contract = getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      tokens[i] = {
        address: contractAddresses[i],
        name: await contract?.name(),
        symbol: await contract?.symbol(),
        decimals: await contract?.decimals(),
        balance: await contract?.balanceOf(wallet),
        totalSupply: await contract?.totalSupply(),
      }
    }
  }catch(err){
    console.log(" err: ", {err})
    return []
  }
  
  
  return tokens
}

