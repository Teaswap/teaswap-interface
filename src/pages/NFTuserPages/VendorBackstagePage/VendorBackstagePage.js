import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, MEDIA_QUERY } from '../../../constants/style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StandardNavPage } from '../../../components/Page';
import useUser from '../../../hooks/userHooks/useUser';
import useProduct from '../../../hooks/productHooks/useProduct';
import { NavLink } from 'react-router-dom';
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
  // border-bottom: 1px solid ${COLOR.cccccc};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${MEDIA_QUERY.sm} {
    width: 90%;
    padding: 0px 5%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  ${MEDIA_QUERY.sm} {
    justify-content: center;
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

  const [productCat, setProductCat] = useState(0);

  const changeCat = function(t) {
    setProductCat(t)
  }


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
        
        {isSettingAnnouncement && (
          <SetAnnouncement setIsSettingAnnouncement={setIsSettingAnnouncement} />
        )}
        <Announcement handleSetAnnouncement={handleSetAnnouncement} announcement={user?user.announcement:''} />

        <SellerProductTitle>
          <div className='page-tabs'>
            <span className='page-tab' onClick={() => changeCat(0)}>
              In Wallet
            </span>
            <span className='page-tab' onClick={() => changeCat(1)}>
              On Sale
            </span>
            <span className='page-tab' onClick={() => changeCat(2)}>
              On Auction
            </span>
            <span className='page-tab' onClick={() => changeCat(3)}>
              Collected
            </span>
          </div>
          <NavLink style={{ minWidth: 'fit-content' }} to={'/nft/products/post'}>
            <NormalButton className="btn-sm-100" >{t('Add NFT')}</NormalButton>
          </NavLink>
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
