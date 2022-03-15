import React from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Logo from "../../assets/images/teaswap-logo.png";
import NavSocial from "./components/NavSocial";
import { MEDIA_QUERY } from "../../constants/style";

const Footer: React.FC = () => {
  return (
    <StyledFooter className="real-footer">
      <StyledFooterInner>
        <StyledFooterItemLeft
          style={{ marginBottom: 20, width: "150px", textAlign: "left" }}
        >
          <img
            height="40px"
            style={{ marginTop: -8 }}
            width=""
            src={Logo}
            alt="logo"
          />
          <StyledFooterSmallItemTitle>
            The One Hub for NFT Creators and Influencers.
          </StyledFooterSmallItemTitle>
        </StyledFooterItemLeft>
        <StyledFooterItem>
          <Nav />
          <NavSocial />
        </StyledFooterItem>
      </StyledFooterInner>
      <StyledFooterItemDiv>
        <div>
          <span>© 2022 TSANFT All rights reserved.</span>
        </div>
      </StyledFooterItemDiv>
    </StyledFooter>
  );
};
const StyledFooterItemDiv = styled.div`
  width: 100%;
  text-align: center !important;
  font-size: 10px;
  font-weight: 500;
  color: #ffffff;

  font-family: Robot-thin, Roboto, Roboto Regular, Noto Sans TC, San serif,
    AtlasGrotesk, Yuanti SC;
  ${MEDIA_QUERY.sm} {
    min-height: 80px;
    margin-left: -15px;
  }
`;
const StyledFooter = styled.footer`
  z-index: 1;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 150px;
  width: 100%;
  background: #303030;
  padding: 25px;
  font-family: Robot-thin, Roboto, Roboto Regular, Noto Sans TC, San serif,
    AtlasGrotesk, Yuanti SC;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding-bottom: 40px;
  `}
  ${MEDIA_QUERY.sm} {
    padding: 10px;
    padding-bottom: 20px;
  }
`;
const StyledFooterInner = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 98%;
  padding: 50px 50px 54px;
  box-sizing: border-box;
  font-family: Robot-thin, Roboto, Roboto Regular, Noto Sans TC, San serif,
    AtlasGrotesk, Yuanti SC;

  ${MEDIA_QUERY.sm} {
    width: 98%;
    padding: 0px;
    min-height: 150px;
    display: inline-block;
    vertical-align: top;
  }
`;

const StyledFooterItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
  font-family: Robot-thin, Roboto, Roboto Regular, Noto Sans TC, San serif,
    AtlasGrotesk, Yuanti SC;

  ${MEDIA_QUERY.sm} {
    // display: none;
  }
`;
const StyledFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
`;
const StyledFooterSmallItemTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-family: Robot-thin, Roboto, Roboto Regular, Noto Sans TC, San serif,
    AtlasGrotesk, Yuanti SC;

  color: #ffffff;
  line-height: 24px;
  min-width: 290px;
  margin-top: 0px;
  text-align: center;
  ${MEDIA_QUERY.sm} {
    display: none;
  }
`;

// const StyledFooterItemTitle = styled.span`
//   font-size: 10px;
//   font-weight: 500;
//   color: #FFFFFF;
//   line-height: 24px;
//   min-width: 170px;
//   margin-top: 22px;
// `
// const StyledLink = styled.a`
//   color: ${({ theme }) => theme.bg2};
//   text-decoration: none;
//   font-size: 10px;
//   font-weight:
//   font-weight: 500;
//   @media (max-width: 540px) {
//     padding-right: 16px;
//   }
// `

export default Footer;
