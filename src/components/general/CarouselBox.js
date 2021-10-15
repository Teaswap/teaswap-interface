import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect'

const preBtnSty = {
  backgroundColor: "rgba(0, 0, 0, 0)",
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  display: 'none'
}

const CarouselBox = () => {
  return (
    <Carousel
      style={{
        width: '100%',
        margin: '0 auto'
      }}
      className="page-banner"
      autoplay={true}
      wrapAround={true}
      defaultControlsConfig={{
        nextButtonText: '>',
        prevButtonText: '<',
        pagingDotsStyle: {
          fill: 'white',
          margin: '0 5px',
        },
        prevButtonStyle: preBtnSty,
        nextButtonStyle: preBtnSty
      }}
    >
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/3.png'} alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }}/>)}
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/4.png'} alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }} />)}
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/big_banner_TSABanner3.png'} alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }} />)}
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/big_banner_TSA.png'} alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }}/>)}
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/big_banner_CJAI.png'} alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }}/>)}
      
      
      {isMobile && (<img src={process.env.PUBLIC_URL + '/mobile-mythology.png'} width="100%" height="100%" alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }} />)}
      {isMobile && (<img src={process.env.PUBLIC_URL + '/Mobile-Holiday.png'} alt=""  onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }}/>)}
      {isMobile && (<img src={process.env.PUBLIC_URL + '/mobile_banner_tsa.png'} alt=""  onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }}/>)}
      {isMobile && (<img src={process.env.PUBLIC_URL + '/mobile_banner_cjai.png'} alt="" onClick={() => {
          window.open("https://www.teaswap.art/nft/products/category/1")
        }} />)}
    

    </Carousel>
  );
};

export default CarouselBox;
