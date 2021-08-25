import { COLOR, FONT, DISTANCE } from '../../constants/style';
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useCart from '../../hooks/cartHooks/useCart';
import { ActionButton } from '../NFTButton';
import { IconComponent } from '../../components';
import { InfoBlock } from '../../components/productSystem';
import { useTranslation } from 'react-i18next';
import {createOrder} from '../../redux/slices/cartSlice/cartSlice'
import {ButtonConfirmed, ButtonError} from '../Button';
import {
  useHasPendingBid,
  useTransactionAdder,
  useUserHasSubmittedBid
} from "../../state/transactions/hooks";
import {ApprovalState, useApproveCallback} from "../../hooks/useApproveCallback";
import {BETH, BUSD, CJAI, NFTEXCHANGE, PAYABLEETH, SHIH, TSALOT, UNI, ZERO_ADDRESS} from "../../constants";
import {TransactionResponse} from "@ethersproject/providers";
import {useETHBalances, useTokenBalance} from "../../state/wallet/hooks";
import {ChainId, ETHER, JSBI} from "@teaswap/uniswap-sdk";
import {LoadingView, SubmittedView} from "../ModalViews";
import {AutoColumn} from "../Column";
import {TYPE} from "../../theme";
import {useDerivedBidInfo} from "../../state/stake/hooks";
import {useNFTExchangeContract} from "../../hooks/useContract";
import CurrencyInputPanel from "../CurrencyInputPanel";
import {calculateGasMargin} from "../../utils";

const ProductInfoContainer = styled.div`
  width: 80%;
`;
const ProductName = styled.div`
  width:  100%;
  max-width: 520px;
  word-break: break-all;
  
  font-size: 18px;
  color: ${COLOR.text_2};
`;
// font-weight: normal;
const ProductPrice = styled.div`
  margin-top: ${DISTANCE.md};
  font-weight: bold;
  font-size: ${FONT.xs};
  color: ${COLOR.dark_gray};
`;

const ProductQuantityContainer = styled.div`
  margin-top: ${DISTANCE.md};
  margin-bottom: 50px;
  label {
    display: block;
    font-size: ${FONT.xs};
    color: ${COLOR.text_2};
    margin-bottom: ${DISTANCE.sm};
  }
`;

const InputName = styled.h2`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  margin: ${DISTANCE.sm} 0;
`;

const TwoButton = styled.div`
  margin: ${DISTANCE.md} auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCountSelect = styled.select`
  line-height: 1.4;
  font-size: 14px;
  color: #39393e;
  padding: 10px 14px 10px 14px;
  background-color: #fff;
  border: none;
  border-right: 14px solid #fff;
  box-shadow: 0 0 0 1px #d3d3d5;
  box-sizing: border-box;
  border-radius: 0;
  padding-right: 34px;
  margin: 1px;
  background-image: url(data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath class='color' d='M0 0h10L5 6z' fill='%23D3D3D5' fill-rule='evenodd'/%3E%3C/svg%3E%0A);
}
`;

const SoldOutMessage = styled.div`
  margin-top: ${ '2px'};
  display: flex;
  align-items: center;
  font-size: ${FONT.lg};
  font-weight: bold;
  color: ${COLOR.hover};
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
  padding-top: 90px;
`;
const Form = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 80px auto;
  height: 300px;
  width: 40%;
  min-width: 300px;
  border-radius: 9px;
  background: ${COLOR.white};
  letter-spacing: 1px;
  color: ${COLOR.text_1};
  font-size: ${FONT.md};
`;
const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 10px;
  margin-right: 10px;
`;

const Options = ( {quantity}:{quantity:number} ) => {
  let options = [];
  for (let i = 1; i <= quantity; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return <>{options}</>;
};

interface cateInterface{
  id:number,
  name:string
}

interface userMiniInterface {
  id:number,
  username: string,
  nickname: string,
  address: string
}

interface ProductInterface{
  id:number,
  Product_category:cateInterface,
  name: string,
  picture_url: string,
  info: string,
  UserId:number,
  price: number,
  quantity: number,
  delivery: number,
  delivery_location: string,
  delivery_time: number,
  payment_method: number,
  royalty:number,
  extoken:string,
  media_type:string,
  remark: string,
  tokenId: string,
  orderId: string,
  status: number,
  createdAt:string,
  sale_copyright: number,
}

const ProductQuantitySelector = ({quantity, status}:{quantity:number, status: number}) => {
  const { handleSelectQuantity } = useCart();
  const {t} = useTranslation();
  return (
    <>
      {status == 1 && (
        <ProductQuantityContainer>
          <label>{t('Number')}</label>
          <ProductCountSelect onChange={(e) => handleSelectQuantity(e)}>
            <Options quantity={quantity} />
          </ProductCountSelect>
        </ProductQuantityContainer>
      )}
      {status == 0 && (
        <ProductQuantityContainer>
          <SoldOutMessage>{t('Unlisted')}</SoldOutMessage>
        </ProductQuantityContainer>
      )}
      {status == 3 && (
        <ProductQuantityContainer>
          <SoldOutMessage>{t('Sold out')}</SoldOutMessage>
        </ProductQuantityContainer>
      )}
    </>
  );
};

const ShoppingCart = styled(ActionButton)`
  width: 100%;
  margin: 0;
  margin-top : 10px;
  width : 100%;
  border: 1px solid #cccccc;
  color: #111;
  background-color: transparent;
  font-weight: 400;
  padding: 8px;
  border-radius: 0;
  line-height: 24px;
  :hover{
    border-color : #000000;
  }
`;

const ShoppingBuy = styled(ActionButton)`
  margin-top : 10px;
  line-height: 24px;
  width : 100%;
  border: 1px solid #cccccc;
  color: #111;
  background-color: transparent;
  font-weight: 400;
  padding: 8px;
  border-radius: 0;
  :hover{
    background-color : ${COLOR.btn_grey};
    padding: 8px;
    color: #ffffff;
  }
`;

const RemindBlock = styled(InfoBlock)`
  margin-top: 20px;
  height: 100px;
  width: 100%;
  font-weight: normal;
  font-size: ${FONT.md};
  color: ${COLOR.text_2};
`;

const Remind = () => {
  return (
    <RemindBlock>

    </RemindBlock>
  );
};

export enum bidState {
  UNKNOWN,
  NOT_BID,
  PENDING,
  BIDED
}

export const ProductInfo = ({product,user}:{ product:ProductInterface ,user:userMiniInterface}) => {
  const dispatch = useDispatch();
  // const {user} = useUser();
  // const { user } = useOrder();
  const [bidValue, setBidValue] = useState('');
  const [isBiding, setIsBiding] = useState(false);
  const [, setWitch] = useState(0);
  const tokenOptions = [
    { name: 'BNB',address:ZERO_ADDRESS,token:PAYABLEETH[ChainId.BSC_MAINNET] },
    { name: 'BUSD',address:BUSD.address,token:BUSD },
    { name: 'TSA',address:UNI[ChainId.BSC_MAINNET].address,token:UNI[ChainId.BSC_MAINNET] },
    { name: 'Shih',address:SHIH.address,token:SHIH },
    { name: 'CJAI',address:CJAI.address,token:CJAI },
    { name: 'ETH',address:BETH.address,token:BETH },
    { name: 'LOT',address:TSALOT.address,token:TSALOT}
  ]
  const {
    errorMessage,
    handleCloseAddProduct,
    handleAlert,
    handleAddProduct,
  } = useCart();
  const {t} = useTranslation();
  // const formatter = new Intl.NumberFormat('zh-TW', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 0,
  // });

  let exToken = PAYABLEETH[ChainId.BSC_MAINNET]
  for(let i = 0 ;i<tokenOptions.length;i++){
    if(tokenOptions[i].address === product.extoken){
      exToken=tokenOptions[i].token
      break
    }
  }
  // useEffect(() => {
  //   getUser()(dispatch);
  // }, [dispatch]);

  const handlebidModal = (which:number)=>{
    setIsBiding(true);
    setWitch(which);
  };

  const [approvalSubmitted, setApprovalSubmitted] = useState(false)

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const userETHBlance = useETHBalances(user.address ? [user.address] : [])?.[user.address ?? '']
  const userTokenAmount = useTokenBalance(user.address ?? undefined, exToken)
  const userUnused = exToken.address===ZERO_ADDRESS? userETHBlance : userTokenAmount
  const { parsedAmount, error } = useDerivedBidInfo(bidValue, exToken, userUnused)

  const [attempting, setAttempting] = useState(false)
  const [hash, setHash] = useState('')
  const wrappedOnDismiss = useCallback(() => {
    setHash('')
    setAttempting(false)
    setIsBiding(false)
  }, [])

  const [approval, approveCallback] = useApproveCallback(parsedAmount, NFTEXCHANGE[ChainId.BSC_MAINNET])
  const pendingBid = useHasPendingBid(product.orderId,bidValue)
  const {bidSubmitted,} = useUserHasSubmittedBid(product.orderId,bidValue)


  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const bState:bidState = useMemo(() => {
    return !bidSubmitted? pendingBid ? bidState.PENDING : bidState.NOT_BID: bidState.BIDED
  }, [pendingBid,bidSubmitted])

  useEffect(() => {
    console.log("bidState:"+bState, attempting, hash, bidValue)
    // todo bug 
    /**
     * bidState:2 true 0xff859545e2b954b5905075d2e35ed7c1ed7d13da53e4467f4e84a931eb1048f2 10400
       bidState:2 false  10400
       bidState:3 false  10400
     **/
    if (attempting && hash && bState===bidState.BIDED) {
      if(bidValue === product.price.toString()){
        console.log("bidState product:"+JSON.stringify(product))
        createOrder([{
          ProductId: product.id,
          UserId: product.UserId,
          product_quantity: product.quantity,
        }])(dispatch);
        wrappedOnDismiss()
      }else {
        handleAddProduct(product.id, product.quantity, user.id, bidValue,product.orderId)
        wrappedOnDismiss()
      }

    }
  }, [attempting, hash,bState])

  // const isArgentWallet = useIsArgentWallet()
  const exContract = useNFTExchangeContract(NFTEXCHANGE[ChainId.BSC_MAINNET])
  async function onBid() {
    setAttempting(true)
    if (exContract && parsedAmount) {
      if (product.extoken===ZERO_ADDRESS){

        const estimatedGas = await exContract.estimateGas.bidBNB(JSBI.BigInt(product.orderId),{value:`0x${parsedAmount.raw.toString(16)}`}).catch(() => {
          return exContract.estimateGas.bidBNB(JSBI.BigInt(product.orderId),{value:`0x${parsedAmount.raw.toString(16)}`})
        })

        exContract.bidBNB(JSBI.BigInt(product.orderId),{gasLimit: calculateGasMargin(estimatedGas), value:`0x${parsedAmount.raw.toString(16)}`})
            .then((response:TransactionResponse) => {
              addTransaction(response, {
                summary: t('bid#'+product.orderId),
                bid:{orderid:product.orderId,price:bidValue}
              })
              setHash(response.hash)
            })
            .catch((error:any) => {
              setAttempting(false)
              console.log(error)
            })
      }else{
        if (approval === ApprovalState.APPROVED) {
          console.log("product:"+JSON.stringify(product))

          const estimatedGas = await exContract.estimateGas.bid(JSBI.BigInt(product.orderId),`0x${parsedAmount.raw.toString(16)}`).catch(() => {
            return exContract.estimateGas.bid(JSBI.BigInt(product.orderId),`0x${parsedAmount.raw.toString(16)}`)
          })

          exContract.bid(JSBI.BigInt(product.orderId),`0x${parsedAmount.raw.toString(16)}`, { gasLimit: calculateGasMargin(estimatedGas) })
              .then((response:TransactionResponse) => {
                addTransaction(response, {
                  summary: t('bid#'+product.orderId),
                  bid:{orderid:product.orderId,price:bidValue}
                })
                setHash(response.hash)
              })
              .catch((error:any) => {
                setAttempting(false)
                console.log(error)
              })
        }
        else {
          setAttempting(false)
          throw new Error(t('attempting-to-stake-without-approval-or-a-signature-please-contact-support'))
        }
      }
    }
  }

  // const handleBid =()=>{
  //   const bidValueUint256 = (new BigNumber(bidValue).mul(new BigNumber("1000000000000000000"))).toFixed()
  //
  // };
  //
  // const handleApprove = () =>{
  //
  // }
  return (
    <ProductInfoContainer>
      {errorMessage && (
        <Modal>
          <Form>
            <IconContainer onClick={handleCloseAddProduct}>
              <IconComponent kind='close-black' margin={0} color={COLOR.dark_gray}/>
            </IconContainer>
            {console.log(errorMessage)}
            Something wrong
          </Form>
        </Modal>
      )}
      {isBiding && (
        <Modal>
          {!attempting && !hash && (
              <Form>
                <IconContainer onClick={wrappedOnDismiss}>
                  <IconComponent kind='close-black' margin={0} color={COLOR.dark_gray}/>
                </IconContainer>
                <InputName>{t('Input biding price')}</InputName>
                <CurrencyInputPanel
                    id='bidprice'
                    currency={exToken.address===ZERO_ADDRESS?ETHER:exToken}
                    onMax={()=>{}}
                    showMaxButton={false}
                    pair={null}
                    label={''}
                    disableCurrencySelect={true}
                    value = {bidValue}
                    onUserInput={(typed) => setBidValue(typed)}
                    customBalanceText={'Available to buy: '}
                />
                <TwoButton>
                  <ButtonConfirmed
                      onClick={approveCallback}
                      confirmed={approval === ApprovalState.APPROVED || approvalSubmitted}
                      altDisabledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
                      disabled={approval !== ApprovalState.NOT_APPROVED }
                  >
                    {t('Approve')}
                  </ButtonConfirmed>
                  <ButtonError
                      style={{marginLeft: '20px'}}
                      disabled={!!error || ( approval !== ApprovalState.APPROVED)}
                      error={!!error && !!parsedAmount}
                      onClick={onBid}
                  >
                    {!error?
                      bidValue===product.price.toString()?t('Buy'):t('Bid'):error }
                  </ButtonError>
                </TwoButton>
              </Form>
          )}
          {attempting && !hash && (
              <LoadingView onDismiss={() => {}}>
                <AutoColumn gap="12px" justify={'center'}>
                  <TYPE.largeHeader>{t('NFT Biding')}</TYPE.largeHeader>
                  <TYPE.body fontSize={20}>{parsedAmount?.toSignificant(4)} {exToken.symbol}</TYPE.body>
                </AutoColumn>
              </LoadingView>
          )}
          {attempting && hash && (
            
              <SubmittedView onDismiss={() => {}} hash={hash}>
                  <AutoColumn gap="12px" justify={'center'}>
                    <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>
                    <TYPE.body fontSize={20}>
                      {t('send')} {parsedAmount?.toSignificant(4)} {exToken.symbol}
                    </TYPE.body>
                  </AutoColumn>
              </SubmittedView>
          )}
        </Modal>
      )}
      <ProductName>{product.name || 'Loading...'}</ProductName>
      <ProductPrice>{product.price+" "+exToken.symbol} </ProductPrice>
      <ProductName style={{fontSize: '12px', marginTop: '10px'}}>Copyright Transferred: {product.sale_copyright ? 'Yes' : 'No'} &nbsp;&nbsp;&nbsp;  Royalty: {product.royalty/100}% </ProductName>
      <ProductQuantitySelector status={product.status} quantity={product.quantity} />
      <ProductName style={{fontSize: '12px', marginTop: '10px'}}>You must place a bid that is higher than the current bid. </ProductName>
      {user ? (
        <ShoppingCart
          onClick={()=>handlebidModal(0)}
        >
          {t('Bid')}
        </ShoppingCart>
      ) : (
        <ShoppingCart onClick={handleAlert}>
          {t('Bid')}
        </ShoppingCart>
      )}
      {user ? (
        <ShoppingBuy
          onClick={()=>handlebidModal(1)}
        >
          {t('Buy Now')}
        </ShoppingBuy>
        ) : (
        <ShoppingBuy onClick={handleAlert}>
        {t('Buy Now')}
        </ShoppingBuy>
      )}
      <Remind />
    </ProductInfoContainer>
  );
};
