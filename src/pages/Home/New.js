
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

const Page = styled.div`
  height: fit-content;
  position: relative;
  width: 100%;
`;

const Section = styled.div`
  margin: 0 auto;
  margin-top: 0;
  padding: 0px 0;
  height: auto;
  max-width: 1320px;
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

const HomePageProducts = styled.div`
  margin: 0px 0;
  width: 100%;
`;

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
          backgroundColor: "rgb(224,234,237)",
          alignItems: "center",
        }}
      >
        <img style={{
          width: '80%',
        }} src={'https://teaswap.mypinata.cloud/ipfs/QmNzJr5nTHB9sxvioSETTjSyYCdZXeGXe39VWyr32kYtgu/03_3.png'} />
        <span>
          <a
            style={{
              fontSize: 14,
              color: "#474747",
              textDecoration: "underline",
            }}
            href="/iro">
            Learn More
          </a>
        </span>
      </div>
      <TitleSection>
        <div style={{fontFamily: "Roboto-Thin", marginTop: "120px", color: '#474747', fontSize: '30px', fontWeight: 'bold'}}>Upcoming Drops</div>
        <div style={{color: '#696969', fontWeight: 'bold', marginTop: '10px', marginBottom: '100px', fontFamily: "Roboto-Thin", fontSize: '16px'}}>
          A New Way to Own Art !
        </div>
      </TitleSection>
      <Section>
        <HomeProducts products={products1} />
        {/*<p className="products-title">TSA Metaverse Series</p>*/}
        {/*<HomeProducts products={products2} />*/}
        <p className="products-title">Featured by TSA Broadway</p>
        <HomeProducts products={products3} />
        <p className="products-title">Charity Event</p>
        <HomeProducts products={products4} />
        <p className="products-title">Sold
          <span onClick={() => navigate('/nft/products/category/0')} style={{
            marginLeft: "20px",
            color: "#474747",
            fontSize: "20px",
            cursor: "pointer",
          }}>View all</span>
        </p>
        <HomeProducts products={products5} />
        <Part>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/TSA%E2%80%99s%20universe%20%20Twitter%20Post%20Spe%2016-31.gif'} />
          <PartText>
            <div>
              Steeped in our community
            </div>
          </PartText>
        </Part>
        <Part>
          <PartText2>
            <div>Out Story</div>
            <PartButton
              onClick={() => {
                window.open('https://youtu.be/8RCnsMrIExc')
              }}
            >
              LEARN MORE
            </PartButton>
          </PartText2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/2%20wine%20%20bar.jpg'} />
        </Part>
        <Part>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/1%20tsa%20%20galeryTwitter%20Post%20-%20Sep%201%20-%2015%20%281%29.gif'} />
          <PartText>
            <div>TSA Gallery</div>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=E@1172E,788N')
              }}
            >
              SIGN GUESTBOOK
            </PartButton>
          </PartText>
        </Part>
        <Part>
          <PartText2>
            <div>Wine Tasting Bar</div>
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
        <Part>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/3%20Campfire%20partyTwitter%20Post%20Spe%2016-31%20%283%29.gif'} />
          <PartText>
            <div>
              Campfire party
            </div>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=E@1204E,793N')
              }}
            >
              REGISTER NOW
            </PartButton>
          </PartText>
        </Part>
        <Part>
          <PartText2>
            <div>
              Theatre
            </div>
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
        <Part>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/5%20TSA%20Giftshop%20Twitter%20Post%20Spe%2016-31%20%281%29.gif'} />
          <PartText>
            <div>
              TSA Broadway
            </div>
            <PartButton
              onClick={() => {
                window.open('https://www.voxels.com/play?coords=W@5907W,1688N')
              }}
            >
              NFT Gated !  Get on OpenSea
            </PartButton>
          </PartText>
        </Part>
        <Part>
          <PartText2>
            <div>
              Web3 in Your Pocket
            </div>
            <PartButton
              onClick={() => {
                window.open('https://shop.ledger.com/pages/ledger-nano-x?r=667b70a9575f')
              }}
            >
              Get Ledger Wallet!
            </PartButton>
          </PartText2>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/social%20token%206%20web3%20Twitter%20Post%20-%20Aug%2016%20-%2031.gif'} />
        </Part>
        <Part>
          <PartImg src={'https://teaswap.mypinata.cloud/ipfs/QmcHUwJNS91c6VoWY9FmHcFocGcNyySGK96iDRzE3B8Eek/featuring%20in%20metaverse%20TSA%20dreamhome%20collections%20Twitter%20Post%20-%20Sep%201%20-%2015.gif'} />
          <PartText>
            <div>
              Launching Your NFT & Featuring in Metaverse
            </div>
            <PartButton
              onClick={() => {
                window.open('https://www.teaswap.live/post/onboarding-to-dreamhome-club')
              }}
            >
              On Boarding Now
            </PartButton>
          </PartText>
        </Part>
      </Section>
    </Page>
  );
};

const Part = styled.div`
  width: 80%;
  max-width: 900px;
  display: flex;
  margin:0 auto;
  margin-top: 90px;
  justify-content: center;
`
const PartButton = styled.button`
  padding: 10px 25px;
  background-color: transparent;
  border: 1px solid #000;
  font-weight: bold;
  font-size: 20px;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    background-color: #60a7ac;
    color: #FFFFFF;
  }
`

const PartImg = styled.img`
  width: 50%;
`
const PartText = styled.div`
  width: 50%;
  padding:0 20px;
  font-size: 20px;
  color: black;
  font-weight: bolder;
`

const PartText2 = styled(PartText)`
  text-align: right;
`

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
const iframe2 = '<iframe  class="myiframe" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/dg6F4PYSNOg?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>'; 
// const iframe2 = '<iframe  class="myiframe" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/w6WZDiXXJ3Y?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>'; 
// https://www.youtube.com/embed/ufBw6eDKZRM?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1

export default HomePage;
