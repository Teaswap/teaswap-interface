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
import Pagination from '../../../components/Pagination/Index';

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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  ${MEDIA_QUERY.sm} {
    width: 100%;
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
    page,
    productCount,
    handleVendorProductMoreButton,
    handleGetProductsFromVendor,
    handleGetUserById,
  } = useProduct();

  console.log('useProduct', products)

  const handleSetAnnouncement = () => {
    setIsSettingAnnouncement(true);
  };

  const { handleApplyForVendor } = useUser();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      // todo 自动
      if (!result.data.is_vendor) {
        handleApplyForVendor()
        // navigate('/');
        setTimeout(() => {
          window.location.href = window.location.href
        }, 500)
      }else{
        setId(result.data.userId);
        handleGetUserById(result.data.userId);
        handleGetProductsFromVendor(result.data.userId, 1, productCat);
      }
    });
    return () => {
      dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, []);

  const [productCat, setProductCat] = useState('all');

  const changeCat = function(t) {
    setProductCat(t)
    handleGetProductsFromVendor(id, page, t);
  }

  console.log('product cat', productCat)

  return (
    <>
      <Banner banner={vendorInfo.banner_url || 'https://i.imgur.com/3zpk96J.jpg'} loaded={loaded} onLoad={onLoad} />
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
        <Announcement handleSetAnnouncement={handleSetAnnouncement} announcement={user?user.description:''} />

        <SellerProductTitle className="SellerProductTitle">
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
          </div>
          <div>
            <NavLink style={{ minWidth: 'fit-content' }} to={'/nft'}>
              <NormalButton className="btn-sm-100" >{t('Buy NFT')}</NormalButton>
            </NavLink>
            <NavLink style={{ minWidth: 'fit-content' }} to={'/nft/products/post'}>
              <NormalButton className="btn-sm-100" >{t('Insert NFT')}</NormalButton>
            </NavLink>
          </div>
        </SellerProductTitle>
        <Products
          productCat={productCat}
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

export default VendorBackstagePage;
