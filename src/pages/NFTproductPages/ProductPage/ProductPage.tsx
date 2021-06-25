import React, { useEffect } from 'react';
import { StandardNavPage } from '../../../components/Page';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import useProduct from '../../../hooks/productHooks/useProduct';
import { useDispatch } from 'react-redux';
import { COLOR, MEDIA_QUERY } from '../../../constants/style';
import {
  setProduct,
  setProducts,
  setCategory,
  setErrorMessage,
} from '../../../redux/slices/productSlice/productSlice';
import { Navbar } from '../../../components'
import useUser from "../../../hooks/userHooks/useUser";
import {
  Products,
  Breadcrumb,
  ProductInfo,
  VendorIntro,
  ProductPicture,
  ProductIntro,
  FreightIntro,
  InfoTitle,
  InfoItem,
} from '../../../components/productSystem'
import { useTranslation } from 'react-i18next';

const ProductInfoContainer = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NavbarWrapper = styled.div`
  position : relative;
  width : 100%;
`;

const PurchaseInfo = styled.section`
  display: flex;
  align-items: flex-start;
`;

const OtherProductWrap = styled(InfoItem)`
  margin-top: 40px;
  padding-bottom: 0;
  border-bottom: none;
  ${MEDIA_QUERY} {
    display: flex;
    justify-content: space-between;
  }
`;

const OtherProductTitle = styled(InfoTitle)`
  margin: 0;
  border-bottom: none;
`;

const MoreLink = styled.a`
  margin: 0 20px;
  color: #007bff;
  display: inline-block;
  &:hover {
    color: ${COLOR.hover};
    text-decoration: underline;
  }
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {user,handleGetMe} = useUser();
  const {
    product,
    vendorInfo,
    products,
    category,
    productErrorMessage,
    handleGetProduct,
  } = useProduct();

  useEffect(() => {
    handleGetMe().then((result) => {
      if (!result.data ) navigate('/nft');
    });
  }, [dispatch]);

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProduct(id, 1);
    return () => {
      dispatch(setProduct([]));
      dispatch(setProducts([]));
      dispatch(setCategory([]));
      dispatch(setErrorMessage(null));
    };
  }, [id, dispatch]);

  const { t } = useTranslation()

  // const isMobile = window.innerWidth <= 1000;

  console.log("productPage--User:"+JSON.stringify(user))

  return (
    <>
      <NavbarWrapper >
        <Navbar />
      </NavbarWrapper>
    <StandardNavPage>
      <ProductInfoContainer>
        <Breadcrumb category={category} product={product} />
        <PurchaseInfo>
          <ProductPicture product={product} />
          <div id="product-right">
            <ProductInfo user={user} product={product} />
            <ProductIntro product={product} />
            <FreightIntro product={product} />
            <VendorIntro
              products={products}
              id={id}
              vendorInfo={vendorInfo}
              productErrorMessage={productErrorMessage}
            />
          </div>
        </PurchaseInfo>
          {products.length !== 0 ? (
          <>
            <OtherProductWrap>
              <OtherProductTitle>{t('Other Works by This artist')}</OtherProductTitle>
              <MoreLink href={`/nft/products/vendor/${vendorInfo.id}`}>
                {t('More')}
              </MoreLink>
            </OtherProductWrap>
            <Products
              products={products}
              productErrorMessage={productErrorMessage}
              $padding={'20px 10px'}
              $width={'300px'}
              $height={'300px'}
              $margin={'0 5px'}
              $justify={'space-around'}
            />
          </>
        ) : (
          <></>
        )}
      </ProductInfoContainer>
    </StandardNavPage>
      </>
  );
};

export default ProductPage;
