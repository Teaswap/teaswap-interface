import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { ExternalLink } from '../../theme';


const IncubatorBox = () => {
  return (
    <Carousel
      style={{
        width: '100%',
        height: '348px',
        maxWidth: '1400px',
        margin: '0 auto',
        marginTop: '10px'
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
      }}
    >
      <ExternalLink href="https://docs.google.com/forms/d/e/1FAIpQLSfA-dOW15tyN6dfyZScvcEmT3lC13K9ThFBTruiFD0wOVsoUQ/viewform">
        <img src={process.env.PUBLIC_URL + '/iro_banner.png'} alt="" />
      </ExternalLink>
    </Carousel>
  );
};

export default IncubatorBox;
