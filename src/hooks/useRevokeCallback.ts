import {useNFTExchangeContract} from "./useContract";
import {NFTEXCHANGE} from "../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import {
    useHasPendingRevoke,
    useTransactionAdder,
    useUserHasSubmittedRevoke
} from "../state/transactions/hooks";
import {useTranslation} from "react-i18next";
import {useCallback, useMemo} from "react";
import {TransactionResponse} from "@ethersproject/providers";
import {calculateGasMargin} from "../utils";

export enum revokeState {
    UNKNOWN,
    NOT_SET,
    PENDING,
    SETED
}

export function useRevokeCallback(
    orderid: number,
): [revokeState, () => Promise<void>  ] {
    // const { account } = useActiveWeb3React()
    const NFTExContract = useNFTExchangeContract(NFTEXCHANGE[ChainId.BSC_MAINNET]);
    const pendingRevoke = useHasPendingRevoke(orderid)
    console.log('pendingRevoke: ', pendingRevoke)
    const {revokeSubmitted,} = useUserHasSubmittedRevoke(orderid)
    console.log('revokeSubmitted: ', revokeSubmitted)
    const {t} = useTranslation()
    const addTransaction = useTransactionAdder()

    // check the current mint status
    const state:revokeState = useMemo(() => {
        console.log('useRevokeCallback', "pendingRevoke:"+pendingRevoke)
        console.log('useRevokeCallback', "revokeSubmitted:"+revokeSubmitted)
        return !revokeSubmitted? pendingRevoke ? revokeState.PENDING : revokeState.NOT_SET: revokeState.SETED
    }, [pendingRevoke,revokeSubmitted])
    console.log('revokeState', state)

    const revoke = useCallback(async (): Promise<void> => {
        if(NFTExContract){
            if (!orderid) return
            const setargs = [ orderid ]
            console.log('revoke-useCallback', setargs)

            try{
                const estimatedGas = await NFTExContract.estimateGas.revoke(...setargs).catch(() => {
                    return NFTExContract.estimateGas.revoke(...setargs)
                })
                NFTExContract.revoke(
                    ...setargs,{ gasLimit: calculateGasMargin(estimatedGas)})
                    .then((response: TransactionResponse) => {
                        console.log('add-revoke-transaction', response, {
                            summary: t('revoke'),
                            revoke: {orderid}
                        })
                        addTransaction(response, {
                            summary: t('revoke'),
                            revoke: {orderid}
                        })
                    })
                    .catch((error: any) => {
                        console.log(error)
                    })
            }catch(err) {
                console.error('revoke-useCallback error', err)
            }

        }
    }, [orderid])

    return [state, revoke]
}
