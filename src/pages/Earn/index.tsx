import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
// import {  ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import {STAKING_REWARDS_INFO, useAllStakingInfo} from '../../state/stake/hooks'
import PoolCardNew from '../../components/earn/PoolCardNew'
// import { RowBetween } from '../../components/Row'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'

// import ConSubTitle from '../../components/Content/SubTitle'

import Nav from '../../components/earn/Nav'
import { MEDIA_QUERY } from '../../constants/style'
import StakeBox from '../../components/general/StakeBox'
// import { unwrappedToken } from '../../utils/wrappedCurrency'
import Switch from '@material-ui/core/Switch';

const PageWrapper = styled.div`
  margin-top:  30px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content; center;
  flex-wrap: wrap;
  padding-bottom: 30px;
  ${MEDIA_QUERY.sm} {
  }
`

// const TopSection = styled(ColumnCenter)`
//   width: 100%;
//   text-align: center;
//   margin: 0 auto;
//   margin-top: -80px;
//   z-index: 999;
//   ${MEDIA_QUERY.sm} {
//     display: none;
//     margin-top: -30px;
//     font-size: 12px;
//   }
// `

const PoolSection = styled.div`
  width: 1190px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  justify-content: center;
  ${MEDIA_QUERY.sm} {
    
    justify-content: left;
  }
`

const NavAndPool = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`
const NavSubAndPool =styled.div`
  width: 74%;
  //  maxWidth: 1270px;
  // width: 85%;
  margin: 0 auto;
  display: flex;
  justifyContent: space-between;
  alignItems: center;
  ${MEDIA_QUERY.sm} {
   text-align: right;
 
  }
 
  ${MEDIA_QUERY.sm} {
    width: 100%;
    flex-direction: column;
  }
  `
  const StakingOnlyDiv =styled.div`
  max-width: 135px;
  //margin-right: 50px;
  ${MEDIA_QUERY.sm} {
    margin-right: 15px;
    min-width:320px;
  }
  `
export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useAllStakingInfo()
  const { t } = useTranslation()

  // const DataRow = styled(RowBetween)`
  //   ${({ theme }) => theme.mediaWidth.upToSmall`
  //   flex-direction: column;
  // `};
  // `
  const [showCat, setShowCat] = useState(0)

  function changeCate (cat: any) {
    setShowCat(cat)
  }

  console.log("stakinginfos", stakingInfos);
  const [stakedOnly, setStakedOnly] = useState(false)

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)
  return (
    <PageWrapper >
      <StakeBox />
      {/* <TopSection >
        <ConSubTitle con={"An amazing yield farm on Binance Smart Chain."} />
      </TopSection> */}
      <NavAndPool>
        <NavSubAndPool>
          <Nav cat={showCat} handleCatChange={changeCate} />
          <StakingOnlyDiv>
          <span> <Switch checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)}/> staked only</span>
          </StakingOnlyDiv>
        </NavSubAndPool>
      
        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            <span style={{ color: '#ffffff' }}>{t('noActiveRewards')}</span>
          ) : (
            stakingInfos?.map(stakingInfo => {
              const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))
              const isUnclaim = Boolean(stakingInfo.unclaimAmount.greaterThan('0'))
              if (stakedOnly && !isStaking && !isUnclaim) {
                return;
              }
              switch(showCat) {
                case 0:
                  let d2 = new Date().getTime()
                  if(stakingInfo.periodFinish && d2 < new Date(stakingInfo.periodFinish).getTime()) break;
                  return;
                case 1:
                  if (stakingInfo.tokens[1].symbol != 'TSA') return;
                  break;
                case 2:
                  if (stakingInfo.tokens[0].symbol != 'TSA') return;
                  break;
                case 3:
                  if (stakingInfo.tokens[0].symbol == 'TSA' && stakingInfo.tokens[1].symbol == 'CJAI') break;
                  if (stakingInfo.tokens[0].symbol == 'CJAI' && stakingInfo.tokens[1].symbol == 'TSA') break;
                  if (stakingInfo.tokens[0].symbol == 'Shih' && stakingInfo.tokens[1].symbol == 'CJAI') break;
                  if (stakingInfo.cate == 'NFT') break;
                  return;
                case 4 :
                  let d = new Date().getTime()
                  if(stakingInfo.periodFinish && d > new Date(stakingInfo.periodFinish).getTime()) break;
                  return;
              }
              // need to sort by added liquidity here
              return <PoolCardNew key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
            })
          )}
        </PoolSection>
      </NavAndPool>
      
      {/* </AutoColumn> */}
    </PageWrapper>
  )
}
