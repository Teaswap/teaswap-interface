import React from 'react'
import styled from 'styled-components'
import { HomeGrid } from '../../components/Column'
import { MEDIA_QUERY } from '../../constants/style'
// import { MEDIA_QUERY } from '../../constants/style';


const PageWrapper = styled(HomeGrid)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  color: #7a7a7a;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`

const IframeDiv = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 721px;
  margin:0 auto;
  ${MEDIA_QUERY.sm} {
    width: 90%;
    height: 240px;
  } 
`

export default function Home() {

  return (
    <>
      <PageWrapper>
        <Title>INSPIRING CREATIVITY.</Title>
        <Title>NFT FOR GOOD.</Title>
        <IframeComponent iframe={iframe1} /> 
      </PageWrapper>
    </>
  )
}


function IframeComponent(props: any) {
  return (
    <IframeDiv
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

// const iframe = '<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/xMX2oPlPtF8?autoplay=1&amp;mute=0&amp;controls=1&amp;loop=1&ampplaylist=xMX2oPlPtF8;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>'; 

const iframe1 = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/xMX2oPlPtF8?list=TLGG9ReK7COgvPsxNjA2MjAyMQ&autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
{/* <iframe width="1400" height="721" src="https://www.youtube.com/embed/xMX2oPlPtF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}