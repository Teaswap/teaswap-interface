// import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import {NFTFACTORY} from '../constants'
import {ChainId, JSBI} from "@teaswap/uniswap-sdk";
// import {useHasPendingApproval, useHasPendingMint, useTransactionAdder} from '../state/transactions/hooks'
import {useNFTFactoryContract} from './useContract'
import {userInterface} from "../state/user/actions";
import {useTranslation} from "react-i18next";
import {useHasPendingMint, useTransactionAdder, useUserHasSubmittedMint} from "../state/transactions/hooks";
import {calculateGasMargin} from "../utils";
// import {useActiveWeb3React} from "./index";

export enum mintState {
    UNKNOWN,
    NOT_MINT,
    PENDING,
    MINTED
}

export interface MintInfoInterface{
    tokenUrl:string,
    ProductCategoryId:number,
    productInfo:string,
    productPrice:number,
    delivertyLocation:string,
    delivery:number,
    user:userInterface,
    account:string ,
    productPictureUrl:string,
    productName:string,
    productRoyalty:number,
    productToken:string,
    productMediaType:string,
    saleCopyright: number,
    remark:string
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useMintCallback(
    mintInfo: MintInfoInterface,
): [mintState, () => Promise<void>  ] {
    // const { account } = useActiveWeb3React()
    const NFTFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET]);
    const pendingMint = useHasPendingMint(mintInfo)
    const {submitted,} = useUserHasSubmittedMint(mintInfo.productName?mintInfo.productName:undefined)
    const {t} = useTranslation()
    const addTransaction = useTransactionAdder()

    // check the current mint status
    const state:mintState = useMemo(() => {
        return !submitted? pendingMint ? mintState.PENDING : mintState.NOT_MINT: mintState.MINTED
    }, [pendingMint])


    const mint = useCallback(async (): Promise<void> => {
        if(NFTFactoryContract){
            if(mintInfo.delivertyLocation && mintInfo.delivertyLocation!=''){
                const mintargs = [
                    mintInfo.delivertyLocation,
                    mintInfo.account,
                    1,
                    mintInfo.tokenUrl,
                    mintInfo.productName,
                    mintInfo.productRoyalty,
                    0
                ]

                const estimatedGas = await NFTFactoryContract.estimateGas.mint(...mintargs,{value:`0x${JSBI.BigInt("10000000000000000").toString(16)}`}).catch(() => {
                    return NFTFactoryContract.estimateGas.mint(...mintargs,{value:`0x${JSBI.BigInt("10000000000000000").toString(16)}`})
                })

                NFTFactoryContract.mint(
                    ...mintargs,{ gasLimit: calculateGasMargin(estimatedGas) ,value:`0x${JSBI.BigInt("10000000000000000").toString(16)}`})
                    .then((response: TransactionResponse) => {
                        addTransaction(response, {
                            summary: t('Mint NFT'),
                            mint:mintInfo
                        })

                    })
                    .catch((error: any) => {
                        console.log(error)
                    })
            }else{
                const args = [
                    mintInfo.user.banner_url?mintInfo.user.banner_url:'https://static.wixstatic.com/media/faa61f_5b2f06d9bee14f369a0a3b7d31761b98~mv2.png',
                    mintInfo.user.nickname+ ' Collection',
                    mintInfo.user.nickname+'NFT',
                    mintInfo.productPictureUrl,
                    mintInfo.productName,
                    mintInfo.productRoyalty,
                    mintInfo.account
                ]
                console.log(args)

                const estimatedGas = await NFTFactoryContract.estimateGas.createERC1155(...args,{value:`0x${JSBI.BigInt("10000000000000000").toString(16)}`}).catch(() => {
                    return NFTFactoryContract.estimateGas.createERC1155(...args,{value:`0x${JSBI.BigInt("10000000000000000").toString(16)}`})
                })

                NFTFactoryContract.createERC1155(
                    ...args,{ gasLimit: calculateGasMargin(estimatedGas),value:`0x${JSBI.BigInt("10000000000000000").toString(16)}`})
                    .then((response: TransactionResponse) => {
                        addTransaction(response, {
                            summary: t('create NFT'),
                            mint:mintInfo
                        })

                    })
                    .catch((error: any) => {
                        console.log(error)
                    })
            }
        }
    }, [])





    return [state, mint]
}
