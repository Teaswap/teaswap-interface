import React, { useRef, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import Item from "./Item";
import { useNavigate } from "react-router";
import styled from "styled-components";

const ProductImage = styled.img`
  // // width: 400px;
  // // height: 500px;
  // width: 80px;
  // min-height: 80px;
  // min-width: 80px;
`;
export default function App() {
  const navigate = useNavigate();
  let slides = [
    {
      key: 1,
      content: (
        <Item
          img={process.env.PUBLIC_URL + "/nft/products/06dap.png"}
          amount="PRESALE 02/10"
        />
      ),
      link: "https://www.teaswap.art/nft/products/category/1",
    },
    {
      key: 2,
      content: (
        <Item
          img={
            process.env.PUBLIC_URL + "/nft/products/57 scubadiver penguin.png"
          }
          amount="PRESALE 01/28"
        />
      ),
      link: "https://www.teaswap.art/nft/products/category/1",
    },
    {
      key: 3,
      content: (
        <Item
          img={
            process.env.PUBLIC_URL + "/nft/products/58 Crustacean Penguin.png"
          }
          amount="PRESALE 01/28"
        />
      ),
      link: "https://www.teaswap.art/nft/products/category/1",
    },
    {
      key: 4,
      content: (
        <Item
          img={
            process.env.PUBLIC_URL + "/nft/products/59 Elder God penguin.png"
          }
          amount="PRESALE 01/28"
        />
      ),
      link: "https://www.teaswap.art/nft/products/category/1",
    },
    {
      key: 5,
      content: (
        <Item
          img={process.env.PUBLIC_URL + "/nft/products/60 Poseidon penguin.png"}
          amount="PRESALE 01/28"
        />
      ),
      link: "https://www.teaswap.art/nft/products/category/1",
    },

    // {
    //   key: 2,
    //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/NMsquare.png'} amount= 'PRESALE 10/06' />,
    //   link: 'https://www.teaswap.art/nft/products/vendor/264197',

    // },
    // {
    //   key: 3,
    //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/square.png'} amount= 'PRESALE 10/07' />,
    //   link: 'https://www.teaswap.art/nft/products/category/3',

    // },

    // // {
    // //   key: 5,
    // //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/10_1.gif'} amount='PRESALE 10/12' />,
    // //   link: 'https://www.teaswap.art/nft/products/vendor/264197',
    // // },
    // {
    //   key: 4,
    //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/penguin_01.gif'} amount= 'PRESALE 10/26'/>,
    //   link: 'https://www.teaswap.art/nft/products/vendor/265054',

    // },
    // {
    //   key: 5,
    //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/Penguin Island.png'} amount='PRESALE 11/04' />,
    //   link: 'https://www.teaswap.art/nft/products/vendor/265054',
    // },
    // {
    //   key: 7,
    //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/9.png'} amount='PRESALE 10/26' />,
    //   link: 'https://www.teaswap.art/nft/products/vendor/264023',
    // },
    // {
    //   key: 8,
    //   content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/10.png'} amount='PRESALE 10/26' />,
    //   link: 'https://www.teaswap.art/nft/products/vendor/264023',
    // },
  ].map((slide, index) => {
    return {
      ...slide,
      onClick: () => {
        if (index == goToSlide) {
          window.open(slides[index].link);
          // if( slides[index].key==3 || slides[index].key==1)
          // {
          //   window.open('https://opensea.io/collection/tsanft')
          // }else{
          //   navigate('/nft/products/vendor/264197')
          // }
        } else setGoToSlide(index);
      },
      onMouseOver: () => setGoToSlide(index),
    };
  });
  const [goToSlide, setGoToSlide] = useState(0);
  return (
    <div className="nft-swiper">
      <Carousel
        autoplay={true}
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={2}
        showNavigation={false}
      />
    </div>
  );
}
