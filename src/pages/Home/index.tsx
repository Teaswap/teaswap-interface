import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { TYPE } from '../../theme'
import { RowBetween} from '../../components/Row'
import { AutoColumn,HomeGrid } from '../../components/Column'
import { MEDIA_QUERY } from '../../constants/style';

import { CardSection, HomeCard} from '../../components/earn/styled'

import smallLogo from '../../assets/images/logo.png'
import HomeImg from '../../assets/images/Homeimg.jpeg'

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
  max-width: 550px;
  width: 100%;
`

export default function Home() {

  const { t } = useTranslation()


  return (
    <>
      <PageWrapper>
        <HomeImageDiv>
          <img width="100%" src={HomeImg} alt="Home" />
        </HomeImageDiv>
        <HomeCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween style={{ marginTop: 16,justifyContent:"center" }}  >
                <TYPE.darkGray letterSpacing="3px" fontSize={18} fontWeight="bold" textAlign="center" alignSelf="center" >{t('INSPIRING CREATIVITY.')}
                  <br/>
                  {t('NFT FOR GOOD.')}
                </TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ marginTop: 16,justifyContent:"center" }}>
                <TYPE.green fontSize={24} fontFamily="Times" fontStyle="italic" textAlign="center" alignSelf="center" >
                  {t(
                    'Why'
                  )}
                  <br />
                  {t(
                    'The Art of  TEAsWAP ?'
                  )}
                </TYPE.green>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}  >
                <img height="48px" style={{ marginTop: 0 }} src={smallLogo} alt="Home" />
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >{t('The Art of TEAsWAP ("TSA") is where we bring together creators, collectors, curators, influencers, brokers, wallets, auctioneers around the world to the NFT digital space.')}</TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >{t('TEAsWAP is a multi-functional decentralized application (dApp) created on Binance Smart Chain (BSC) and Ethereum network, powered by the native TEAsWAP token (TSA).')}</TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >{t('TSA has been created to give TSA community the power to influence decisions and incentivize active participation, like RARI from Rarible.')}</TYPE.darkGray>
              </RowBetween>
              <RowBetween style={{ justifyContent:"center" }}>
                <TYPE.darkGray fontSize={14} >{t('TSA also provides yield farming opportunities for non-fungible tokens (NFTs) and  cryptocurrencies within TSA communities.')}</TYPE.darkGray>
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
