import React from 'react'
import styled from 'styled-components'

import FlameImg from '../../assets/images/flame.jpeg'
import { MEDIA_QUERY } from '../../constants/style'

const Nav = (props: any) => {
  return (
    <Root>
      <img src={FlameImg} style={{marginTop: '10px'}} width="30px" height="30px" />
      <StyledNav>
        <StyledLink onClick={() => props.handleCatChange(0)}>
          <span className={props.cat == 0 ? "stake-active" : ''}>
            Hot
          </span>
        </StyledLink>
        <StyledLink style={{padding:"0 14px"}}> </StyledLink>
        <StyledLink onClick={() => props.handleCatChange(1)}>
          <span className={props.cat == 1 ? "stake-active" : ''}>
            Earn TSA
          </span>
        </StyledLink>
        <StyledLink style={{padding:"0 14px"}}> </StyledLink>
        <StyledLink onClick={() => props.handleCatChange(2)}>
          <span className={props.cat == 2 ? "stake-active" : ''}>
            TSA Staking
          </span>
        </StyledLink>
        <StyledLink style={{padding:"0 14px"}}> </StyledLink>
        <StyledLink onClick={() => props.handleCatChange(3)}>
          <span className={props.cat == 3 ? "stake-active" : ''}>
            NFT Pool
          </span>
        </StyledLink>
        <StyledLink style={{padding:"0 14px"}}> </StyledLink>
        <StyledLink onClick={() => props.handleCatChange(4)}>
          <span className={props.cat == 4 ? "stake-active" : ''}>
            Ended
          </span>
        </StyledLink>
        {/* <StyledLink target="_blank" href="https://t.me/bestswap_com">
          Announcement
        </StyledLink> */}
      </StyledNav>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 85%;
  //max-width: 1170px;
  margin:0 auto;
  margin-left: 0px;
  ${MEDIA_QUERY.sm}{
     width: 90%;
  }
`

const StyledNav = styled.nav`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  width: calc(100% 40px);
  margin-left: 10px;
  flex-wrap: wrap;
  min-width: 1190px;
  width: 75%;
  ${MEDIA_QUERY.sm}{
    margin-top: 10px;
    min-width: 320px;
  }
`

const StyledLink = styled.span`
  color: #7f7f7f;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  ${MEDIA_QUERY.sm}{
    font-size: 13px;
  }
`

export default Nav
