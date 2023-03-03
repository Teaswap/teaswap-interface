import React from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

export default () => {
  return (
    <Wrapper>
      <div
        style={{
          minWidth: isMobile ? "400px" : "1000px",
          minHeight: isMobile ? "500px" : "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id={"mecurypo-container"}
      >
        <iframe
          title="Mecurypo Widget"
          src="https://www.teaswap.art/mecurypo.html"
          style={{
            display: "block",
            padding: "0 0px",
            width: '90%',
            height: '100%'
          }}
          className={"myiframe"}
        ></iframe>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  background-size: 100% 100%;
  padding: 100px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
  /* #f2d3f8 */
  .panel {
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      padding: 20px;
    }
  }
`;
