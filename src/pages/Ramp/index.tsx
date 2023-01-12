import React, {useEffect} from "react";
import styled from "styled-components";
import {RampInstantSDK} from "@ramp-network/ramp-instant-sdk";
// import { useActiveWeb3React } from "../../hooks";


export default () => {

  // const { account, chainId } = useActiveWeb3React();
  useEffect(() => {
    new RampInstantSDK({
      hostAppName: 'TEASWAP',
      hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
      hostApiKey: 'ehu6k8ujqcgn5vxp3rhg2b5oggr64uxtgvy2rzvw',
      variant: 'embedded-desktop',
      url: 'https://ri-widget-staging.firebaseapp.com',
      // @ts-ignore
      containerNode: document.getElementById('ramp-container') ?? null,
    }).show();
  }, []);
  return (
    <Wrapper>
      <div
        style={{
          minWidth: '1000px',
          minHeight: '600px',
        }}
        id={'ramp-container'}>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1000px;
  min-height: 100vh;
  background-color: rgb(128, 200, 215);
  padding: 100px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

`;

