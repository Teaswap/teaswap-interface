import React, { useEffect, useState } from 'react';
import { StandardNavPage } from '../../../components/Page';
import { COLOR, FONT, MEDIA_QUERY } from '../../../constants/style';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useProduct from '../../../hooks/productHooks/useProduct';
import { useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  Products,
  ProductSort,
  ErrorMessage,
} from '../../../components/productSystem';
import {
  setPage,
  setProducts,
  setCategory,
  setErrorMessage,
} from '../../../redux/slices/productSlice/productSlice';
import { Navbar } from '../../../components'
import Pagination from '../../../components/Pagination/Index';
import NFTSwiper from '../../../components/Swipers/NFTSwiper1.jsx';

const CategoryTitleContainer = styled.section`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  color: ${COLOR.text_2};
  ${MEDIA_QUERY.lg} {
    flex-direction: column;
    align-items: center;
  }
`;

const NavbarWrapper = styled.div`
  position : relative;
  width : 100%;
`;

const CategoryName = styled.div`
  min-width: 120px;
  font-weight: bold;
  font-size: ${FONT.lg};
  ${MEDIA_QUERY.lg} {
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
  }
`;

const CategoryTitle = ({ id, category, handleChangeProductSort }) => {
  const {t} = useTranslation();
  return (
    <CategoryTitleContainer>
      <CategoryName>{t('Category')}：{category}</CategoryName>
      <ProductSort id={id} handleChangeProductSort={handleChangeProductSort} />
    </CategoryTitleContainer>
  );
};

const CategorizedProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    products,
    category,
    page,
    productCount,
    productErrorMessage,
    handleCategoryProductMoreButton,
    handleGetProductFromCategory,
    handleChangeProductSort,
  } = useProduct();

  if (productErrorMessage === '查無此分類') navigate('/');
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(setPage(1));
    handleGetProductFromCategory(id, 1);
    return () => {
      dispatch(setProducts([]));
      dispatch(setCategory([]));
      dispatch(setErrorMessage(null));
    };
  }, [id, dispatch]);
  return (
    <>
      {id == 1 && (
        <NFTSwiper />
      )}
      <NavbarWrapper >
        <Navbar />
      </NavbarWrapper>
      <StandardNavPage>

        {productErrorMessage ? (
          <ErrorMessage
            $margin={'250px'}
            productErrorMessage={productErrorMessage}
          />
        ) : (
          <>
            <Products
              products={products}
              id={id}
              handler={handleCategoryProductMoreButton}
              productErrorMessage={productErrorMessage}
            />
          </>
        )}
        <Pagination count={productCount} page={page} handleChange={(_page) => {
          handleGetProductFromCategory(id, _page)
        }} />
      </StandardNavPage>
    </>
  );
};

export default CategorizedProductPage;
