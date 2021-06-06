import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { TYPE } from '../../theme'
import { RowBetween} from '../../components/Row'
import { AutoColumn,HomeGrid } from '../../components/Column'
import { MEDIA_QUERY } from '../../constants/style';
import { NavLink } from 'react-router-dom'

import { CardSection, HomeCard} from '../../components/earn/styled'

import smallLogo from '../../assets/images/home_page_logo.png'

const PageWrapper = styled(HomeGrid)`
  max-width: 1024px;
  width: 100%;
  ${MEDIA_QUERY.md} { 
    display: flex;
    flex-direction: column;
    align-item: center;
  }
`

const HomeImageDiv = styled.div`
  position: relative;
  max-width: 550px;
  width: 100%;
`

const HomeLearnMore = styled.div`
  position: absolute;
  width: 100%;
  top: 5px;
  left: 8px;
`

const AnnouncementText = styled(NavLink)`
  color: rgb(71, 71, 71);
  font-family: dancingscript,dancing script,cursive;
  font-size: 39px;
  text-decoration: none;
  margin: 25px 0;
  display: block;
`

const WhenText = styled.div`
  color: #7a7a7a;
  font-size: 14px;
  line-height: 20px;
`

export default function Home() {

  const { t } = useTranslation()


  return (
    <>
      <PageWrapper>
        <HomeImageDiv>
          <img width="100%" src={process.env.PUBLIC_URL + '/TSA_compressed.gif'} />
          <HomeLearnMore>
            <AnnouncementText to="/staking">Announcement</AnnouncementText>
            <WhenText>TSA Incubator Program </WhenText>
            <WhenText> When: June 16, 2021 </WhenText>
            <WhenText>Where: TSA</WhenText>
            <AnnouncementText to="/staking">
              Learn Now !
            </AnnouncementText>
          </HomeLearnMore>
        </HomeImageDiv>
        <HomeCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween style={{ marginTop: 16,justifyContent:"center" }}  >
                <TYPE.darkGray letterSpacing="1px" fontSize={16} fontFamily="lulo-clean-w01-one-bold" textAlign="center" alignSelf="center" >
                  {t('INSPIRING CREATIVITY.')}
                  <br/>
                  {t('NFT FOR GOOD.')}
                </TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}  >
                <img height="160px" style={{ marginTop: 0 }} src={smallLogo} alt="Home" />
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >The Art of TEAsWAP ( "TSA" )  is now your home for incredible , innovative NFT Art. Together, we invite you to dive into this new  era of digital enlightenment.</TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >TSA is a new cross -chain marketplace of digital NFT Art built on Binance Smart Chain  and Ethereum network, powered by the native governance token TSA and DeFi solutions.</TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >TSA brings together creators, collectors, curators, influencers, brokers, wallets, auctioneers around the world to the NFT digital space. It currently has 3 spaces: NFT collections, NFT Broadway, and NFT Incubator.</TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >TSA also has been created to give TSA community the power to influence decisions and incentivize active participation, like RARI from Rarible.</TYPE.darkGray>
              </RowBetween>
            </AutoColumn>
          </CardSection>
        </HomeCard>
        {/* <ExternalLink
          style={{ color: "#60a7ac",gridColumnStart: 1,gridColumnEnd: 3,marginTop: 56 }}
          target="_blank"
          href="https://www.teaswap.live/how-to"
        >
          <TYPE.green fontSize={18} fontWeight="bold" textAlign="right" alignSelf="center" >
            {t(
              'How to add Binance Smart Chain and TSA Token ?'
            )}
          </TYPE.green>
        </ExternalLink> */}
      </PageWrapper>
    </>
  )
}
