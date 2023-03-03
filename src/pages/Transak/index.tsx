import React, {useEffect} from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

export default () => {

  // const { account, chainId } = useActiveWeb3React();
  useEffect(() => {

  }, []);
  return (
    <Wrapper>
      <div
        style={{
          minWidth: isMobile ? '400px' : '1000px',
          minHeight: isMobile ? '500px' : '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        id={'ramp-container'}>
        <iframe height="625" title="Transak On/Off Ramp Widget"
                src="https://global.transak.com?apiKey=ce629f20-0557-479a-8745-2fafa7da89bc"
                frameBorder="no"
                className={'myiframe'}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "625px",
                  maxWidth: "500px",
                  padding: "0 60px"
                }}
                >
        </iframe>
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

