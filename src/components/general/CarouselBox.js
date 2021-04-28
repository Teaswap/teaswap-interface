import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';


const CarouselBox = () => {
  return (
    <Carousel
      style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        marginTop: '20px'
      }}
      autoplay={true}
      wrapAround={true}
      defaultControlsConfig={{
        nextButtonText: '>',
        prevButtonText: '<',
        pagingDotsStyle: {
          fill: 'white',
          margin: '0 5px',
        },
      }}
    >
      <img src={process.env.PUBLIC_URL + '/nft_banner1.png'} alt="" />
      <img src={process.env.PUBLIC_URL + '/homepage-banner1.jpg'} alt="" />
      <img src={process.env.PUBLIC_URL + '/homepage-banner2.jpg'} alt="" />
      <img src={process.env.PUBLIC_URL + '/homepage-banner3.jpg'} alt="" />
      <img src={process.env.PUBLIC_URL + '/homepage-banner4.jpg'} alt="" />
      <img src={process.env.PUBLIC_URL + '/homepage-banner5.png'} alt="" />
      {/* <img src={process.env.PUBLIC_URL + '/homepage-banner6.jpg'} alt="" /> */}

    </Carousel>
  );
};

export default CarouselBox;
