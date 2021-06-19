import React, { useState, useEffect } from 'react';
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
  // border-bottom: 1px solid ${COLOR.cccccc};
  text-align: center;
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

  const [productCat, setProductCat] = useState(0);

  const changeCat = function(t) {
    setProductCat(t)
  }

  return (
    <>
      <StandardNavPage>
        <Banner
          banner={vendorInfo.banner_url}
          loaded={loaded}
          onLoad={onLoad}
        />
        {/* <div className="user-icons">
          <ExternalLink className="margin10" href={`${vendorInfo.twitter}`}>
            <AiFillTwitterSquare title="twitter" size="30"/>
          </ExternalLink>
          <NavLink className="margin10" style={{ minWidth: 'fit-content' }} to={`/nft/users/vendor/${id}`}>
            <AiOutlineUser title="Edit Contact" size="30"/>
          </NavLink>
        </div> */}
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

export default VendorShopPage;
