import React, { useEffect } from 'react';
import { StandardNavPage } from '../../../components/Page';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import useProduct from '../../../hooks/productHooks/useProduct';
import { useDispatch } from 'react-redux';
import { MEDIA_QUERY } from '../../../constants/style';
import {
  Breadcrumb,
  PurchaseInfoLeft,
  PurchaseInfoRight,
  SingleProductMobile,
} from '../../../components/productSystem';
import {
  setProduct,
  setProducts,
  setCategory,
  setErrorMessage,
} from '../../../redux/slices/productSlice/productSlice';
import { Navbar } from '../../../components'
import useUser from "../../../hooks/userHooks/useUser";

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

  ${MEDIA_QUERY.lg} {
    flex-direction: column;
    align-items: center;
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

  const isMobile = window.innerWidth <= 1000;

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
          {isMobile ? (
            <SingleProductMobile
              product={product}
              products={products}
              id={vendorInfo.id}
              vendorInfo={vendorInfo}
              productErrorMessage={productErrorMessage}
            />
          ) : (
            <>
              <PurchaseInfoLeft product={product} />
              <PurchaseInfoRight
                product={product}
                products={products}
                id={vendorInfo.id}
                vendorInfo={vendorInfo}
                productErrorMessage={productErrorMessage}
                user = {user}
              />
            </>
          )}
        </PurchaseInfo>
      </ProductInfoContainer>
    </StandardNavPage>
      </>
  );
};

export default ProductPage;
