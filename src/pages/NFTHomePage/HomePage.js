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


const Page = styled.div`
  height: fit-content;
  margin-top: -80px;
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
    // products,
    // productErrorMessage,
    handleGetProducts,
    handleGetProductsMoreButton,
  } = useProduct();
  const products1 = [
    
    {
      picture_url: process.env.PUBLIC_URL + '/nft/12.gif',
      title: "CaoJun NFT Collectibles",
      number: "Gateway to Nature",
      info: 'Including CaoJun NFT | 0602',
      mediaType: 1,
      id: 10,
    },{
      picture_url: process.env.PUBLIC_URL + '/nft/1.png',
      title: "CaoJun NFT Collectibles",
      number: "0605",
      info: '',
      mediaType: 1,
      id: 1,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/3.gif',
      title: "CaoJun NFT Collectibles",
      number: "9138",
      info: '',
      mediaType: 1,
      id: 2,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/4.png',
      title: "CaoJun NFT Collectibles",
      number: "9134",
      info: '',
      mediaType: 1,
      id: 3,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/6.gif',
      title: "CaoJun NFT Collectibles",
      number: "7611",
      info: '',
      mediaType: 1,
      id: 4,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/7.png',
      title: "CaoJun NFT Collectibles",
      number: "7611",
      info: "Spring's News",
      mediaType: 1,
      id: 5,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/8.gif',
      title: "CauJun Collectibles",
      number: "Gold Grass",
      info: 'Including CaoJun NFT | 8304',
      mediaType: 1,
      id: 6,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/9.png',
      title: "CaoJun NFT Collectibles",
      number: "8304",
      info: 'Purple Pavilion and Cyan Cloud',
      mediaType: 1,
      id: 7,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/10.gif',
      title: "CaoJun Collectibles",
      number: "Fishing Lake",
      info: 'CaoJun NFT 7611',
      mediaType: 1,
      id: 8,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/11.gif',
      title: "CaoJun NFT Collectibles",
      number: "Gateway to Nature",
      info: 'Including CaoJun NFT | 0602',
      mediaType: 1,
      id: 9,
    },
  ]
const products2 = [
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/101.gif',
      title: "FU7UR3 Broadway",
      number: "",
      info: 'Cosmic Bee',
      mediaType: 1,
      id: 101,
    },{
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/2.jpeg',
      title: "The Very Best",
      number: "",
      info: "Artist: Sir Peter Thomas Blake",
      mediaType: 1,
      id: 2,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/3.jpeg',
      title: "Homage to Schwitters",
      number: "",
      info: "Artist: Sir Peter Thomas Blake",
      mediaType: 1,
      id: 3,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/4.jpeg',
      title: "New Year's Eve Parade at the Tower Ballroom, Blackpool",
      number: "",
      info: "Artist: Sir Peter Thomas Blake",
      mediaType: 1,
      id: 4,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/5.jpeg',
      title: "Flower Market",
      number: "",
      info: "Artist: Manuel Robbe",
      mediaType: 1,
      id: 5,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/1.gif',
      title: "TSA Collections Club",
      number: "",
      info: "A Trusted Partner in NFT Exchange.",
      mediaType: 1,
      id: 1,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/6.jpeg',
      title: "Flower Market",
      number: "",
      info: "Artist: Manuel Robbe",
      mediaType: 1,
      id: 6,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/7.jpeg',
      title: "Tall Dutch Tulips",
      number: "",
      info: "Artist: Bruce McLean",
      mediaType: 1,
      id: 7,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/8.jpeg',
      title: "Anomie",
      number: "",
      info: "Artist: Dan Baldwin",
      mediaType: 1,
      id: 8,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/9.jpeg',
      title: "TV Eyes",
      number: "",
      info: "Artist: Dan Baldwin",
      mediaType: 1,
      id: 9,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/10.jpeg',
      title: "Untitled",
      number: "",
      info: "Artist: Gordon Smith",
      mediaType: 1,
      id: 10
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/11.jpeg',
      title: "Untitled",
      number: "",
      info: "Artist: Angela Grossmann",
      mediaType: 1,
      id: 11
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/12.jpeg',
      title: "Untitled",
      number: "",
      info: "Artist: Derek Root",
      mediaType: 1,
      id: 12
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/13.jpeg',
      title: "Passed Port",
      number: "",
      info: "Artist: Graham Gillmore",
      mediaType: 1,
      id: 13
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/14.jpeg',
      title: "At the Galleries",
      number: "",
      info: "Artist: Attila Richard Lukacs",
      mediaType: 1,
      id: 14
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/15.jpeg',
      title: "Untitled",
      number: "",
      info: "Artist: Lawrence Paul Yuxweluptun",
      mediaType: 1,
      id: 15
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/16.jpg',
      title: "GUS BAWAB",
      number: "",
      info: "Echo 48x72 inch,122x183cm 4'x6'",
      mediaType: 1,
      id: 16
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/17.jpeg',
      title: "Galerie Grillon Women",
      number: "",
      info: "Artist: Suzanne Meunier",
      mediaType: 1,
      id: 17
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/19.jpeg',
      title: "Les Affiches Etrangere",
      number: "",
      info: "Artist: Hubert von Herkomer",
      mediaType: 1,
      id: 19
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/20.gif',
      title: "Shih NFT Shop",
      number: "",
      info: "Creator: Eason Lin",
      mediaType: 1,
      id: 20
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/21.gif',
      title: "Broadway City",
      number: "",
      info: "Creator: Brad O'Donnell",
      mediaType: 1,
      id: 20
    },
    

  ]

  const product3 = [
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/1.gif',
      title: "Punk Pupogz -Crypto Punk Doggie",
      number: "",
      info: "Cosmic Bee",
      mediaType: 1,
      id: 1
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/3.gif',
      title: "Skip_#6",
      number: "",
      info: "",
      mediaType: 1,
      id: 2
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/2.gif',
      title: "S-hands #01",
      number: "",
      info: "",
      mediaType: 1,
      id: 3
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/4.gif',
      title: "S-head #02",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/5.gif',
      title: "S-eyebow #03",
      number: "",
      info: "",
      mediaType: 1,
      id: 55
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/55.gif',
      title: "Shih_FU7UR3- Broadway",
      number: "",
      info: "Cosmic Bee",
      mediaType: 1,
      id: 5
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/6.gif',
      title: "S-ear #04",
      number: "",
      info: "",
      mediaType: 1,
      id: 6
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/7.gif',
      title: "Shih-Tzu-Pupogz #13",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/8.gif',
      title: "S-tail #5",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/9.gif',
      title: "SHIH-Token-Daytime #12",
      number: "",
      info: "Shatter Brainz",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/10.gif',
      title: "skipping #7",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/11.gif',
      title: "SHIH-Token-Night #11",
      number: "",
      info: "Shatter Brainz",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/12.gif',
      title: "Shih #9",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/13.gif',
      title: "Hello Shih",
      number: "",
      info: "Shatter  Brainz",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/14.gif',
      title: "S-eye#10",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/15.gif',
      title: "The Not-A-Rocket Boots",
      number: "",
      info: "Cosmic Bee",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/16.gif',
      title: "skip #8",
      number: "",
      info: "",
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/17.gif',
      title: "London Punk Doggie",
      number: "",
      info: "Cosmic Bee",
      mediaType: 1,
      id: 4
    }
  ]


  const productErrorMessage = ''

  const [products, setProducts] = useState(products1);
  

  const {t} = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProducts(1);
    return () => {
      // dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);
  const changeCat = function(t) {
    setProducts([products1, products2, product3][t-1])
  }

  return (
    <Page>
      <CarouselBox />
      <TitleSection>
        <ConTitle con="The New Way to Own Art" />
      </TitleSection>
      <Nav>
        <NavItem onClick={() => changeCat(2)}>
          TSA Broadway
        </NavItem>
        <NavItem onClick={() => changeCat(1)}>
          CaoJun NFT Collectibles
        </NavItem>
        <NavItem onClick={() => changeCat(3)}>
          Charity Project
        </NavItem>
      </Nav>
      {/*<Snowfall color='#e8f2f7' />*/}
      <Section>
        {/* <Title $isLarge>{t('NEW POST')}</Title> */}
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
