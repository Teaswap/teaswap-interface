import {useNFTExchangeContract} from "./useContract";
import {NFTEXCHANGE} from "../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import {
    useHasPendingSetPrice,
    useTransactionAdder,
    useUserHasSubmittedSetPrice
} from "../state/transactions/hooks";
import {useTranslation} from "react-i18next";
import {useCallback, useMemo} from "react";
import {TransactionResponse} from "@ethersproject/providers";
import BigNumber from "bignumber.js";

export enum setPriceState {
    UNKNOWN,
    NOT_SET,
    PENDING,
    SETED
}

export function useSetPriceCallback(
    orderid: number,
    price:number
): [setPriceState, () => Promise<void>  ] {
    // const { account } = useActiveWeb3React()
    const NFTExContract = useNFTExchangeContract(NFTEXCHANGE[ChainId.BSC_MAINNET]);
    const pendingSetPrice = useHasPendingSetPrice(orderid,price)
    const {setPriceSubmitted,} = useUserHasSubmittedSetPrice(orderid,price)
    const {t} = useTranslation()
    const addTransaction = useTransactionAdder()

    // console.log("pendingSetPricepoutset:"+pendingSetPrice)
    // console.log("setPriceSubmittedoutset:"+setPriceSubmitted)

    // check the current mint status
    const state:setPriceState = useMemo(() => {
        console.log("pendingSetPrice:"+pendingSetPrice)
        console.log("setPriceSubmitted:"+setPriceSubmitted)
        return !setPriceSubmitted? pendingSetPrice ? setPriceState.PENDING : setPriceState.NOT_SET: setPriceState.SETED
    }, [pendingSetPrice,setPriceSubmitted])

    const priceNumber = new BigNumber(price).multipliedBy(new BigNumber(10).pow(18))
    console.log("newprice:"+price)
    const setPrice = useCallback(async (): Promise<void> => {
        console.log("callbacknewprice:"+price)
        if(NFTExContract){
            if(price>0){
                const setargs = [
                    orderid,
                    priceNumber.toFixed()
                ]
                console.log(setargs)
                NFTExContract.setPrice(
                    ...setargs,{ gasLimit: 4500000})
                    .then((response: TransactionResponse) => {
                        addTransaction(response, {
                            summary: t('set price'),
                            setprice: {orderid,price}
                        })

                    })
                    .catch((error: any) => {
                        console.log(error)
                    })

            }
        }
    }, [price])





    return [state, setPrice]
}
