import React from "react";
import Carousel from "nuka-carousel";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

const preBtnSty = {
  backgroundColor: "rgba(0, 0, 0, 0)",
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  display: "none",
};
const mobileBanners = [
  {
    src: 'https://teaswap.mypinata.cloud/ipfs/QmZEUVUNzj2RZHFuQUFzuU8Quoe2PgenfhEYUkgyhA3bhB',
    link: 'https://www.teaswap.art/xhb',
  },
  {
    src: 'https://teaswap.mypinata.cloud/ipfs/QmWZMAddDqqMU4gtQTKYfMNaRSo4ckUH2oRnnHQA8wxXdb',
    link: 'https://www.teaswap.art/iro'
  },
  {
    src: 'https://teaswap.mypinata.cloud/ipfs/QmZ8ywezD7cabarNWNMxpwzXeLvLSuZ1avWafTSyfB8v4J',
    link: 'https://www.teaswap.art/nft/products/category/1'
  },
  {
    src: 'https://teaswap.mypinata.cloud/ipfs/QmThKVLfhqtA8gB9ph23wUGu9P8vG2vkiUTpVmuvg3G8Ck',
    link: 'https://www.teaswap.art/nft/products/category/1'
  },
  {
    src: 'https://teaswap.mypinata.cloud/ipfs/QmcGndg2SD1g4PzN2tUFgNYrg5FZJY2M6VexLVANy9GAi3',
    link: 'https://www.teaswap.art/nft/products/category/1'
  },
  {
    src: '',
    link: ''
  },
];
const CarouselBox = () => {
  return (
    <Carousel
      style={{
        width: "100%",
        margin: "0 auto",
      }}
      className="page-banner"
      autoplay={true}
      wrapAround={true}
      defaultControlsConfig={{
        nextButtonText: ">",
        prevButtonText: "<",
        pagingDotsStyle: {
          fill: "white",
          margin: "0 5px",
        },
        prevButtonStyle: preBtnSty,
        nextButtonStyle: preBtnSty,
      }}
    >
      {!isMobile && (
        <img
          src={"https://teaswap.mypinata.cloud/ipfs/QmVb6R4wYu1WSw5Xbc1RtVEhWzC9ZaqLFQ8iBRmTvtAVqE"}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/wsk");
          }}
        />
      )}
      {!isMobile && (
        <img
          src={"https://teaswap.mypinata.cloud/ipfs/QmRvCVMNAhUKWvfdkZNicc68qXaUjVkDxHWuFpUEM3HFA8"}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/mint");
          }}
        />
      )}
      {!isMobile && (
        <img
          src={"https://teaswap.mypinata.cloud/ipfs/QmSpVpm3MxUZ4pwrVazX2Pwiog5y7pFME1QFEYrnQUNuHM"}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/twd");
          }}
        />
      )}
      {!isMobile && (
        <img
          src="https://teaswap.mypinata.cloud/ipfs/QmUy3A8F84j6esA1jG5zHNRqQfqXzP1QpuaBM7f5DUyVgo/HOTBOX_SPOTIFY_BANNER.jpg"
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/xhb");
          }}
        />
      )}
      {!isMobile && (
        <img
          src="https://teaswap.mypinata.cloud/ipfs/Qmc3gvNmgW7RaeXgicgUWndreJxFGa52ApxtqA652XShXy"
          onClick={() => {
            window.open("https://twitter.com/ArtTeaswap");
          }}
        />
      )}
      {isMobile && mobileBanners.map((v, k)=> {
        return (
          <img
            key={k}
            src={v.src}
            alt=""
            onClick={() => {
              window.open(v.link);
            }}
          />
        )
      })}
      {isMobile && (
        <img
          src={process.env.PUBLIC_URL + "/mobile_banner_cjai.png"}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/nft/products/category/1");
          }}
        />
      )}
    </Carousel>
  );
};

export default CarouselBox;
