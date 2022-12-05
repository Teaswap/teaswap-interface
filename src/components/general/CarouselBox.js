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
            window.open("https://www.teaswap.art/twd");
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
      

      {isMobile && (
        <img
          src={'https://teaswap.mypinata.cloud/ipfs/QmaZYABCBpnRZ6a3ZJH48wk5idmLUAzDAUDjVLaw8Gb9A9'}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/xhb");
          }}
        />
      )}
      {isMobile && (
        <img
          src={'https://teaswap.mypinata.cloud/ipfs/QmTUatq65jdTePVvfQF1e79osncd6qAzp1Q1ycPaa2iHwW'}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/iro");
          }}
        />
      )}
      {isMobile && (
        <img
          src={process.env.PUBLIC_URL + "/Mobile-PenguinPunksBanner.png"}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/nft/products/category/1");
          }}
        />
      )}
      {isMobile && (
        <img
          src={process.env.PUBLIC_URL + "/mobile-mythology.png"}
          width="100%"
          height="100%"
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/nft/products/category/1");
          }}
        />
      )}
      {isMobile && (
        <img
          src={process.env.PUBLIC_URL + "/mobile_banner_tsa.png"}
          alt=""
          onClick={() => {
            window.open("https://www.teaswap.art/nft/products/category/1");
          }}
        />
      )}
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
