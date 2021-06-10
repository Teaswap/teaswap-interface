import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { ExternalLink } from '../../theme';

const preBtnSty = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  display: 'none'
}

const IncubatorBox = () => {
  return (
    <Carousel
      style={{
        width: '100%',
        margin: '0 auto',
        marginTop: '20px'
      }}
      autoplay={false}
      wrapAround={true}
      defaultControlsConfig={{
        nextButtonText: '>',
        prevButtonText: '<',
        pagingDotsStyle: {
          fill: 'white',
          margin: '0 5px',
        },
        prevButtonStyle: preBtnSty,
        nextButtonStyle: preBtnSty,
        pagingDotsStyle: {
          display: 'none'
        }
      }}
    >
      {/* <ExternalLink href="https://docs.google.com/forms/d/e/1FAIpQLSfA-dOW15tyN6dfyZScvcEmT3lC13K9ThFBTruiFD0wOVsoUQ/viewform"> */}
      <img onClick={() => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSfA-dOW15tyN6dfyZScvcEmT3lC13K9ThFBTruiFD0wOVsoUQ/viewform")
      }} width="100%" src={process.env.PUBLIC_URL + '/incubator_banner.png'} alt="" />
      {/* </ExternalLink> */}
    </Carousel>
  );
};

export default IncubatorBox;
