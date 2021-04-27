import React from 'react'
import { ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import ConTitle from '../../components/Content/Title'
import ConSubTitle from '../../components/Content/SubTitle'

import GridImg1 from '../../assets/images/IMG_6362_JPG.jpeg'
import GridImg2 from '../../assets/images/grid_img2.jpeg'
import GridImg3 from '../../assets/images/grid_img3.jpeg'
import MediumImg from '../../assets/images/read_medium.jpeg'
import { ExternalLink } from '../../theme'

import IncubatorBox from '../../components/general/IncubatorBox'
import { ButtonPrimary } from '../../components/Button'

const List = ()=>{

  return (
    <PageWrapper >
      <PageWrapper2 >
        <ConTitle con="NFT Incubator"></ConTitle>
        <ConSubTitle con='Initial Art Offering ("IRO")'></ConSubTitle>
        <ConSubTitle con="Bring together creators and collectors in NFT digital world !"></ConSubTitle>
        <Grids>
          <Grid>
            <img height="172px" src={GridImg1}/>
            <Learn>
              <ExternalLink href="https://www.caojunnft.com/">
                <Learn>
                  {"Learn >"}
                </Learn>
              </ExternalLink>
            </Learn>
            <Read>
              <span>{"Cao Jun NFTs"}</span>
              <span>
                {"Read"}
                <StyledLink>
                  <img style={{marginLeft: "10px"}} width="22px" height="18px" src={MediumImg} />
                </StyledLink>
              </span>
            </Read>
            <Spe></Spe>
            <Info>{"CaoJun limited edition NFT series . The record price for CaoJun  artist at auction is $1,309,063 USD ."}</Info>
            <StyledLink href="/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0x4aE03f6eaa8A21Ee3aeD47b97D5F44d2E2996d8a">
              <JoinUs>
                {"Join Us"}
              </JoinUs>
            </StyledLink>
          </Grid>
          <Grid>
            <img height="172px" src={GridImg2}/>
            <Learn>{"Learn >"}</Learn>
            <Read>
              <span>{"Gus Bawab NFTs"}</span>
              <span>
                {"Read"}
                <StyledLink>
                  <img style={{marginLeft: "10px"}} width="22px" height="18px" src={MediumImg} />
                </StyledLink>
              </span>
            </Read>
            <Spe></Spe>
            <Info>{"We are proud that his work “Persistence” found its way to the Elysee, the French presidential Palace in 2016."}</Info>
            <StyledLink href="#">
              <JoinUs>
                  {"Join Us"}
              </JoinUs>
            </StyledLink>
          </Grid>
          <Grid>
            <img height="172px" src={GridImg3}/>
            <Learn>{"Learn >"}</Learn>
            <Read>
              <span>{"The Art of TEAsWAP"}</span>
              <span>
                {"Read"}
                <StyledLink href="https://teaswap-art.medium.com/tsa-airdrop-phase-1-f255e5be3f4f">
                  <img style={{marginLeft: "10px"}} width="22px" height="18px" src={MediumImg} />
                </StyledLink>
              </span>
            </Read>
            <Spe></Spe>
            <Info>{"TSA is where we bring together creators, collectors, curators, influencers, brokers, wallets, auctioneers around the world to the NFT digital space."}</Info>
            <StyledLink href="#">
              <JoinUs>
                {"Join Us"}
              </JoinUs>
            </StyledLink>
          </Grid>
        </Grids>
      </PageWrapper2>
      <IncubatorBox />
    </PageWrapper>
  )
};
export default List;

const PageWrapper = styled(ColumnCenter)`
  text-align: center;
  max-width: 1400px;
  width: 100%;
`

const PageWrapper2 = styled(ColumnCenter)`
  text-align: center;
  max-width: 1040px;
  width: 100%;
`
const Grids = styled(ColumnCenter)`
  text-align: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`

const Grid = styled(ColumnCenter)`
  text-align: center;
  width: 330px;
  display: flex;
  padding: 15px;
  justify-content: flex-start;
  border-width: 0 0 0 0;
  border-style: solid solid solid solid;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 0px;
  align-items: flex-start;
`

const Learn = styled.span`
  color: #000000;
  font-size: 15px;
  margin-top: 6px;
  font-weight: bold;
  align-self: center;
`

const Read = styled(ColumnCenter)`
  color: #474747;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 287px;
  margin-top: 14px;
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: none;
    color: inherit;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: inherit;
  }

  :active {
    text-decoration: none;
    color: inherit;
  }
`
const Spe = styled.p`
  left: 13px;
  grid-area: 4 / 1 / 5 / 2;
  justify-self: start;
  align-self: start; 
  width: 36px;
  height: 1px;
  background: rgb(179,179,179);
`
const Info  = styled.span`
  color: #474747;
  font-size: 14px;
  text-align: left;
  height: 100px;
`

const JoinUs = styled(ButtonPrimary)`
  margin: 40px 0 37px 0;
  padding: 0px;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  align-self: flex-start;
  display: block;
`

