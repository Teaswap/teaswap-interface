import {NFTFACTORY, UNI} from './../../constants/index'
import {ChainId, Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount} from '@teaswap/uniswap-sdk'
import { useMemo } from 'react'
import ERC20_INTERFACE from '../../constants/abis/erc20'
import { useAllTokens } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks'
import {useERC1155Contract, useMulticallContract, useNFTFactoryContract} from '../../hooks/useContract'
import { isAddress } from '../../utils'
import {useSingleContractMultipleData, useMultipleContractSingleData, useSingleCallResult} from '../multicall/hooks'
import { useUserUnclaimedAmount } from '../claim/hooks'
import { useTotalUniEarned } from '../stake/hooks'
import {NFTToken} from "../user/actions";
import {ERC1155Collection_INTERFACE} from "../../constants/abis/erc1155";


/**
 * Returns a map of the given addresses to their eventually consistent BNB balances.
 */
export function useETHBalances(
  uncheckedAddresses?: (string | undefined)[]
): { [address: string]: CurrencyAmount | undefined } {
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address])
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value) memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()))
        return memo
      }, {}),
    [addresses, results]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])

  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = new TokenAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useUserFirstToken(
    address: string,
    chainid:ChainId
):{nftaddress:string|undefined}{
    const nftFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET])
    const NFTTokenAddresses = useSingleCallResult(nftFactoryContract, 'usrTokens', [address]).result?.[0]

    return NFTTokenAddresses && NFTTokenAddresses?.length>0 ? NFTTokenAddresses[0]?.toString():undefined
}

// export function useUserHasToken(
//     address: string,
//     chainid:ChainId
// ):boolean{
//     const nftFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET])
//     const NFTTokenAddresses = useSingleCallResult(nftFactoryContract, 'usrTokens', [address]).result?.[0]
//
//     return (NFTTokenAddresses && NFTTokenAddresses?.length>0)?true:false
// }

export function useUserNFTTokens(
    address: string,
    chainid:ChainId
): { [tokenAddress: string]: {[tokenId: number]: NFTToken} | undefined } {

    const nftFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET])
    const NFTTokenAddresses = useSingleCallResult(nftFactoryContract, 'usrTokens', [address]).result?.[0]
    let nftaddresses = []
    for (let index = 0; index < NFTTokenAddresses?.length;index++){
        nftaddresses.push(NFTTokenAddresses[index].toString())
    }

    const accountArg = useMemo(() => [address ?? undefined], [address])
    const collectionSymbolStates = useMultipleContractSingleData(nftaddresses,ERC1155Collection_INTERFACE,'symbol')
    const collectionNameStates = useMultipleContractSingleData(nftaddresses,ERC1155Collection_INTERFACE,'name')
    const collectionUriStates = useMultipleContractSingleData(nftaddresses,ERC1155Collection_INTERFACE,'uri')
    const creatorStates = useMultipleContractSingleData(nftaddresses,ERC1155Collection_INTERFACE,'getCreator')
    const tokenIdsStates = useMultipleContractSingleData(nftaddresses,ERC1155Collection_INTERFACE,'tokensOfOwner',accountArg)
    const collectionSymbol0 = collectionSymbolStates[0]?.result?.[0].toString()
    const collectionName0 = collectionNameStates[0]?.result?.[0].toString()
    const collectionUri0 = collectionUriStates[0]?.result?.[0].toString()
    const creator0 = creatorStates[0]?.result?.[0].toString()
    const tokenIds0 = tokenIdsStates[0]?.result?.[0]
    let tokenIdsArray = []
    for (let index = 0; index < tokenIds0?.length;index++){
        tokenIdsArray.push(tokenIds0[index].toString())
    }
    const erc1155Contract = useERC1155Contract(nftaddresses[0])
    const royalties0 = useSingleContractMultipleData(erc1155Contract,'getRoyalty',tokenIdsArray)
    const names0 = useSingleContractMultipleData(erc1155Contract,'tokenName',tokenIdsArray)
    const uris0 = useSingleContractMultipleData(erc1155Contract,'tokenURI',tokenIdsArray)
    let memo: { [nftaddress:string]: { [tokenId:number]:NFTToken} } = {};
    for (let i = 0; i < (tokenIdsArray.length ?? 0); i++) {
        memo[nftaddresses[0]][tokenIdsArray[i]] = {
            chainId:chainid,
            address: nftaddresses[0],
            tokenid: tokenIdsArray[i],
            owner: address,
            collectionSymbol: collectionSymbol0,
            collectionName: collectionName0,
            collectionUri: collectionUri0,
            creator: creator0,
            royalty:parseInt(royalties0[i]?.result?.[0].toString()),
            name:names0[i]?.result?.[0].toString(),
            uri:uris0[i]?.result?.[0].toString(),
            amount:1
        }
    }



    //
    // let memo: { [nftaddress:string]: { [tokenId:number]:NFTToken} } = {};
    // for (let index = 0; index < NFTTokenAddresses.length;index++){
    //     const addr  = NFTTokenAddresses[index].toString()
    //     const erc1155Contract = useERC1155Contract(addr)
    //     const tokenIds = useSingleCallResult(erc1155Contract,'tokensOfOwner',[address]).result?.[0]
    //     const collectionSymbol = useSingleCallResult(erc1155Contract,'symbol').result?.[0]
    //     const collectionName = useSingleCallResult(erc1155Contract,'name').result?.[0]
    //     const collectionUri = useSingleCallResult(erc1155Contract,'uri').result?.[0]
    //     const creator = useSingleCallResult(erc1155Contract,'getCreator').result?.[0]
    //     const royalties = useSingleContractMultipleData(erc1155Contract,'getRoyalty',tokenIds)
    //     const names = useSingleContractMultipleData(erc1155Contract,'tokenName',tokenIds)
    //     const uris = useSingleContractMultipleData(erc1155Contract,'tokenURI',tokenIds)
    //     for (let i = 0; i <= (tokenIds.length ?? 0); i++) {
    //         memo[addr][tokenIds[i]] = {
    //             chainId:chainid,
    //             address: addr,
    //             tokenid: tokenIds[i],
    //             owner: address,
    //             collectionSymbol: collectionSymbol,
    //             collectionName: collectionName,
    //             collectionUri: collectionUri,
    //             creator: creator,
    //             royalty:parseInt(royalties[i]?.result?.[0].toString()),
    //             name:names[i]?.result?.[0].toString(),
    //             uri:uris[i]?.result?.[0].toString(),
    //             amount:1
    //         }
    //     }
    // }

    return memo
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount | undefined)[] {
  const tokens = useMemo(() => currencies?.filter((currency): currency is Token => currency instanceof Token) ?? [], [
    currencies
  ])

  const tokenBalances = useTokenBalances(account, tokens)
  const containsETH: boolean = useMemo(() => currencies?.some(currency => currency === ETHER) ?? false, [currencies])
  const ethBalance = useETHBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency) return undefined
        if (currency instanceof Token) return tokenBalances[currency.address]
        if (currency === ETHER) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency])[0]
}

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)
  return balances ?? {}
}

// get the total owned, unclaimed, and unharvested UNI for account
export function useAggregateUniBalance(): TokenAmount | undefined {
  const { account, chainId } = useActiveWeb3React()

  const uni = chainId ? UNI[chainId] : undefined

  const uniBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, uni)
  const uniUnclaimed: TokenAmount | undefined = useUserUnclaimedAmount(account)
  const uniUnHarvested: TokenAmount | undefined = useTotalUniEarned()

  if (!uni) return undefined

  return new TokenAmount(
    uni,
    JSBI.add(
      JSBI.add(uniBalance?.raw ?? JSBI.BigInt(0), uniUnclaimed?.raw ?? JSBI.BigInt(0)),
      uniUnHarvested?.raw ?? JSBI.BigInt(0)
    )
  )
}
