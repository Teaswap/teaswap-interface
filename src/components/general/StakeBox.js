import React from 'react';
import Carousel from 'nuka-carousel';

const preBtnSty = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  display: 'none'
}

const StakeBox = () => {
  return (
    <Carousel
      style={{
        width: '100%',
        margin: '0 auto',
        marginTop: '-15px'
      }}
      autoplay={false}
      wrapAround={false}
      defaultControlsConfig={{
        nextButtonText: '>',
        prevButtonText: '<',
        pagingDotsStyle: {
          display: 'none'
        },
        prevButtonStyle: preBtnSty,
        nextButtonStyle: preBtnSty
      }}
    >
      <img src={process.env.PUBLIC_URL + '/tsa_metaplay.jpg'} alt="" />

    </Carousel>
  );
};

export default StakeBox;
