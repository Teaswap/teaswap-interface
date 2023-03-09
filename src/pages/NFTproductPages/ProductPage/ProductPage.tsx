import React, { useEffect } from 'react';
import { StandardNavPage } from '../../../components/Page';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import useProduct from '../../../hooks/productHooks/useProduct';
import { useDispatch } from 'react-redux';
import { MEDIA_QUERY } from '../../../constants/style';
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
} from '../../../components/productSystem'
import { useTranslation } from 'react-i18next';
import MetaTags from 'react-meta-tags';

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
  flex-wrap: wrap;
  ${MEDIA_QUERY.sm} {
    align-items: center;
    width: 100%;
  }
`;

const OtherProductWrap = styled.div`
  padding-bottom: 0;
  border-bottom: none;
  padding: 10px;
  ${MEDIA_QUERY} {
    display: flex;
    justify-content: space-between;
  }
`;

const OtherProductTitle = styled.div`
  margin: 0;
  border-bottom: none;
`;

const MoreLink = styled.a`
  color: #7f7f7f;
  display: inline-block;
  text-decoration: none;
  &:hover {
    text-decoration: none;
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
    handleGetProduct
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
      <MetaTags>
        <meta name="twitter:title" content="TSANFT, One Hub for Web3 and DeFi" />
        <meta name="twitter:description" content={product.info} />
        <meta name="twitter:site" content="@ArtTeaswap" />
        <meta name="og:image" content={product.picture_url} />
        <meta name="og:image:secure_url" content={product.picture_url} />
      </MetaTags>
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
            <ProductIntro user={user} product={product} />
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
              <OtherProductTitle>{t('Related works')}</OtherProductTitle>
              <MoreLink className="a-link" href={`/nft/products/vendor/${vendorInfo.id}`}>
                {t('View all')}
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
