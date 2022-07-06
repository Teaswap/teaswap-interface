import React, { useEffect, useState } from 'react';
import { COLOR, FONT, DISTANCE } from '../../constants/style';
import styled from 'styled-components';
import useProduct from '../../hooks/productHooks/useProduct';
import { MEDIA_QUERY } from '../../constants/style';
import { useTranslation } from 'react-i18next';
import {hideAddr} from '../../utils/strUtil'
import ClickableAddr from './ClickableAddr'
import {AiOutlineEdit} from "react-icons/ai"
import Modal from '../Modal';
import { TextAreaComponent } from '../Input';
import { Button } from '../../theme';
import { setInfoAPI } from '../../webAPI/productAPI';

const ProductPictureContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 50%;
  ${MEDIA_QUERY.sm} {
    width: 100%;
    padding: 10px;
    justify-content: center;
  }
`;

const ProductPictureImg = styled.img`
  position: relative;
  transition: opacity 0.2s;
  width: 80%;
  // height: 100%;
  object-fit: contain;
`;

export const InfoTitle = styled.div`
  margin: ${DISTANCE.sm} auto;
  padding-bottom: ${DISTANCE.sm};
  font-size: 19px;
  color: ${COLOR.dark_gray};
  border-bottom: 1px solid ${COLOR.cccccc};

  ${MEDIA_QUERY} {
    margin: 20px 0;
    margin-bottom: 20px;
  }
`;

export const InfoBlock = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100px;
  font-weight: bold;
  line-height: 1.5rem;
  color: ${COLOR.black};
  white-space: pre-line;
  word-break: break-all;
`;

const ProductInfoWrap = styled.div`
  min-height: 180px;
  line-height: 1.5rem;
  width: 100%;
  font-weight: normal;
  color: ${COLOR.black};
  white-space: pre-line;
  word-break: break-all;
`;

export const InfoItem = styled.div`
  margin-top: ${DISTANCE.sm};
  display: flex;
  padding-bottom: ${DISTANCE.sm};
  display: flex;
  flex-direction: column;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.cccccc};
  }
`;

export const InfoItemTitle = styled.div`
  padding-right: 20px;
  padding-bottom: 20px;
  font-size: 13px;
  color: ${COLOR.text_2};
  word-break: break-all;
`;
const EditInfoDiv = styled.div`
  width: 94%;
  max-width: 800px;
  min-height: 300px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ProductPicture = ({ product }) => {
  const { loaded, onLoad } = useProduct();
  const preview = (productPictureUrl, media_type, loaded, onLoad) => {
    const src = productPictureUrl.startsWith('http') ? productPictureUrl : `https://teaswap.mypinata.cloud/ipfs/${productPictureUrl}`
    switch(media_type) {
      case 'Video':
        return <video style={{width: "80%"}} controls src={src} ></video>
      case "Audio":
        return <audio style={{width: "100%"}} controls src={src} ></audio>
      default:
        return (
          <ProductPictureImg
            src={src}
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={onLoad}
          />
        )
    }
  }
  if (!product || !product.picture_url) {
    return (
      <ProductPictureContainer loaded={loaded}>
        Loading...
        {JSON.stringify(product)}
      </ProductPictureContainer>
    )
  }
  return (
    <ProductPictureContainer loaded={loaded}>
      {preview(product.picture_url, product.media_type, loaded, onLoad)}
    </ProductPictureContainer>
  );
};

export const ProductIntro = ({ product, user }) => {
  const {t} = useTranslation();
  const [showEditInfo, setShowEditInfo] = useState(false)
  const [info, setInfo] = useState()
  const [infoText, setInfoText] = useState()
  const [msg, setMsg] = useState()
  const [saveText, setSaveText] = useState('Save')
  const saveInfo = () => {
    if (saveText !== 'Save') return
    setSaveText('Saving')
    setInfoAPI(product.id, info).then((res) => {
      if (res.ok === 1) {
        setShowEditInfo(false)
        setInfoText(info)
        setSaveText('Save')
      }else{
        setMsg(res.message)
        setSaveText('Save')
      }
    }).catch(err=> {
      setSaveText('Save')
    })
  }
  useEffect(() => {
    setInfo(product.info)
    setInfoText(product.info)
  }, [product])
  return (
    <>
      <InfoTitle>
        {t('Description')}
        {product.UserId == user.userId && (
          <span onClick={()=>setShowEditInfo(true)}>
            <AiOutlineEdit style={{cursor: 'pointer'}} />
          </span>
        )}
      </InfoTitle>
      <ProductInfoWrap>{infoText}</ProductInfoWrap>
      <Modal style={{
        maxWidth: 800,
        width: '100%'
      }} isOpen={showEditInfo} onDismiss={() => setShowEditInfo(false)}>
          <EditInfoDiv>
            <TextAreaComponent
              $margin={0}
              rows={10}
              onChange={(e) => {setInfo(e.target.value)}}
              value={info}
            ></TextAreaComponent>
            {msg && (
              <span style={{color: 'red'}}>{msg}</span>
            )}
            <Button onClick={saveInfo} style={{marginTop: 30}}>{t(saveText)}</Button>
          </EditInfoDiv>
      </Modal>
    </>
  );
};

export const FreightIntro = ({ product }) => {
  const {t} = useTranslation();
  const { vendorInfo, Creator, productCarts, productOrders, handleTokenSwitch } = useProduct();
  console.log('productCarts FreightIntro', productCarts)
  return (
    <>
      <InfoTitle>{t('Additional Details')}</InfoTitle>
      <InfoItem className="scroll-table">
        <InfoItemTitle>{t('Bidding')}</InfoItemTitle>
        {/* <InfoBlock>{product.delivery === '0' ? t('Bid') : t('Auction')}</InfoBlock> */}
        {productCarts && productCarts.length > 0 && (
           <p className="trading-line">
            <span>Event</span>
            <span className="addr">Address</span>
            <span>Product Price</span>
            <span>Bid Price</span>
            <span>Date</span>
          </p>
        )}
        {productCarts && productCarts.map((cart, index) => {
          return (
            <p className="trading-line">
              <span>{cart.status == 0 ? 'bidding' : cart.status == 1 ? 'trading' : 'withdrawn'}</span>
              <ClickableAddr address={cart.userAddress} />
              <span>{cart.product_price} {handleTokenSwitch(cart.extoken)}</span>
              <span>{cart.bidprice} {handleTokenSwitch(cart.extoken)}</span>
              <span>{new Date(cart.createdAt).toLocaleDateString()}</span>
            </p>
          )
        })}
      </InfoItem>
      <InfoItem className="scroll-table">
        <InfoItemTitle>{t('Trading History')}</InfoItemTitle>
        {productOrders && productOrders.length > 0 && (
            <p className="trading-line">
              <span>Event</span>
              <span>Price</span>
              <span className="addr">From</span>
              <span className="addr">To</span>
              <span>Date</span>
            </p>
        )}
        {productOrders && productOrders.map((order, index) => {
          if (order.Order)
            return (
              <p className="trading-line">
                <span>{order.Order.order_type == 1 ? 'Transfer' : 'Buy'}</span>
                <span>{(order.product_price)} {handleTokenSwitch(order.extoken)}</span>
                <ClickableAddr address={order.Order.seller_address} />
                <ClickableAddr address={order.Order.client_address} />
                <span>{new Date(order.Order.createdAt).toLocaleDateString()}</span>
              </p>
            )
          else return (<> </>)
        })}
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('Provenance')}</InfoItemTitle>
        <div>
          <p>Creator : <ClickableAddr address={Creator.address} /></p>
          <p>Owner : <ClickableAddr address={vendorInfo.address} /></p>
          <p>Contract Address : <ClickableAddr address={product.delivery_location} /></p>
          <p>Token ID : {product.tokenId}</p>
        </div>
      </InfoItem>
      <InfoItem style={{ borderBottom: 'none' }}>
        <InfoItemTitle>{t('Special notice')}</InfoItemTitle>
        <InfoBlock>
          {t('Discreet investment is suggested for the risk of the NFT market.')}
        </InfoBlock>
      </InfoItem>
    </>
  );
};

const PurchaseInfoLeftContainer = styled.section`
  width: 50%;
`;

export const PurchaseInfoLeft = ({ product }) => {
  return (
    <PurchaseInfoLeftContainer>
      <ProductPicture product={product} />
      <ProductIntro product={product} />
      <FreightIntro product={product} />
    </PurchaseInfoLeftContainer>
  );
};
