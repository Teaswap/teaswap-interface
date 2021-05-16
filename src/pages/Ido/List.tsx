import React from 'react'
import { ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import ConTitle from '../../components/Content/Title'
import {MEDIA_QUERY} from '../../constants/style';

import GridImg1 from '../../assets/images/IMG_6362_JPG.jpeg'
import GridImg2 from '../../assets/images/grid_img2.webp'
import GridImg3 from '../../assets/images/grid_img3.webp'
import MediumImg from '../../assets/images/read_medium.jpeg'
import { ExternalLink } from '../../theme'


import EndedImg from '../../assets/images/sign/ended.jpg'
import NewImg from '../../assets/images/sign/new.webp'
import ComingImg from '../../assets/images/sign/coming.webp'

import IncubatorBox from '../../components/general/IncubatorBox'
import { ButtonPrimary } from '../../components/Button'
import { useTranslation } from 'react-i18next'

import { NavLink } from 'react-router-dom'
// import { useIdoInfo} from "../../state/stake/hooks";
import {Countdown} from "../Earn/Countdown";
// import {useActiveWeb3React} from "../../hooks";
// import {RowBetween} from "../../components/Row";

const List = ()=>{

  // const { chainId } = useActiveWeb3React()
  // const idoInfos = useIdoInfo()
   const { t } = useTranslation()
  //
  // // const stakingRewardsExist = Boolean(typeof chainId === 'number' && (IFO_REWARDS_INFO[chainId]?.length ?? 0) > 0)
  //
  //
  // const endreal =  idoInfos?.[0].periodFinish
  // const durationreal = idoInfos?.[0].rewardsDuration
  //
  // const endfake = idoInfos?.[0].periodFinish
  // const durationfake = 3600
  console.log(t('tokensAvailable'), useTranslation())
  const products = [
    {
      image: GridImg1,
      Learn: "https://www.caojunnft.com/",
      author: "Cao Jun NFT Collectibles",
      medium: "",
      info: "CaoJun limited edition of NFT Collectibles.",
      joinUs: "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0xF72ECaD992CebB0138aC13b616199f131F847b04",
      when: "When: 05.25 16:00 UTC",
      end:new Date(1622217600000),
      duration:259200,
      sign: NewImg
    },
    {
      image: GridImg2,
      Learn: "https://www.caojunnft.com/",
      author: "Gus Bawab NFTs",
      medium: "",
      info: "We are proud that his work “Persistence” found its way to the Elysee, the French presidential Palace in 2016.",
      joinUs: "#",
      when: "When: TBD",
      end:new Date(1721958400000),
      duration:3600,
      sign: ComingImg
    },
    {
      image: GridImg3,
      Learn: "https://www.caojunnft.com/",
      author: "The Art of TEAsWAP",
      medium: "",
      info: "TSA is where we bring together creators, collectors, curators, influencers, brokers, wallets, auctioneers around the world to the NFT digital space.",
      joinUs: "#",
      end:undefined,
      duration:undefined,
      sign: EndedImg
    },
    // {
    //   image: GridImg3,
    //   Learn: "/",
    //   author: "The Art of TEAsWAP",
    //   medium: "https://teaswap-art.medium.com/tsa-airdrop-phase-1-f255e5be3f4f",
    //   info: "TSA is where we bring together creators, collectors, curators, influencers, brokers, wallets, auctioneers around the world to the NFT digital space.",
    //   joinUs: "#",
    //   sign: EndedImg
    // }
  ]

  return (
    <PageWrapper >
      <IncubatorBox />
      <PageWrapper2 >
        <ConTitle con='Initial Art Offering ("IRO")' />
        <Grids>
          {products.map((v, i) => {
            return (
              <Grid key={i}>
                <img  width="100%" src={v.image}/>
                <Learn>
                  <ExternalLink href={v.Learn}>
                    <Learn>
                      {"Learn >"}
                    </Learn>
                  </ExternalLink>
                </Learn>
                <Read>
                  <span>{v.author}</span>
                  <span>
                    {"Read"}
                    <StyledLink to={v.medium}>
                      <img style={{marginLeft: "10px"}} width="22px" height="18px" src={MediumImg} />
                    </StyledLink>
                  </span>
                </Read>
                <Spe></Spe>
                <Info>{v.info}</Info>
                <div>
                  {v.when && (v.when)}
                </div>
                <Countdown exactEnd={v.end} rewardsDuration={v.duration?v.duration:1000} />
                <StyledLink to={v.joinUs}>
                  <JoinUs>
                    {"Join Us"}
                  </JoinUs>
                </StyledLink>
                <img 
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '5px'
                  }}
                  width="50"
                  src={v.sign}
                  />
              </Grid>
            )
          })
          }
        </Grids>
      </PageWrapper2>
    </PageWrapper>
  )
};
export default List;

const PageWrapper = styled(ColumnCenter)`
  text-align: center;
  margin-top: -80px;
  width: 100%;
  ${MEDIA_QUERY.sm} {
    margin-top: -40px;
  }
`

const PageWrapper2 = styled(ColumnCenter)`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  max-width: 1700px;
  padding-top: 30px;
`
const Grids = styled(ColumnCenter)`
  text-align: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

const Grid = styled(ColumnCenter)`
  text-align: center;
  width: 380px;
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
  margin-left: 30px;
  align-items: flex-start;
  ${MEDIA_QUERY.sm} {
    margin-left: 0;
  }
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
  width: 100%;
  margin-top: 14px;
`

const StyledLink = styled(NavLink)`
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

