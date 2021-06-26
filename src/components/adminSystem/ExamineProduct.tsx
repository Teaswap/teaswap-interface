import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import useAdmin from '../../hooks/adminHooks/useAdmin';
import { DISTANCE } from '../../constants/style';
import { ActionButton } from '../NFTButton';
import { ExamineSelector } from '../../components/adminSystem';
import {BUSD, CJAI, NFTEXCHANGE,  SHIH, UNI, ZERO_ADDRESS} from "../../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import {calculateGasMargin} from "../../utils";
import {TransactionResponse} from "@ethersproject/providers";
import {useNFTExchangeContract} from "../../hooks/useContract";
import {useTransactionAdder} from "../../state/transactions/hooks";
import BigNumber from "bignumber.js";
import { useNFTLastOrderId} from "../../state/wallet/hooks";

const ExamineProductContainer = styled.div`
  margin: ${DISTANCE.md} 0;
`;

const ProductsTable = styled.table`
  width: 100%;
  min-width: max-content;
`;

const ProductsThead = styled.thead``;

const ProductsTbody = styled.tbody``;

const ProductTr = styled.tr``;

const ProductTh = styled.th``;

const ProductTd = styled.td`
  text-align: center;
  max-width: 100px;
  padding: 0 10px;
  word-break: break-all;
`;

const ProductImage = styled.img`
  width: 80px;
  min-height: 80px;
  min-width: 80px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export interface cateInterface{
    id:number,
    name:string
}

export interface userMiniInterface {
    username: string,
    nickname: string,
    address: string
}

export interface orderidsjason {
    orderid: string,
}


export interface ProductInterface{
    id:number,
    Product_category:cateInterface,
    name: string,
    picture_url: string,
    info: string,
    User:userMiniInterface,
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
    tokenid: number,
    status: number,
    createdAt:string
}

interface productItemProps {
    key: number
    product: ProductInterface
    setPassedProducts: Function
}


const ProductsItem = ({key, product, setPassedProducts}:productItemProps ) => {
  // const { setThousandths } = useAdmin();
  const extoken = product.extoken
  const tokenOptions = [
        { name: 'BNB',value:ZERO_ADDRESS },
        { name: 'BUSD',value:BUSD.address },
        { name: 'TSA',value:UNI[ChainId.BSC_MAINNET].address },
        { name: 'Shih',value:SHIH.address },
        { name: 'CJAI',value:CJAI.address },
    ]

    let extokenName = ''
    for(let i = 0 ;i<tokenOptions.length;i++){
        if(tokenOptions[i].value === extoken){
            extokenName=tokenOptions[i].name
            break
        }
    }


  return (
    <ProductTr>
      <ProductTd>{product.id}</ProductTd>
      <ProductTd>
        <ProductImage src={product.picture_url} />
      </ProductTd>
      <ProductTd>{product.name}</ProductTd>
      <ProductTd>{product.Product_category.name}</ProductTd>
      <ProductTd>{product.price+extokenName}</ProductTd>
      <ProductTd>{product.User.nickname}</ProductTd>
      <ProductTd>{product.info}</ProductTd>
      <ProductTd>{product.royalty/100}</ProductTd>
      <ProductTd>{product.createdAt.split('T')[0]}</ProductTd>
      <ProductTd>
      <ExamineSelector setPassedProducts={(status: any, product: ProductInterface) => {
          setPassedProducts(status, product)
        }} product={product} />
      </ProductTd>
    </ProductTr>
  );
};

export default function ExamineProduct() {

  const { products, handleGetUnCheckProducts,  passedProduct,handleUpdateProductsOrderid } = useAdmin();
  
  // var initialPP:= []
  var [passedProducts, setPassedProducts] = useState([] as  Array<ProductInterface>);

  // const {passedProducts,  } = useAdmin()


  useEffect(() => {
    handleGetUnCheckProducts();
  }, []);

  const exchangeContract = useNFTExchangeContract(NFTEXCHANGE[ChainId.BSC_MAINNET])
  const addTransaction = useTransactionAdder()
  const [nfts,setNfts] = useState([] as Array<string>)
  const [ids,setIds] = useState([] as Array<number>)
  const [amounts,setAmounts] = useState([] as Array<number>)
  const [owners,setOwners] = useState([] as Array<string>)
  const [prices,setPrices] = useState([] as Array<string>)
  const [royalties,setRoyalties] = useState([] as Array<number>)
  const [exchangeTokens,setExchangeTokens] = useState([] as Array<string>)
  const [orderIds,setOrderIds] = useState([] as Array<orderidsjason>)
    const [tableIds,setTableIds] = useState([] as Array<string>)
    const [passProducts, setPassProducts] = useState([] as Array<ProductInterface>)
  const lastIdres = useNFTLastOrderId(NFTEXCHANGE[ChainId.BSC_MAINNET])
    const lastId = useMemo(()=>{
        if (lastIdres) {
            console.log("postpage--lastIdres:"+lastIdres)
            return lastIdres
        }else{
            return undefined
        }
    },[lastIdres])
    // const [sendClick,setSendClick] = useState(false)
  //   const addorderCallback = useCallback( async ()=>{
  //           if(!sendClick){
  //               return
  //           }
  //
  //           setSendClick(false)
  //
  //       }
  //       ,[exchangeContract,addTransaction,sendClick])

    useEffect(()=>{
        if(passedProduct!={}){
            const newPasseds =  passProducts
            newPasseds.push(passedProduct as ProductInterface)
            setPassProducts(newPasseds)
        }
    },[passedProduct])


    const handleBatchAddOrder = async ()=>{

      console.log('handleBatchAddOrder', passedProduct, passedProducts)

        if(lastId===undefined){
            alert("no nft order found")
            return
        }

      for(let i = 0;i<passedProducts.length;i++){
          let pProduct:ProductInterface = passedProducts[i]
          let priceNumber = new BigNumber(pProduct.price).multipliedBy(new BigNumber(10).pow(18))
          nfts.push(pProduct.delivery_location)
          ids.push(pProduct.tokenid)
          amounts.push(1)
          owners.push(pProduct.User.address)
          prices.push( priceNumber.toFixed() )
          royalties.push(pProduct.royalty)
          exchangeTokens.push(pProduct.extoken)
          orderIds.push({orderid:(Number(lastId)+i).toString()})
          tableIds.push(pProduct.id.toString())
          setNfts(nfts)
          setIds(ids)
          setAmounts(amounts)
          setOwners(owners)
          setPrices(prices)
          setRoyalties(royalties)
          setExchangeTokens(exchangeTokens)
          setOrderIds(orderIds)
          setTableIds(tableIds)
      }
      // window.location.reload()
      // setSendClick(true)

        if(!exchangeTokens){ return }
        if(!exchangeContract){ return }

        if(passedProducts.length===0){ return }

        const estimatedGas = await exchangeContract.estimateGas.batchAddOrder(nfts, ids,amounts ,owners,prices,royalties,exchangeTokens).catch(() => {
            return exchangeContract.estimateGas.batchAddOrder(nfts, ids,amounts ,owners,prices,royalties,exchangeTokens)
        })

        exchangeContract
          .batchAddOrder(nfts, ids,amounts ,owners,prices,royalties,exchangeTokens, {
              gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
              addTransaction(response, {
                  summary: 'batchaddorder ',
              })
              const pids = tableIds.join(",")
              handleUpdateProductsOrderid(pids,orderIds)
          })
          .catch((error: Error) => {
              console.debug('Failed to add order', error)
              throw error
          })
        const pids = tableIds.join(",")
        handleUpdateProductsOrderid(pids,orderIds)
        window.location.reload()
    }

  return (
    <ExamineProductContainer>
      <ProductsTable>
        <ProductsThead>
          <ProductTr>
            <ProductTh>id</ProductTh>
            <ProductTh>圖片</ProductTh>
            <ProductTh>商品名稱</ProductTh>
            <ProductTh>類別</ProductTh>
            <ProductTh>價格</ProductTh>
            <ProductTh>艺术家</ProductTh>
            <ProductTh>简介</ProductTh>
            <ProductTh>版税%</ProductTh>
            <ProductTh>刊登時間</ProductTh>
            <ProductTh>審查</ProductTh>
          </ProductTr>
        </ProductsThead>
        <ProductsTbody>
          {products.map((product:ProductInterface, index:number) => (

            <ProductsItem key={index} product={product} setPassedProducts={(status:any , product:ProductInterface) => {
              // const status = e.target.value === '通過' ? '1' : '2';
              if(status === '1'){
                // let products: Array<ProductInterface> = passedProducts
                passedProducts.push(product)
                setPassedProducts(passedProducts)
              }else{
                setPassedProducts(passedProducts.filter(v => v.id != product.id))
              }
            }} />

          ))}
        </ProductsTbody>
      </ProductsTable>
      <BottomContainer>
        <ActionButton onClick={handleBatchAddOrder}>
          送出
        </ActionButton>
      </BottomContainer>
    </ExamineProductContainer>
  );
}
