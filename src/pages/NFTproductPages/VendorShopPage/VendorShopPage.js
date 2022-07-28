import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, MEDIA_QUERY } from '../../../constants/style';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StandardNavPage } from '../../../components/Page';
import useProduct from '../../../hooks/productHooks/useProduct';
import Pagination from '../../../components/Pagination/Index';
import {
  Banner,
  SellerInfo,
  SellerInfoMobile,
  Announcement,
  Products,
} from '../../../components/productSystem';
import {
  setProducts,
  setErrorMessage,
} from '../../../redux/slices/productSlice/productSlice';
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom';
import { NormalButton, Nav } from '../../../components/NFTButton';
import ProfileMenu from '../../../components/Menu/ProfileMenu';

const SellerProductTitle = styled.div`
  margin: ${DISTANCE.sm} auto;
  padding-bottom: ${DISTANCE.sm};
  font-size: ${FONT.lg};
  color: ${COLOR.text_2};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  ${MEDIA_QUERY.sm} {
    width: 90%;
    padding: 0px 5%;
  };
`;

const VendorShopPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loaded,
    onLoad,
    isShowContact,
    vendorInfo,
    products,
    productErrorMessage,
    page,
    productCount,
    setIsShowContact,
    handleClick,
    handleVendorProductMoreButton,
    handleGetProductsFromVendor,
    handleGetUserById,
  } = useProduct();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProductsFromVendor(id, 1, productCat);
    handleGetUserById(id);
    return () => {
      dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, [id, dispatch]);

  const isMobile = window.innerWidth <= 1140;
  const {t} = useTranslation();

  const [productCat, setProductCat] = useState('all');

  const changeCat = function(t) {
    setProductCat(t)
    handleGetProductsFromVendor(id, page, t);
  }
  
  return (
    <>
      <StandardNavPage>
        <Banner
          banner={vendorInfo.banner_url || 'https://teaswap.mypinata.cloud/ipfs/QmeZTUCoNXTxw4K8eX9kWev6jHaCyJuaHSoueJf21DEXnw'}
          loaded={loaded}
          onLoad={onLoad}
        />
          <SellerInfo
            vendorInfo={vendorInfo}
            products={products}
            loaded={loaded}
            onLoad={onLoad}
            isShowContact={isShowContact}
            setIsShowContact={setIsShowContact}
            handleClick={handleClick}
          />
        {/* )} */}
        <Announcement announcement={vendorInfo.description} />
        <SellerProductTitle>
          <div className='page-tabs'>
            <span className={productCat == 'all' ? 'active-page-tab' : 'page-tab'} onClick={() => changeCat('all')}>
              In Wallet
            </span>
            <span className={productCat == 'sale' ? 'active-page-tab' : 'page-tab'} onClick={() => changeCat('sale')}>
              On Sale
            </span>
            <span className={productCat == 'auction' ? 'active-page-tab' : 'page-tab'} onClick={() => changeCat('auction')}>
              On Auction
            </span>
            <span className={productCat == 'collected' ? 'active-page-tab' : 'page-tab'} onClick={() => changeCat('collected')}>
              Collected
            </span>
            <span className={productCat == 'collected' ? 'active-page-tab' : 'page-tab'} onClick={() => changeCat('created')}>
              Created
            </span>
            <ProfileMenu />
          </div>
        </SellerProductTitle>
        <Products
          products={products}
          id={id}
          handler={handleVendorProductMoreButton}
          productErrorMessage={productErrorMessage}
        />
        <Pagination count={productCount} page={page} handleChange={(_page) => {
          handleGetProductsFromVendor(id, _page, productCat)
        }} />
      </StandardNavPage>
    </>
  );
};

export default VendorShopPage;
