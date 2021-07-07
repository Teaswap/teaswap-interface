import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { IconComponent } from "../../components";
import { COLOR, FONT } from "../../constants/style";
import useCart from "../../hooks/cartHooks/useCart";
import { LoopCircleLoading } from "react-loadingg";
import { useDispatch } from "react-redux";
import useProduct from "../../hooks/productHooks/useProduct";
import Modal from "../Modal";
import {useNFTExchangeContract} from "../../hooks/useContract";
import {BETH, BUSD, CJAI, NFTEXCHANGE, PAYABLEETH, SHIH, UNI, ZERO_ADDRESS} from "../../constants";
import {ChainId, JSBI} from "@teaswap/uniswap-sdk";
import {TransactionResponse} from "@ethersproject/providers";
import {LoadingView, SubmittedView} from "../ModalViews";
import {AutoColumn} from "../Column";
import {TYPE} from "../../theme";
import {useTranslation} from "react-i18next";
import BigNumber from "bignumber.js";
import {addTransaction} from "../../state/transactions/actions";



const CartInfo = styled.div`
  display: flex;
  padding: 40px;
  width: 100%;
  min-width: 400px;
  justify-content: space-around;
  align-items: center;
`;
const ProductName = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
`;
const Photo = styled.div`
  width: 90px;
  height: 90px;
`;
const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Price = styled.p`
  font-weight: bold;
  color: ${COLOR.text_1};
  font-size: ${FONT.sm};
`;
const Container = styled.div``;
const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
`;
export default function ItemDetail({ Item }) {
    const {t} = useTranslation();
  const dispatch = useDispatch();
  const {
    isLoading,
    handleDeleteProductInCart,
    formatter,
    isPaying,
    completeOrder,
    checked,
  } = useCart();
  const { handleTokenSwitch } = useProduct()

  const [canBidid, setCanBidid] = useState('')
  const [attempting, setAttempting] = useState(false)
  const [hash, setHash] = useState('')
  const exContract = useNFTExchangeContract(NFTEXCHANGE[ChainId.BSC_MAINNET])
    const tokenOptions = [
        { name: 'BNB',address:ZERO_ADDRESS,token:PAYABLEETH[ChainId.BSC_MAINNET] },
        { name: 'BUSD',address:BUSD.address,token:BUSD },
        { name: 'TSA',address:UNI[ChainId.BSC_MAINNET].address,token:UNI[ChainId.BSC_MAINNET] },
        { name: 'Shih',address:SHIH.address,token:SHIH },
        { name: 'CJAI',address:CJAI.address,token:CJAI },
        { name: 'ETH',address:BETH.address,token:BETH }
    ]

    let exToken = PAYABLEETH[ChainId.BSC_MAINNET]
    for(let i = 0 ;i<tokenOptions.length;i++){
        if(tokenOptions[i].address === Item.productExtoken){
            exToken=tokenOptions[i].token
            break
        }
    }


  const onCancelBid = ()=>{
    setCanBidid(Item.cartItemId)
  }

  const onWithdrawBid = (item)=>{
    setAttempting(true)
    if (exContract && canBidid!='') {
      if (item.productExtoken===ZERO_ADDRESS){
        exContract.withdrawBidBNB(JSBI.BigInt(item.noworderid),((new BigNumber(item.bidprice)).mul(new BigNumber("1000000000000000000"))).toFixed(),{gasLimit: 3500000})
            .then((response) => {
              addTransaction(response, {
                summary: t('withdrawbid#'+item.noworderid)
              })
              setHash(response.hash)
            })
            .catch((error) => {
              setAttempting(false)
              console.log(error)
            })
      }else{

          console.log("item:"+JSON.stringify(item))
          exContract.withdrawBid(JSBI.BigInt(item.noworderid),((new BigNumber(item.bidprice)).mul(new BigNumber("1000000000000000000"))).toFixed(), { gasLimit: 1000000 })
              .then((response) => {
                addTransaction(response, {
                  summary: t('withdraw#'+item.noworderid)
                })
                setHash(response.hash)
              })
              .catch((error) => {
                setAttempting(false)
                console.log(error)
              })

      }
    }
  }

  const dismissCan = ()=>{
    setCanBidid('')
    setAttempting(false)
    setHash('')
  }

    useEffect(() => {
        if (attempting && hash) {
            handleDeleteProductInCart(Item.cartItemId)

        }
    }, [attempting, hash])
    

  return (
    <>
      {isLoading && (
        <LoadingBackground>
          <LoopCircleLoading />;
        </LoadingBackground>
      )}
      {!attempting && !hash && (
      <Modal className="new-modal" isOpen={canBidid!=''} onDismiss={dismissCan} maxHeight={90}>
        <div className="new-modal">
          <p>{t('Withdraw Bid')}</p>
          <input type="text" className="input-primary" />
          <div className="modal-btns">
            <span className='btn-sm-100 btn-primary' onClick={onWithdrawBid(Item)}>{t("Confirm")}</span>
            <span className='btn-sm-100 btn-primary' onClick={dismissCan}>{t("Cancel")}</span>
          </div>
        </div>
      </Modal>
      )}
        {attempting && !hash && (
            <Modal>
            <LoadingView onDismiss={dismissCan}>
                <AutoColumn gap="12px" justify={'center'}>
                    <TYPE.largeHeader>{t('Withdraw bid')}</TYPE.largeHeader>
                    <TYPE.body fontSize={20}>{Item.bidprice} {exToken.symbol}</TYPE.body>
                </AutoColumn>
            </LoadingView>
            </Modal>
        )}
        {attempting && hash && (
            <Modal>
            <SubmittedView onDismiss={dismissCan} hash={hash}>
                <AutoColumn gap="12px" justify={'center'}>
                    <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>
                    <TYPE.body fontSize={20}>
                        {t('receive')} {Item.bidprice} {exToken.symbol}
                    </TYPE.body>
                </AutoColumn>
            </SubmittedView>
            </Modal>
        )}
      <CartInfo>
        <Photo>
          <PhotoImg src={Item.pictureUrl}></PhotoImg>
        </Photo>
        <ProductName>{Item.productName}</ProductName>
        {/* <ChooseQuantity Item={Item} /> */}
        {completeOrder ? (
          <Price>{formatter.format(Item.price * Item.cartQuantity)}</Price>
        ) : (
          <Price>{formatter.format(Item.price)} {handleTokenSwitch(Item.productExtoken)}</Price>
        )}
        {checked || isPaying ? null : (
          <Container onClick={onCancelBid}>
            <IconComponent kind="delete" />
          </Container>
        )}
      </CartInfo>
        </>
  );
}
