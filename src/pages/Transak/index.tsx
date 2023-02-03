import React, {useEffect} from "react";
import styled from "styled-components";
// import { useActiveWeb3React } from "../../hooks";


export default () => {

  // const { account, chainId } = useActiveWeb3React();
  useEffect(() => {

  }, []);
  return (
    <Wrapper>
      <div
        style={{
          minWidth: '1000px',
          minHeight: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        id={'ramp-container'}>
        <iframe height="625" title="Transak On/Off Ramp Widget"
                src="https://global-stg.transak.com?apiKey=0dbb0def-af72-4b20-84b8-1deec1c0ecae"
                frameBorder="no"
                className={'myiframe'}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "625px",
                  maxWidth: "500px"
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

