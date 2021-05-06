import React from 'react'
import { useTranslation } from 'react-i18next'
import {  ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import PoolCardNew from '../../components/earn/PoolCardNew'
// import { RowBetween } from '../../components/Row'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'

import TeasWap from '../../assets/images/faa61f_faff7044587944099ebc3fbd12e65b7c_mv2.webp'
import ConSubTitle from '../../components/Content/SubTitle'

import Nav from '../../components/earn/Nav'

const PageWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content; center;
  flex-wrap: wrap;
`

const TopSection = styled(ColumnCenter)`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  margin-top: -80px;
`

const PoolSection = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()
  const { t } = useTranslation()

  // const DataRow = styled(RowBetween)`
  //   ${({ theme }) => theme.mediaWidth.upToSmall`
  //   flex-direction: column;
  // `};
  // `

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper >
      <img src={TeasWap} width="100%" style={{marginBottom: '20px', marginTop: '-20px'}} />
      <TopSection >
        <ConSubTitle con={"Coming Soon !"} />
        <ConSubTitle con={"An amazing yield farm on Binance Smart Chain."} />
      </TopSection>
      <Nav />
      
      {/* <AutoColumn gap="lg" style={{ width: '1040px'}}> */}
        {/* <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem', color: '#000000' }}>
            {t('participatingPools')}
          </TYPE.mediumHeader>
          <Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />
        </DataRow> */}

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            <span style={{ color: '#ffffff' }}>{t('noActiveRewards')}</span>
          ) : (
            stakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              console.log('stakingInfo', JSON.stringify(stakingInfo))
              return <PoolCardNew key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
            })
          )}
        </PoolSection>
      {/* </AutoColumn> */}
    </PageWrapper>
  )
}
