import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE } from '../../../constants/style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StandardNavPage } from '../../../components/Page';
import useUser from '../../../hooks/userHooks/useUser';
import useProduct from '../../../hooks/productHooks/useProduct';
import { NormalButton, Nav } from '../../../components/NFTButton';
import {
  SellerInfo,
  SetAnnouncement,
  Products,
} from '../../../components/userSystem';
import { Banner, Announcement } from '../../../components/productSystem';
import {
  setProducts,
  setErrorMessage,
} from '../../../redux/slices/productSlice/productSlice';
import { useTranslation } from 'react-i18next';

const SellerProductTitle = styled.div`
  margin: ${DISTANCE.sm} auto;
  padding-bottom: ${DISTANCE.sm};
  font-size: ${FONT.lg};
  color: ${COLOR.text_2};
  border-bottom: 1px solid ${COLOR.cccccc};
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  & > button {
    position: absolute;
    transform: translate(-150%, 50px);
    &:hover {
      transform: translate(-150%, 50px);
    }
  }
`;

const VendorBackstagePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [isSettingAnnouncement, setIsSettingAnnouncement] = useState(false);
  const { user, handleGetMe } = useUser();
  const {t} = useTranslation();
  const {
    loaded,
    onLoad,
    vendorInfo,
    products,
    productErrorMessage,
    handleVendorProductMoreButton,
    handleGetProductsFromVendor,
    handleGetUserById,
  } = useProduct();

  const handleSetAnnouncement = () => {
    setIsSettingAnnouncement(true);
  };

  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (!result.data.is_vendor) navigate('/');
      setId(result.data.userId);
      handleGetUserById(result.data.userId);
      handleGetProductsFromVendor(result.data.userId, 1);
    });
    return () => {
      dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, []);

  return (
    <>
      <Banner banner={vendorInfo.banner_url} loaded={loaded} onLoad={onLoad} />
      <StandardNavPage>
        <SellerInfo
          vendorInfo={vendorInfo}
          products={products}
          loaded={loaded}
          onLoad={onLoad}
        />
        <ButtonContainer>
          <NormalButton  onClick={handleSetAnnouncement}>{t('Edit Description')}</NormalButton>
        </ButtonContainer>
        {isSettingAnnouncement && (
          <SetAnnouncement setIsSettingAnnouncement={setIsSettingAnnouncement} />
        )}
        <Announcement announcement={user?user.announcement:''} />

        <SellerProductTitle>
          <p>{t('Posted NFTs')} </p>
          <Nav children={t('Add NFT')} path={'/nft/products/post'} />
        </SellerProductTitle>
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

export default VendorBackstagePage;
