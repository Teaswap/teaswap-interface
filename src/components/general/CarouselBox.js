import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';

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
      {/* <img src={process.env.PUBLIC_URL + '/nft_banner1.png'} alt="" /> */}
      <img src={process.env.PUBLIC_URL + '/big_banner_CJAI.png'} alt="" />
      <img src={process.env.PUBLIC_URL + '/big_banner_TSA.png'} alt="" />
      {/* <img src={process.env.PUBLIC_URL + '/homepage-banner3.png'} alt="" /> */}
      {/* <img src={process.env.PUBLIC_URL + '/homepage-banner4.jpg'} alt="" /> */}
      {/* <img src={process.env.PUBLIC_URL + '/homepage-banner5.png'} alt="" /> */}

    </Carousel>
  );
};

export default CarouselBox;
