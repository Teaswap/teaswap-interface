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
        marginTop: '20px'
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
      <img src={process.env.PUBLIC_URL + '/faa61f_faff7044587944099ebc3fbd12e65b7c_mv2.webp'} alt="" />

    </Carousel>
  );
};

export default StakeBox;
