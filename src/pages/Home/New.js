
import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
// import { DISTANCE } from '../../constants/style';
import { CarouselBox } from '../../components/general';
import { useDispatch } from 'react-redux';
import { Products } from '../../components/productSystem';
// import { MEDIA_QUERY } from '../../constants/style';
import useProduct from '../../hooks/productHooks/useProduct';
// import Snowfall from 'react-snowfall';
import {
  setErrorMessage,
} from '../../redux/slices/productSlice/productSlice';
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
`;

const  TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const products1 = [
    
    {
      picture_url: process.env.PUBLIC_URL + '/nft/12.gif',
      title: "CJAI NFT Collectibles",
      number: "#0605",
      desc: 'TSA NFT Studio',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 1,
    },{
      picture_url: process.env.PUBLIC_URL + '/nft/1.png',
      title: "CaoJun NFT Collectibles",
      number: "0605",
      desc: 'Once in a Millennium',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 2,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/4.png',
      title: "CaoJun NFT Collectibles",
      number: "9134",
      desc: 'Once in a Millennium',
      link: '/nft/products/257',
      mediaType: 1,
      id: 3,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/3.gif',
      title: "CaoJun NFT Collectibles",
      number: "#9134",
      desc: 'Including CaoJunNFT #9134',
      link: '/nft/products/257',
      mediaType: 1,
      id: 4,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/6.png',
      title: "CaoJun NFT Collectibles",
      number: "#7611",
      desc: "Spring's News",
      link: '/nft/products/257',
      mediaType: 1,
      id: 6,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/5.png',
      title: "CaoJun NFT Collectibles",
      number: "#8034",
      desc: 'Purple Pavilion and Cyan Cloud',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 5,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/8.gif',
      title: "CJAI Collectibles",
      number: "Gold Grass",
      desc: 'Including CaoJunNFT #8304',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 8,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/7.gif',
      title: "CJAI Collectibles",
      number: "# 7611",
      desc: '',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 7,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/10.gif',
      title: "CJAI Gateway to Nature",
      number: "",
      desc: '',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 10,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/12.png',
      title: "CJAI Fishing",
      number: "Gateway to Nature",
      desc: 'Including CaoJunNFT#0602',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 12,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/9.gif',
      title: "CJAI Fishing",
      number: "Fishing Lake",
      desc: 'Including CaoJunNFT #7611',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 9,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/11.gif',
      title: "TSA Collectors Club",
      number: "",
      desc: 'A Trusted Partner in NFT Exchange',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 11,
    },
  ]
const products2 = [
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/101.gif',
      title: "TSANFT #1 Voyage to Metaverse",
      number: "",
      desc: 'TSA NFT Studio',
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 101,
    },{
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/2.gif',
      title: "TSANFT #1 Voyage to Metaverse 2",
      number: "",
      desc: "TSA NFT Studio",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 2,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/3.gif',
      title: "TSANFT #2 BTC Shop",
      number: "",
      desc: "TSA NFT Studio",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 3,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/4.gif',
      title: "TSANFT#3 BNB Shop",
      number: "",
      desc: "TSA NFT Studio",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 4,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/5.gif',
      title: "TSANFT #4 Tesla Doge Shop",
      number: "",
      desc: "TSA NFT Studio",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 5,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/6.gif',
      title: "TSANFT #5 CJAI NFT Shop",
      number: "",
      desc: "TSA NFT Studio",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 1,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/7.gif',
      title: "FU7UR3 Broadway",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 6,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/8.jpeg',
      title: "The Very Best",
      number: "",
      desc: "Artist: Sir Peter Thomas Blake",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 7,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/9.jpeg',
      title: "Homage to Schwitters",
      number: "",
      desc: "Artist: Sir Peter Thomas Blake",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 8,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/10.jpeg',
      title: "New Year's Eve Parade at the Tower Ballroom, Blackpool",
      number: "",
      desc: "Artist: Sir Peter Thomas Blake",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 9,
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/11.jpeg',
      title: "Flower Market",
      number: "",
      desc: "Artist: Manuel Robbe",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 10
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/12.gif',
      title: "Vancouver Broadway City",
      number: "",
      desc: "Shatter Brainz",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 11
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/13.jpeg',
      title: "Flower Market",
      number: "",
      desc: "Artist: Manuel Robbe",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 12
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/14.gif',
      title: "TSANFT #100 Collectors Club",
      number: "",
      desc: "A Trusted Partner in NFT Exchange.",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 13
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/15.jpeg',
      title: "Tall Dutch Tulips",
      number: "",
      desc: "Artist: Bruce McLean",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 14
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/16.gif',
      title: "bird_view_10mb.gif",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 15
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/17.jpeg',
      title: "Anomie",
      number: "",
      desc: "Artist: Dan Baldwin",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 16
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/18.jpeg',
      title: "TV Eyes",
      number: "",
      desc: "Artist: Dan Baldwin",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 17
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/19.gif',
      title: "Persistence of Humanity Fractured-Gem",
      number: "",
      desc: "Shatter Brainz",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 19
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/20.jpeg',
      title: "Untitled",
      number: "",
      desc: "Artist: Gordon Smith",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 20
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/21.jpeg',
      title: "Untitled",
      number: "",
      desc: "Artist: Angela Grossmann",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 21
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/22.jpeg',
      title: "Untitled",
      number: "",
      desc: "Artist: Derek Root",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 22
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/23.jpeg',
      title: "Passed Port",
      number: "",
      desc: "Artist: Graham Gillmore",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 23
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/24.jpeg',
      title: "At the Galleries",
      number: "",
      desc: "Artist: Attila Richard Lukacs",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 24
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/25.jpeg',
      title: "Untitled",
      number: "",
      desc: "Artist: Lawrence Paul Yuxweluptun",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 25
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/26.jpg',
      title: "GUS BAWAB",
      number: "",
      desc: "Echo 48x72 inch,122x183cm 4'x6'",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 26
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/27.jpeg',
      title: "Galerie Grillon Women",
      number: "",
      desc: "Artist:Suzanne Meunier",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 27
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/28.jpeg',
      title: "Les Affiches Etrangere",
      number: "",
      desc: "Artist: Hubert von Herkomer",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 28
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/29.gif',
      title: "TSANFT #99 Shih NFT Shop",
      number: "",
      desc: "TSA NFT Studio",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 29
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/tsa/30.gif',
      title: "Shih 2_Broadway Neon Nights",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 30
    },
    

  ]

  const products3 = [
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/1.gif',
      title: "ShihNFT#13 -Crypto Punk Doggie",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 1
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/3.gif',
      title: "ShihNFT #6 Ski",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 2
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/2.gif',
      title: "ShihNFT#01-hands",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 3
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/4.gif',
      title: "ShihNFT #2 S-head",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 4
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/5.gif',
      title: "ShihNFT #14_FU7UR3- Broadway",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 55
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/55.gif',
      title: "ShihNFT #3 S-eyebow",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 5
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/6.gif',
      title: "ShihNFT #4 S-ear",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 6
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/7.gif',
      title: "ShihNFT #16-Tzu-Pupogz",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 7
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/8.gif',
      title: "ShihNFT #5 S-tail",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 8
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/9.gif',
      title: "ShihNFT #12-Token-Daytime",
      number: "",
      desc: "Shatter Brainz",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 9
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/10.gif',
      title: "ShihNFT #7 skipping",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 10
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/11.gif',
      title: "ShihNFT #11-Token-Night",
      number: "",
      desc: "Shatter Brainz",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 11
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/12.gif',
      title: "ShihNFT #9",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 12
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/13.gif',
      title: "ShihNFT #15 Hello Shih",
      number: "",
      desc: "Shatter  Brainz",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 13
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/14.gif',
      title: "ShihNFT #10 S-eye",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 14
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/15.gif',
      title: "ShihNFT #17 The Not-A-Rocket Boots",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 15
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/16.gif',
      title: "ShihNFT #8 skip",
      number: "",
      desc: "",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 16
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/17.gif',
      title: "ShihNFT #18 London Punk Doggie",
      number: "",
      desc: "Cosmic Bee",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 17
    },
    {
      picture_url: process.env.PUBLIC_URL + '/nft/np/18.gif',
      title: "ShihNFT #19 SHIH Neon",
      number: "",
      desc: "Shatter Brainz",
      link: '/nft/products/vendor/263801',
      mediaType: 1,
      id: 18
    }
  ]


  const productErrorMessage = ''

  const [products, setProducts] = useState(products1);
  

  // const {t} = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetProducts(1);
    return () => {
      // dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);
  const changeCat = function(t) {
    setProducts([products1, products2, products3][t-1])
  }

  return (
    <Page>
      <CarouselBox />
      <TitleSection>
        <div style={{fontFamily: "Roboto-Thin", padding: "10px", color: '#474747', fontSize: '30px', fontWeight: 'bold'}}>Upcoming Drops</div>
        <p style={{fontSize: '15px'}}>The New Way to Own Art</p>
      </TitleSection>
      <Nav>
        <NavItem onClick={() => changeCat(2)}>
          TSA Broadway
        </NavItem>
        <NavItem onClick={() => changeCat(1)}>
          CJAI NFT Collectibles
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
