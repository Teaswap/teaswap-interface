import {useERC1155Contract} from "./useContract";

import {
    useHasPendingTransfer,
    useTransactionAdder,
     useUserHasSubmittedTransfer
} from "../state/transactions/hooks";
import {useTranslation} from "react-i18next";
import {useCallback, useMemo} from "react";
import {TransactionResponse} from "@ethersproject/providers";
import {calculateGasMargin} from "../utils";

export enum TransferState {
    UNKNOWN,
    NOT_SET,
    PENDING,
    SETED
}

export function useTransferCallback(
    tokenid: number,
    nftAddress:string,
    fromAddress:string,
    toAddress:string
): [TransferState, () => Promise<void>  ] {
    // const { account } = useActiveWeb3React()
    const NFTContract = useERC1155Contract(nftAddress)
    const pendingTransfer = useHasPendingTransfer(nftAddress,tokenid,toAddress)
    const {transferSubmitted,} = useUserHasSubmittedTransfer(nftAddress,tokenid,toAddress)
    const {t} = useTranslation()
    const addTransaction = useTransactionAdder()

    // console.log("pendingSetPricepoutset:"+pendingSetPrice)
    // console.log("setPriceSubmittedoutset:"+setPriceSubmitted)

    // check the current mint status
    const state:TransferState = useMemo(() => {
        console.log('useTransferCallback', "pendingTransfer:"+pendingTransfer)
        console.log('useTransferCallback', "transferSubmitted:"+transferSubmitted)
        return !transferSubmitted? pendingTransfer ? TransferState.PENDING : TransferState.NOT_SET: TransferState.SETED
    }, [pendingTransfer,transferSubmitted])

    console.log('useTransferCallback', "tokenid:"+tokenid)
    const transfer = useCallback(async (): Promise<void> => {
        console.log('useTransferCallback', "callbacktokenid:"+tokenid)
        if(NFTContract){
            if(toAddress != '' && fromAddress){
                const transferargs = [
                    fromAddress,
                    toAddress,
                    tokenid
                ]
                console.log(transferargs)

                const estimatedGas = await NFTContract.estimateGas.safeTransferFrom(...transferargs).catch(() => {
                    return NFTContract.estimateGas.safeTransferFrom(...transferargs)
                })

                NFTContract.safeTransferFrom(
                    ...transferargs,{ gasLimit: calculateGasMargin(estimatedGas)})
                    .then((response: TransactionResponse) => {
                        addTransaction(response, {
                            summary: t('transfer'),
                            transfer: {nftAddress,tokenid,toAddress}
                        })

                    })
                    .catch((error: any) => {
                        console.log(error)
                    })

            }
        }
    }, [toAddress])

    return [state, transfer]
}
