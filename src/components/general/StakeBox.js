// import React from 'react';
// import Carousel from 'nuka-carousel';
// import { NONAME } from 'dns';
// import styled from 'styled-components';
// import { ExternalLink } from '../../theme';
import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { ExternalLink } from '../../theme';


const preBtnSty = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  display: 'none',
  outline: 'none'
}

const StakeBox = () => {
  return (
    <Carousel
      style={{
        width: '100%',
        margin: '0 auto',
        marginTop: '-15px',
        outline: 'none'
      }}
      // className="page-banner"
      autoplay={false}
      wrapAround={true}
      defaultControlsConfig={{
        nextButtonText: '>',
        prevButtonText: '<',
        pagingDotsStyle: {
          fill: 'white',
          margin: '0 5px',
          outline: 'none'
        },
        prevButtonStyle: preBtnSty,
        nextButtonStyle: preBtnSty,
        pagingDotsStyle: {
          display: 'none',
          outline: 'none'
        }
      }}
    >
      {/* <img onClick={() => {
        window.open("")
      }} width="100%" src={process.env.PUBLIC_URL + '/tsa_metaplay.jpg'} alt="" /> */}
      <img src={process.env.PUBLIC_URL + '/tsa_metaplay.jpg'} alt="" />
     
    </Carousel>
  );
};

export default StakeBox;
