import React, {useEffect} from "react";
import styled from "styled-components";
import {RampInstantSDK} from "@ramp-network/ramp-instant-sdk";
// import { useActiveWeb3React } from "../../hooks";


export default () => {

  // const { account, chainId } = useActiveWeb3React();
  useEffect(() => {
    new RampInstantSDK({
      hostAppName: 'TEASWAP',
      hostLogoUrl: 'https://teaswap.mypinata.cloud/ipfs/QmbJg3Hz3Hy8jt5kVAL8MsfCoJuM22LoYsruj6ufk5UUG7',
      hostApiKey: 'o2csrvcve7xt6vjd935rm6b2tm6owrz28c8sx2ht',
      variant: 'embedded-desktop',
      // url: 'https://ri-widget-staging.firebaseapp.com',
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

