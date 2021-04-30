import React, { useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE } from '../../../constants/style';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StandardNavPage } from '../../../components/Page';
import useProduct from '../../../hooks/productHooks/useProduct';
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

const SellerProductTitle = styled.div`
  margin: ${DISTANCE.sm} auto;
  padding-bottom: ${DISTANCE.sm};
  font-size: ${FONT.lg};
  color: ${COLOR.text_2};
  border-bottom: 1px solid ${COLOR.cccccc};
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
    setIsShowContact,
    handleClick,
    handleVendorProductMoreButton,
    handleGetProductsFromVendor,
    handleGetUserById,
  } = useProduct();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProductsFromVendor(id, 1);
    handleGetUserById(id);
    return () => {
      dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, [id, dispatch]);

  const isMobile = window.innerWidth <= 1140;
  const {t} = useTranslation();
  return (
    <>
      <StandardNavPage>
        <Banner
          banner={vendorInfo.banner_url}
          loaded={loaded}
          onLoad={onLoad}
        />
        {isMobile ? (
          <SellerInfoMobile
            vendorInfo={vendorInfo}
            products={products}
            loaded={loaded}
            onLoad={onLoad}
            isShowContact={isShowContact}
            setIsShowContact={setIsShowContact}
            handleClick={handleClick}
          />
        ) : (
          <SellerInfo
            vendorInfo={vendorInfo}
            products={products}
            loaded={loaded}
            onLoad={onLoad}
            isShowContact={isShowContact}
            setIsShowContact={setIsShowContact}
            handleClick={handleClick}
          />
        )}
        <Announcement announcement={vendorInfo.announcement} />
        <SellerProductTitle>{t('Posted Works')}</SellerProductTitle>
        <Products
          products={products}
          id={id}
          handler={handleVendorProductMoreButton}
          productErrorMessage={productErrorMessage}
        />
      </StandardNavPage>
    </>
  );
};

export default VendorShopPage;
