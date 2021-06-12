import { createAction } from '@reduxjs/toolkit'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface NFTToken {
  chainId: number
  address: string
  tokenid: number
  owner: string
  collectionSymbol?: string
  collectionName?: string
  collectionUri?: string
  creator?: string
  royalty:number
  name?:string
  uri?:string
  amount?:number
}

export interface userInterface {
  username?: string,
  password?: string,
  nickname?: string,
  email?: string,
  address?: string,
  is_admin?: boolean,
  is_vendor?: boolean,
  announcement?: string,
  account?: string,
  socialmedia_id?: string,
  birthday?: number,
  id_card_no?: string,
  avatar_url?: string,
  banner_url?: string,
  status?: number,
  deletedAt?: number,
}

export interface walletUserInterface {
  address?: string,
  chainId?: number
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'user/updateUserSlippageTolerance'
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addNFTToken = createAction<{ NFTToken: NFTToken }>('user/addNFTToken')
export const removeNFTToken = createAction<{ chainId: number; address: string; tokenId: number }>('user/removeNFTToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair = createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>(
  'user/removeSerializedPair'
)
export const toggleURLWarning = createAction<void>('app/toggleURLWarning')

export const setUser = createAction<{user:userInterface}>('user/setUser')
export const setErrorMessage = createAction<{ errorMessage:string|null} >('user/setErrorMessage')
export const setWalletUser = createAction<{ walletUser: walletUserInterface} >('user/setWalletUser')


