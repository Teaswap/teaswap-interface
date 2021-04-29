import React,{ useEffect } from 'react';
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


const Page = styled.div`
  height: fit-content;
  top: -80px;
  position: relative;
`;

const Section = styled.div`
  margin: ${DISTANCE.md} 10vw;
  margin-top: 0;
  padding: 20px 0;
  height: auto;
`;

const  TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  padding: 20px;
`;

const HomePageProducts = styled.div`
  margin: 0px 0;
  width: 100%;
  // max-width: 1400px;
`;

const BtnSection = styled.div`
  width: 100%;
  // max-width: 1400px;
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


const HomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    productErrorMessage,
    handleGetProducts,
    handleGetProductsMoreButton,
  } = useProduct();

  const {t} = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProducts(1);
    return () => {
      dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  return (
    <Page>
      <CarouselBox />
      <Navbar />
      <TitleSection>
        <ConTitle con="NFT Marketplace" />
        <ConSubTitle con="The New Way to Own Art" />
        <ConSubTitle con="Brings together creators and collectors in NFT digital world !" />
      </TitleSection>
      {/*<Snowfall color='#e8f2f7' />*/}
      <Section>
      <BtnSection>
        <StyledLink href="https://docs.google.com/forms/d/e/1FAIpQLSeGoEA3tuWG-S1NwUyCylmvCwTjALEbh-eVOqoQXHDp3pEmTA/viewform">
          <JoinUs>
            Mint Artworks
          </JoinUs>
        </StyledLink>
      </BtnSection>
        {/* <Title $isLarge>{t('NEW POST')}</Title> */}
        <HomePageProducts>
          <Products
            products={products}
            handler={handleGetProductsMoreButton}
            productErrorMessage={productErrorMessage}
          />
        </HomePageProducts>
      </Section>
      {/* <GoalBox /> */}
    </Page>
  );
};

export default HomePage;
