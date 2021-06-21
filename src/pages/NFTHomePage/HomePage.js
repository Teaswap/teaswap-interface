import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import { DISTANCE } from '../../constants/style';
import { GoalBox, Title, CarouselBox } from '../../components/general';
import { useDispatch } from 'react-redux';
import { Products } from '../../components/productSystem';
import { MEDIA_QUERY } from '../../constants/style';
import useProduct from '../../hooks/productHooks/useProduct';
// import Snowfall from 'react-snowfall';
import {
  setProducts,
  setErrorMessage,
} from '../../redux/slices/productSlice/productSlice';
import { Navbar } from '../../components';
import { useTranslation } from 'react-i18next'
import ConTitle from '../../components/Content/Title';
import ConSubTitle from '../../components/Content/SubTitle';
import { useNavigate } from 'react-router-dom';


const Page = styled.div`
  height: fit-content;
  position: relative;
  width: 100%;
`;

const Section = styled.div`
  margin: 0 auto;
  margin-top: 0;
  padding: 20px 0;
  height: auto;
  max-width: 1320px;
`;

const  TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  padding: 20px;
  color: #474747;
`;

const HomePageProducts = styled.div`
  margin: 0px 0;
  width: 100%;
`;

const BtnSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: none;
    color: inherit;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: inherit;
  }

  :active {
    text-decoration: none;
    color: inherit;
  }
`

const JoinUs = styled.span`
  width: 157px;
  height: 31px;
  color: #474747;
  border: 1px solid #474747;
  text-align: center;
  line-height: 40px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover{
    background: #7f7f7f;
    color: #ffffff;
  }
`

const Nav = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding:0 20px;
`

const NavItem = styled.div`
  margin-right: 30px;
  color: #7f7f7f;
  font-size: 15px;
  cursor: pointer;
  :hover {
    color: #474747;
  }
`

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    productErrorMessage,
    productCategories,
    page,
    setPage,
    handleGetProducts,
    handleGetProductsMoreButton,
    handleGetProductCategories
  } = useProduct();


  const {t} = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProducts(page);
    handleGetProductCategories();
    return () => {
      // dispatch(setProducts());
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);
  const changeCat = function(id) {
    navigate('/nft/products/category/' + id)
  }

  return (
    <Page>
      <CarouselBox />
      <TitleSection>
        <p style={{fontFamily: "Roboto-Thin", color: '#474747', fontSize: '30px', fontWeight: 'bold'}}>Upcoming Drops</p>
        <p style={{fontSize: '15px'}}>The New Way to Own Art</p>
      </TitleSection>
      <Nav>
        {productCategories.map((v, i) => {
          return (
            <NavItem onClick={() => changeCat(v.id)}>
              {v.name}
            </NavItem>
          )
        })}

      </Nav>
      <Section>
        <HomePageProducts>
          <Products
            $justify={'space-between'}
            products={products}
            handler={()=>{}}
            productErrorMessage={productErrorMessage}
          />
        </HomePageProducts>
      </Section>
      {/* <GoalBox /> */}
    </Page>
  );
};

export default HomePage;
