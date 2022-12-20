import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, MEDIA_QUERY } from '../../constants/style';
import useProduct from '../../hooks/productHooks/useProduct';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Modal from '../../components/Modal'
import {ApprovalState, useApproveNFTCallback} from "../../hooks/useApproveCallback";
import {NFTEXCHANGE, tokenOptions} from "../../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import useProductForm from "../../hooks/productHooks/useProductForm";
import {setPriceState, useSetPriceCallback} from "../../hooks/useSetPriceCallback";
import {InputItem} from "../productSystem";
import { IoIosMore } from 'react-icons/io'
import { LastBid } from "../../utils/strUtil"
import {TransferState, useTransferCallback} from "../../hooks/useTransferCallback";
import {useActiveWeb3React} from "../../hooks";
import { revokeState, useRevokeCallback } from '../../hooks/useRevokeCallback';

const ProductsContainer = styled.div`
  padding: 0px 10px 50px 10px;
`;

const ProductsWrap = styled.div`
`;

const ProductContainer = styled.div`
  position: relative;
  padding: 20px;
  margin: 40px 0px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 16px 24px rgba(0, 0, 0, 0.1),  0px 24px 32px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY.sm} {
    width: 100%;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  max-width: 380px;
`;

const ProductPicture = styled.img`
  position: relative;
  width: 100%;
  margin: 20px 0;
  // height: ${(props) => props.$height || '190px'};
  transition: opacity 0.2s;
  cursor: pointer;
`;

const ProductName = styled.div`
  margin-top: ${DISTANCE.md};
  text-align: left;
  cursor: pointer;
}
  a {
    display: block;
    font-size: ${FONT.xs};
    color: ${COLOR.black};
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
`;

const VendorName = styled.div`
  margin-top: ${DISTANCE.sm};
  text-align: left;
  cursor: pointer;
  a {
    display: block;
    font-size: ${FONT.xs};
    color: ${COLOR.text_2};
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
`;

const ProductPrice = styled.div`
  margin-top: 5px;
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Product = ({productCat, product, onLoad, loaded, $width, $height, $margin }) => {
  const{
    hasProductToken,
    handleChange,
    productToken,
    productPrice,
    setProductToken,
    hasProductPrice,
    setProductPrice,
  } = useProductForm()
  console.log("product:"+JSON.stringify(product))
  const {handleTokenSwitch} = useProduct();
  const formatter = new Intl.NumberFormat();
  const {t} = useTranslation();
  const { account,chainId } = useActiveWeb3React()
  const [isProof, setIsProof] = useState(false)
  const [isPrice, setIsPrice] = useState(false)
  const [approvalSubmitted, setApprovalSubmitted] = useState(false)
  const [setPriceSubmitted, setSetPriceSubmitted] = useState(false)
  const [transferSubmitted, setTransferSubmitted] = useState(false)
  const [revokeSubmitted, setRevokeSubmitted] = useState(false)
  const [setPriced, setSetPriced] = useState(false)
  const [newPrice, setNewPrice] = useState(0)
  const [toAddress, setToAddress] = useState('')
  const [reSalePrice, setReSalePrice] = useState(0)
  const [approval, approveCallback] = useApproveNFTCallback(NFTEXCHANGE[ChainId.BSC_MAINNET],product.tokenid,product.delivery_location,true)
  const [setPrice, setPriceCallback] = useSetPriceCallback(product.orderid,newPrice)
  const [revoke, revokeCallback] = useRevokeCallback(product.orderid)
  const [transfer, transferCallback] = useTransferCallback(product.tokenid,product.delivery_location,account ,toAddress)
  const {handleResaleProduct,handleSetPrice,handleTransfer, handleRevoke} = useProductForm()
  console.log("approval:"+approval)
  useEffect(() => {
    if (approval === ApprovalState.APPROVED && productPrice > 0) {
      setApprovalSubmitted(true)
      handleResaleProduct(product,parseFloat(productPrice),productToken)
    }
  }, [approval, approvalSubmitted])

  useEffect(() => {
    if (setPrice === setPriceState.SETED) {
      setSetPriceSubmitted(true)
      handleSetPrice(product,newPrice)
    }
  }, [setPrice, setPriceSubmitted])

  useEffect(() => {
    if (transfer === TransferState.SETED) {
      console.log("====here we go!!!!")
      setTransferSubmitted(true)
      handleTransfer(product.id,toAddress,chainId)
      setIsTransfer(false)
    }
  }, [transfer, transferSubmitted])

  useEffect(() => {
    console.log('revoke: ', revoke, revokeSubmitted)
    if (revoke === revokeState.SETED) {
      setRevokeSubmitted(true)
      handleRevoke(product.id)
    }
  }, [revoke, revokeSubmitted])


  const dismissProof = () => {
    setIsProof(false)
  }

  const [showMenu, setShowMenu] = useState(false)
  const [isTransfer, setIsTransfer] = useState(false)
  const [setPriceError, setSetPriceError] = useState('')

  const dismissPrice = () => {
    setIsPrice(false)
    setIsProof(false)
    setIsTransfer(false)
    setShowMenu(false)
    setSetPriceSubmitted(false)
  }

  const dismissTransfer = () => {
    setIsPrice(false)
    setIsProof(false)
    setIsTransfer(false)
    setToAddress('')
    setShowMenu(false)
    setSetPriceSubmitted(false)
  }

  const preview = (productPictureUrl, media_type, loaded, onLoad, $width, $height) => {
    const src = productPictureUrl.startsWith('http') ? productPictureUrl : `https://teaswap.mypinata.cloud/ipfs/${productPictureUrl}`
    switch(media_type) {
      case 'Video':
        return <video style={{width: "100%"}} controls src={src} ></video>
      case "Audio":
        return <audio style={{width: "100%"}} controls src={src} ></audio>
      default:
        return (
          <ProductPicture
            src={src}
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={onLoad}
            $width={$width}
            $height={$height}
          />
        )
    }
  }

  return (
    <ProductContainer $width={$width} $height={$height} $margin={$margin}>
      <ButtonContainer>
        {/* <NavLink className="a-link" to={`/nft/products/edit/${product.id}`}>
          {t('Edit NFT')}
        </NavLink> */}
        <span className="dropdown-menu-item" >{product.staked == 1 ? 'Staked' : product.status == '1' ? 'My Artwork' : 'Pending'}</span>
        {!productCat || productCat != 'created' && (
            <IoIosMore size="30" style={{ cursor: 'pointer' }} onClick={() => {
              setShowMenu(!showMenu)
            }} />
          )
        }
        {product.staked == 0 && (
          <div style={{
            display: showMenu ? 'block' : 'none'  
          }} className="dropdown-menu" onMouseLeave={() => {
            setShowMenu(false)
          }}>
            {product.status != '1' && (
              <span onClick={() => {
                setIsProof(true)
              }} className="dropdown-menu-item">{t("Approve")}</span>
            )}
            {product.status == '1' && (
              <span onClick={() => {
                revokeCallback()
              }} className="dropdown-menu-item">{t("Revoke")}</span>
            )}
            <span onClick={() => {
              setIsTransfer(true)
            }} className="dropdown-menu-item">{t("Transfer")}</span>
            <span onClick={() => {
              setIsPrice(true)
            }} className="dropdown-menu-item">{t("Set Price")}</span>
          </div>
        )}
        
      </ButtonContainer>
      <NavLink style={{marginTop: '20px', display:"block"}} to={`/nft/products/${product.id}`}>
        {preview(product.picture_url, product.media_type, loaded, onLoad, $width, $height)}
        {/* <ProductPicture
          src={product.picture_url}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={onLoad}
          $width={$width}
          $height={$height}
        /> */}
      </NavLink>
      <ProductName>
        <NavLink className="a-link" to={`/nft/products/${product.id}`}>{product.name}</NavLink>
      </ProductName>
      <VendorName>
        <NavLink className="a-link" to={`/nft/products/vendor/${product.User.id}`}>
          {product.User.nickname}
        </NavLink>
      </VendorName>
      {/* <ProductPrice>{formatter.format(product.price)}</ProductPrice> */}
      <ProductPrice>
        <span>
          {product.price} 
          <span style={{fontSize: '9px'}}>{' ' + handleTokenSwitch(product.extoken)}</span>
        </span>
        <span>
          {product.Cart_items && product.Cart_items.length>0 && (
            <span>Best Offer {LastBid(product.Cart_items) }
              <span style={{fontSize: '9px'}}>{' ' + handleTokenSwitch(product.Cart_items[0].extoken)}</span>
            </span>
          )}
        </span>
    </ProductPrice>
    {/*<ProductPrice>*/}
    {/*  quantity: {product.quantity}*/}
    {/*</ProductPrice>*/}
    <Modal isOpen={isProof} onDismiss={dismissPrice} maxHeight={90}>
      <div className="new-modal">
        <p>{t('Put On Sale')}</p>
        <InputItem
            title={t('Token')}
            label={t('Which token will you charge for your NFT?')}
            type={'radio'}
            options={tokenOptions}
            hasValue={hasProductToken}
            errorMessage={t('Please Choose Token')}
            handleChange={handleChange(setProductToken)}
            isNumber = {false}
            productPictureUrl={undefined}
            textareaRows={1}
            value={productToken}
        />
        <InputItem
            title={t('Price')}
            label={t('Price')}
            type={'input'}
            hasValue={hasProductPrice}
            errorMessage={t('Please Input Price')}
            handleChange={handleChange(setProductPrice)}
            isNumber = {false}
            options = {undefined}
            productPictureUrl={undefined}
            textareaRows={1}
            value={productPrice}
        />
        {setPriceError}
        <div className="modal-btns">
          <span className='btn-sm-100 btn-primary' onClick={(e) => {
            if (parseFloat(productPrice) <= 0) {
              setSetPriceError('价格不可为0')
            }
            approveCallback(e)
          }}>{t("Confirm")}</span>
          <span className='btn-sm-100 btn-primary' onClick={dismissProof}>{t("Cancel")}</span>
        </div>
      </div>
    </Modal>
    <Modal className="new-modal" isOpen={isPrice} onDismiss={dismissPrice} maxHeight={90}>
      <div className="new-modal">
        <p>{t('Set Price')}</p>
        <input type="text" className="input-primary" onChange={(e)=>setNewPrice(e.target.value)}/>
        <p>
          Best Offer: {LastBid(product.Cart_items)}
        </p>
        <div className="modal-btns">
          <span className='btn-sm-100 btn-primary' onClick={(e)=>setPriceCallback(e)}>{t("Confirm")}</span>
          <span className='btn-sm-100 btn-primary' onClick={dismissPrice}>{t("Cancel")}</span>
        </div>
      </div>
    </Modal>
      <Modal className="new-modal" isOpen={isTransfer} onDismiss={dismissTransfer} maxHeight={90}>
        <div className="new-modal">
          <p>{t('Transfer Address')}</p>
          <input type="text" className="input-primary" onChange={(e)=>setToAddress(e.target.value)}/>

          <div className="modal-btns">
            <span className='btn-sm-100 btn-primary' onClick={(e)=>transferCallback(e)}>{t("Confirm")}</span>
            <span className='btn-sm-100 btn-primary' onClick={dismissTransfer}>{t("Cancel")}</span>
          </div>
        </div>
      </Modal>
    </ProductContainer>
  );
};

export default function Products({
  products,
  id,
  handler,
  productErrorMessage,
  filter,
  productId,
  $width,
  $height,
  $margin,
  $padding,
  $justify,
  productCat,
}) {
  const { loaded, onLoad, getLeftCountForProduct } = useProduct();
  const appendPros = []
  const leftCount = getLeftCountForProduct({length: products.length})
  for(let i = 0; i < leftCount; i++) {
    appendPros.push(<Placeholder $width={$width} $margin={$margin} />)
  }
  console.log('appendPros', leftCount, appendPros)

  return (
    <>
      <ProductsContainer $padding={$padding}>
        <ProductsWrap className="auto-list-div">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                onLoad={onLoad}
                loaded={loaded}
                $width={$width}
                $height={$height}
                $margin={$margin}
                productCat={productCat}
              />
            );
          })}
          {appendPros}
        </ProductsWrap>
      </ProductsContainer>
      {/* {loaded && !productErrorMessage ? (
        <MoreButton
          id={id}
          products={products}
          handler={handler}
        />
      ) : (
        <ErrorMessage productErrorMessage={productErrorMessage} />
      )} */}
    </>
  );
}
