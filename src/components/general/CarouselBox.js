import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect'

const preBtnSty = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
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
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/big_banner_TSABanner3.png'} alt="" />)}
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/big_banner_TSA.png'} alt="" />)}
      {!isMobile && (<img src={process.env.PUBLIC_URL + '/big_banner_CJAI.png'} alt="" />)}
      

      {isMobile && (<img src={process.env.PUBLIC_URL + '/mobile_banner_tsa.png'} alt="" />)}
      {isMobile && (<img src={process.env.PUBLIC_URL + '/mobile_banner_cjai.png'} alt="" />)}
    

    </Carousel>
  );
};

export default CarouselBox;
