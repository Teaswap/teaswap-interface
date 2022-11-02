
import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import { CarouselBox } from '../../components/general';
import { useDispatch } from 'react-redux';
import { Product } from '../../components/productSystem';
import useProduct from '../../hooks/productHooks/useProduct';
import {
  setErrorMessage,
} from '../../redux/slices/productSlice/productSlice';
import { useNavigate } from "react-router"
import HomeProducts from '../../components/Home/Products'
import products1 from '../../components/Home/Pro1'
import products2 from '../../components/Home/Pro2'
import products3 from '../../components/Home/Pro3'
import products4 from '../../components/Home/Pro4'
import products5 from '../../components/Home/Pro5'
import {ExternalLink} from "../../theme";



const HomePage = () => {
  const dispatch = useDispatch();
  const {
  } = useProduct();
  const productErrorMessage = ''
  
  useEffect(() => {
    window.scroll(0, 0);
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);
  const navigate = useNavigate()
  
  return (
    <Page>
      <CarouselBox />
      {/*<div style={{marginTop: '60px'}} className="page-title3"> INSPIRING CREATIVITY </div>*/}
      {/*<div style={{marginTop: '10px', marginBottom: "100px"}} className="page-title3"> NFT FOR GOOD </div>*/}
      {/*<IframeComponent iframe={iframe2} />*/}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(246,245,243)",
          alignItems: "center",
        }}
      >
        <img style={{
          width: '80%',
        }} src={'https://teaswap.mypinata.cloud/ipfs/QmcbAHqakZ3vVz26hBNSB6N9SjPjS45DiAapQbq2r5iD8P'} />
        <span>
          <LearnMore href="/iro">
            LEARN MORE
          </LearnMore>
        </span>
      </div>
      <div>
        <Part
          style={{
            width: "100%",
            maxWidth: "1280px",
            marginTop: 40
          }}
        >
          <PartImg
            style={{
              marginRight: 20
            }}
            onClick={() => navigate('/twd')}
            src={'https://teaswap.mypinata.cloud/ipfs/QmfMdm7oHmBXMS2AEVRe1QvgPnhc2CDCrYMU6173uAAfsP/img1.png'}/>
          <PartImg
            style={{
              marginLeft: 20
            }}
            onClick={() => {
              window.open('https://www.teaswap.live/post/web3social-key-powered-by-tsa-incubator')
            }}
            src={'https://teaswap.mypinata.cloud/ipfs/QmfMdm7oHmBXMS2AEVRe1QvgPnhc2CDCrYMU6173uAAfsP/img2.png'}/>
        </Part>
      </div>
      <TitleSection>
        <Title>Upcoming Drops</Title>
        <SubTitle style={{color: '#696969', fontWeight: 'bold', marginTop: '10px', marginBottom: '100px', fontFamily: "Roboto-Thin", fontSize: '16px'}}>
          A New Way to Own Art !
        </SubTitle>
      </TitleSection>
      <Section>
        <HomeProducts products={products1} />
        <TitleSection>
          <Title>
            Featured by TSA Gallery
          </Title>
            <SubTitle onClick={() => navigate('/nft/products/category/3')} style={{
              cursor: "pointer",
            }}>Learn More</SubTitle>
        </TitleSection>
        <HomeProducts products={products3} />
        <TitleSection>
          <Title>
            Charity Event
          </Title>
          <SubTitle onClick={() => navigate('/nft/products/category/2')} style={{
            cursor: "pointer",
          }}>Learn More</SubTitle>
        </TitleSection>
        <HomeProducts products={products4} />
        <TitleSection>
          <Title>
            Sold
          </Title>
          <SubTitle onClick={() => navigate('/nft/products/category/0')} style={{
            cursor: "pointer",
          }}>View all</SubTitle>
        </TitleSection>
        <HomeProducts products={products5} />
      </Section>
      <div
        style={{
          backgroundColor: '#f6f5f3',
          marginTop: 40,
          padding: '40px 0',
          paddingTop: '20p',
          paddingBottom: '100px'
        }}
      >
        <Part>
          <PartText style={{
            textAlign: "center",
            width: "100%",
          }}>
            <div style={{
              fontSize: 35,
              color: "#474747"
            }}>
              Steeped in our community
            </div>
            <div style={{
              fontSize: 16,
              marginTop: 20,
              color: "#696969"
            }}>
              Gain access to TSA’s universe in Metaverse
            </div>
          </PartText>
        </Part>
        <Part2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/1%20tsa%20%20galeryTwitter%20Post%20-%20Sep%201%20-%2015%20%281%29.gif'} />
          <PartText>
            <div>TSA Gallery</div>
            <Text3>
              A complete experience of metaverse, you can have fun with the entire ambient built by fantastic meta-designers, and dive deep into the music and visual art NFTs created by selected artists.
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=E@1172E,788N')
              }}
            >
              SIGN GUESTBOOK
            </PartButton>
          </PartText>
        </Part2>
        <Part>
          <PartText2>
            <div>Wine Tasting Bar</div>
            <Text3>
              Join us for our monthly Members’ Wine Tasting! Sample a suite of special wines and enjoy live music. Bring a friend or fly solo and enjoy this wonderful opportunity to meet and mingle with other members and guests.
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=SE@1186E,801N,10.5U')
              }}
            >
              JOIN THE CLUB
            </PartButton>
          </PartText2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/2%20wine%20%20bar.jpg'} />
        </Part>
        <Part2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/3%20Campfire%20partyTwitter%20Post%20Spe%2016-31%20%283%29.gif'} />
          <PartText>
            <div>
              Campfire party
            </div>
            <Text3>
              Bring your clan of monsters - big and small - to the Campfire for some spooky fun! The DJ will be playing great Halloween tunes to wiggle to, and delightful, kid-friendly activities and treats are sure to have the kids screaming with joy!
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=E@1204E,793N')
              }}
            >
              REGISTER NOW
            </PartButton>
          </PartText>
        </Part2>
        <Part>
          <PartText2>
            <div>
              Theatre
            </div>
            <Text3>
              See The Meta Theatre at Voxels in a virtual tour - come and view what goes on behind the scenes at the biggest little theatre on the Architect island!
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=E@1183E,790N')
              }}
            >
              JOIN US
            </PartButton>
          </PartText2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/4%20theater%20Twitter%20Post%20Spe%2016-31%20%282%29.gif'} />
        </Part>
        <Part2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/5%20TSA%20Giftshop%20Twitter%20Post%20Spe%2016-31%20%281%29.gif'} />
          <PartText>
            <div>
              TSA Broadway
            </div>
            <Text3>
              Come take a stroll with me through the metaverse, it’s such an interesting place. You never now what you may find, what a lovely space. Explore the OpenSea and journey with me to TSA Broadway!
            </Text3>
            <div style={{
              fontSize: 14,
              color: '#696969',
              marginTop: 10
            }}>
              NFT Gated !
            </div>
            <PartButton
              onClick={() => {
                window.open('https://opensea.io/collection/tsa-gift-shop')
              }}
            >
              Get on OpenSea
            </PartButton>
          </PartText>
        </Part2>
        <Part>
          <PartText2>
            <div>
              Web3 in Your Pocket
            </div>
            <Text3>
              What is a Web3 Wallet? – Web3 Wallets Explained by TSA Incubator Web3 Dictionary
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://shop.ledger.com/pages/ledger-nano-x?r=667b70a9575f')
              }}
            >
              Get Ledger Wallet
            </PartButton>
          </PartText2>
          <PartText>
            <IframeComponent iframe={iframe2} />
          </PartText>
        </Part>
        <Part2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/featuring%20in%20metaverse%20TSA%20dreamhome%20collections%20Twitter%20Post%20-%20Sep%201%20-%2015.gif'} />
          <PartText>
            <div>
              Launching Your NFT & Featuring in Metaverse
            </div>
            <Text3>
              We are on Voxels since the beginning of 2022, building and riding on metaverse, with our many teams of meta-riders. Choose a team and come to TSA.
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://www.teaswap.live/post/onboarding-to-dreamhome-club')
              }}
            >
              On Boarding Now
            </PartButton>
          </PartText>
        </Part2>
        <Part>
          <PartText2>
            <div>Our Story</div>
            <Text3>
              You will have community experience, beautiful wearable airdrops, community awards, NFT drops, music concerts, art exhibitions; and get in touch with the best art on metaverse.
            </Text3>
            <PartButton
              onClick={() => {
                window.open('https://youtu.be/8RCnsMrIExc')
              }}
            >
              LEARN MORE
            </PartButton>
          </PartText2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/TSA%E2%80%99s%20universe%20%20Twitter%20Post%20Spe%2016-31.gif'} />
        </Part>
        <Part2>
          <PartImg src={`https://teaswap.mypinata.cloud/ipfs/QmQNh7bYx8xztgVY9wSvfyV5d1rcbGeUL8979cRqYBsJfY`} />
          <PartText>
            <div>
              Part of your life , Part of tomorrow.
            </div>
            <Text3>
              Blockchain Technology in retail powered by Digital One Asset,  iCashRewards !  Connecting multiple blockchain networks, transacting cryptocurrency seamlessly and without borders.
            </Text3>
            <PartButton
              onClick={()=>{
                window.open('https://www.icashrewards.io/product-page/icash-merchant-package')
              }}
            >
              Book Now !
            </PartButton>
          </PartText>
        </Part2>
      </div>
      <img style={{
        width: '100%',
        marginTop: 20,
      }} src={'https://teaswap.mypinata.cloud/ipfs/QmQEG1WJwvTN8kL3iVGM49oriG9AK34r2QYUoBgtF6mHGJ'}/>
    </Page>
  );
};

const Page = styled.div`
  height: fit-content;
  position: relative;
  width: 100%;
`;

const Section = styled.div`
  margin: 0 auto;
  height: auto;
  max-width: 1400px;
  padding-bottom: 20px;
`;

const  TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 2px;
  color: #474747;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #474747;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  @media (max-width: 500px) {
    width: 90%;
    font-size: 20px;
  }
`

const SubTitle = styled.div`
  color: #696969;
  font-size: 16px;
  margin: 50px 0;
`

const Part = styled.div`
  width: 90%;
  max-width: 1280px;
  display: flex;
  margin:0 auto;
  margin-top: 80px;
  justify-content: center;
  @media (max-width: 500px) {
    width: 98%;
    flex-direction: column;
    margin-top: 20px;
  }
`

const Part2 = styled(Part)`
  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`

const PartButton = styled.button`
  padding: 10px 25px;
  background-color: transparent;
  border: 1px solid #696969;
  font-weight: bold;
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;
  color: #474747;
  &:hover {
    background-color: #60a7ac;
    color: #FFFFFF;
  }
`

const PartImg = styled.img`
  width: 50%;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 20px;
  }
`

const PartText = styled.div`
  width: 50%;
  padding:0 20px;
  font-size: 20px;
  color: black;
  font-weight: bolder;
  @media (max-width: 500px) {
    width: 100%;
  }
`

const PartText2 = styled(PartText)`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Text3 = styled.div`
  width: 70%;
  margin-top: 20px;
  text-align: left;
  line-height: 30px;
  font-size: 16px;
  font-weight: normal;
  color: #999999;
`

const LearnMore = styled.a`
  font-size: 16px;
  color: #474747;
  text-decoration: none;
  border-bottom: 1px solid #474747;
  padding-bottom: 2px;
  @media (max-width: 500px) {
    font-size: 10px;
  }
`

const IframeDiv = styled.div`
  width: 100%;
  max-width: 1274px;
  height: 333px;
  margin:0 auto;
  @media (max-width: 500px) {
    height: 333px;
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
const iframe2 = '<iframe  class="myiframe" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay;' +
  ' clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top:' +
  ' 30px; width: 100%; height: 333px; "' +
  ' src="https://www.youtube.com/embed/8RCnsMrIExc?t=12s&autoplay=0&mute=0&controls=1&loop=0&origin=https%3A%2F%2Fwww.teaswap.live&playsinline=1&enablejsapi=1&widgetid=1" id="widget2"></iframe>';
// const iframe2 = '<iframe  class="myiframe" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/w6WZDiXXJ3Y?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>'; 
// https://www.youtube.com/embed/ufBw6eDKZRM?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1

export default HomePage;
