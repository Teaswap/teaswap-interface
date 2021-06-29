
import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
// import { DISTANCE } from '../../constants/style';
import { CarouselBox } from '../../components/general';
import { useDispatch } from 'react-redux';
import { Product } from '../../components/productSystem';
// import { MEDIA_QUERY } from '../../constants/style';
import useProduct from '../../hooks/productHooks/useProduct';
// import Snowfall from 'react-snowfall';
import {
  setErrorMessage,
} from '../../redux/slices/productSlice/productSlice';
import HomeProducts from '../../components/Home/Products'
import products1 from '../../components/Home/Pro1'
import products2 from '../../components/Home/Pro2'
import products3 from '../../components/Home/Pro3'
import products4 from '../../components/Home/Pro4'
// import { Navbar } from '../../components';
// import { useTranslation } from 'react-i18next'
// import ConTitle from '../../components/Content/Title';
// import ConSubTitle from '../../components/Content/SubTitle';


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
  padding-bottom: 200px;
`;

const  TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 10px;
  color: #474747;
`;

const HomePageProducts = styled.div`
  margin: 0px 0;
  width: 100%;
`;

// const BtnSection = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
// `;

// const StyledLink = styled.a`
//   text-decoration: none;
//   cursor: pointer;
//   font-weight: 500;

//   :hover {
//     text-decoration: none;
//     color: inherit;
//   }

//   :focus {
//     outline: none;
//     text-decoration: none;
//     color: inherit;
//   }

//   :active {
//     text-decoration: none;
//     color: inherit;
//   }
// `

// const JoinUs = styled.span`
//   width: 157px;
//   height: 31px;
//   color: #474747;
//   border: 1px solid #474747;
//   text-align: center;
//   line-height: 40px;
//   align-self: flex-end;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   :hover{
//     background: #7f7f7f;
//     color: #ffffff;
//   }
// `

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
    // products,
    // productErrorMessage,
    handleGetProducts,
    // handleGetProductsMoreButton,
  } = useProduct();
  const productErrorMessage = ''

  // const [products, setProducts] = useState(products1);
  

  // const {t} = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProducts(1);
    return () => {
      // dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);
  // const changeCat = function(t) {
  //   setProducts([products1, products2, products3][t-1])
  // }

  return (
    <Page>
      <CarouselBox />
      <div style={{marginTop: '120px'}} className="page-title3"> INSPIRING CREATIVITY </div>
      <div style={{marginTop: '10px', marginBottom: "100px"}} className="page-title3"> NFT FOR GOOD </div>
      <IframeComponent iframe={iframe2} />
      <TitleSection>
        <div style={{fontFamily: "Roboto-Thin", marginTop: "120px", color: '#474747', fontSize: '30px', fontWeight: 'bold'}}>Upcoming Drops</div>
        <div style={{color: '#696969', fontWeight: 'bold', marginTop: '10px', marginBottom: '100px', fontFamily: "Roboto-Thin", fontSize: '16px'}}>
          A New Way to Own Art !
        </div>
      </TitleSection>
      {/* <Nav>
        <NavItem onClick={() => changeCat(2)}>
          TSA Broadway
        </NavItem>
        <NavItem onClick={() => changeCat(1)}>
          CJAI NFT Collectibles
        </NavItem>
        <NavItem onClick={() => changeCat(3)}>
          Charity Project
        </NavItem>
      </Nav> */}
      {/*<Snowfall color='#e8f2f7' />*/}
      <Section>
        {/* <Title $isLarge>{t('NEW POST')}</Title> */}
        <HomeProducts products={products1} />
        <p className="products-title">TSA Metaverse Series</p>
        <HomeProducts products={products2} />
        <p className="products-title">Featured by TSA Broadway</p>
        <HomeProducts products={products3} />
        <p className="products-title">Charity Event</p>
        <HomeProducts products={products4} />

        {/* <HomePageProducts>
          <Products
            $justify={'space-between'}
            products={products}
            handler={()=>{}}
            productErrorMessage={productErrorMessage}
          />
        </HomePageProducts> */}
      </Section>
      {/* <GoalBox /> */}
    </Page>
  );
};


const IframeDiv = styled.div`
  width: 100%;
  max-width: 1274px;
  width: 100%;
  height: 782px;
  margin:0 auto;
  @media (max-width: 500px) {
    height: 220px;
    margin-top: 10px;
  } 
`


function IframeComponent(props) {
  return (
    <IframeDiv
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

const iframe2 = '<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/ufBw6eDKZRM?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>'; 


export default HomePage;
