import { BigNumber } from '@ethersproject/bignumber'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { ButtonPrimary } from '../../../components/Button'
import Card from './Card'
import CardContent from './CardContent'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'

import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
// import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import useTotalSupply from '../../../hooks/useTotalSupply'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useDecimals from '../../../hooks/useDecimals'
import { useTokenPriceInBNB } from '../../../hooks/useTokenPrice'
import { usePoolApy } from '../../../hooks/useFarmApy'
import { Farm } from '../../../contexts/Farms'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// import { useWallet } from 'use-wallet'
import { useActiveWeb3React } from '../../../hooks'
import { Pools } from '../../../constants/pools'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber|null
}



const FarmCards: React.FC = () => {

  const { chainId } = useActiveWeb3React()
  var chainnum = chainId ? chainId : 56

  const farms: Array<Farm> = Pools.filter(pool => (pool.poolAddresses as any)[chainnum]).map(
    ({
       poolAddresses,
       name,
       symbol,
       tokenSymbol,
       stakingTokenAddresses,
       acceleratorAddresses,
       isWBNB,
       isLp,
       icon,
       nftSymbol,
       magnification,
     }: any, index) => ({
      pid: index,
      id: symbol.replace('/', '-'),
      name,
      poolAddress: poolAddresses[chainnum],
      stakingToken: symbol,
      stakingTokenAddress: stakingTokenAddresses[chainnum],
      acceleratorAddress: acceleratorAddresses?.[chainnum],
      tokenSymbol,
      earnToken: 'best',
      isLp,
      earnTokenAddress: '0x10747e2045a0ef884a0586AC81558F43285ea3c7',
      isWBNB,
      icon,
      nftSymbol: nftSymbol ?? '',
      magnification,
    }),
  );
  // const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol } ) => tokenSymbol === 'TSA',
  )

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : BigNumber.from(0)

  const BLOCKS_PER_YEAR = BigNumber.from(2336000)
  const SUSHI_PER_BLOCK = BigNumber.from(1000)

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
            .mul(SUSHI_PER_BLOCK)
              .mul(BLOCKS_PER_YEAR)
              .mul(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  setStartTime(startTime)
  const [harvestable, setHarvestable] = useState(0)
  setHarvestable(harvestable)
  const [imagePath, setImagePath ] = useState('')

  const { account } = useActiveWeb3React()
  const { stakingTokenAddress, poolAddress, earnTokenAddress, pid, name: symbol } = farm
  const decimalsOfStaking = useDecimals(stakingTokenAddress)
  const decimalsOfEarn = useDecimals(earnTokenAddress)
  const { priceInBNB: tokenPriceOfStaking } = useTokenPriceInBNB(stakingTokenAddress, decimalsOfStaking, farm.isLp)
  // const { priceInBUSD: tokenPriceOfStaking } = useTokenPriceInBUSD(stakingTokenAddress, decimalsOfStaking, farm.isLp)
  const { priceInBNB: tokenPriceOfEarn } = useTokenPriceInBNB(earnTokenAddress, decimalsOfEarn)

  const { apy } = usePoolApy(poolAddress, tokenPriceOfEarn, tokenPriceOfStaking, decimalsOfEarn, decimalsOfStaking)
  const sushi = useSushi()

  const totalSupply = useTotalSupply(pid)
  const {t} = useTranslation()


  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  const loadTokenImage = (name: string): void => {
    import(`../../../assets/img/token/${name}.png`).then(path => {
      console.log('FarmCards::FarmCard:loadTokenImage path:', path)
      setImagePath(path.default)
    })
  }

  // const isPairToken = farm.icon.includes('-')

  useEffect(() => {
    loadTokenImage(farm.icon)
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        stakingTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, stakingTokenAddress, account, setHarvestable, farm.icon])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'SUSHI' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <StyledMagnification>{farm.magnification}X</StyledMagnification>
            <StyledCardIcon>
              <StyledIconImage src={imagePath} alt="token-icon" />
            </StyledCardIcon>
            <StyledDetails>
              <StyledDetail>
                <StyledDetailSpan>Deposit</StyledDetailSpan>
                <StyledDetailSpan>
                  {farm.stakingToken.toUpperCase()}
                </StyledDetailSpan>
              </StyledDetail>
              <StyledDetail>
                <StyledDetailSpan>Earn</StyledDetailSpan>
                <StyledDetailSpan>
                  {farm.earnToken.toUpperCase()}
                </StyledDetailSpan>
              </StyledDetail>
              <StyledDetail>
                <StyledDetailSpan>APY</StyledDetailSpan>
                <StyledDetailSpan>{apy}%</StyledDetailSpan>
              </StyledDetail>
            </StyledDetails>
            <Spacer />
            {poolActive?(
              <ButtonPrimary
                as={Link}
                to={`/stakings/${farm.id}`}
              >
                {t('Select')}
                {!poolActive && (
                  <Countdown
                    date={new Date(startTime * 1000)}
                    renderer={renderer}
                  />
                )}
              </ButtonPrimary>
            ):(
              <ButtonPrimary
                disabled={true}
              >
                {t('Select')}
                {!poolActive && (
                  <Countdown
                    date={new Date(startTime * 1000)}
                    renderer={renderer}
                  />
                )}
              </ButtonPrimary>
            )}

            <Spacer />
            <StyledDetails style={{ marginTop: 0 }}>
              <StyledDetail>
                <StyledDetailSpan>Total Staked</StyledDetailSpan>
                <StyledDetailSpan>{ getBalanceNumber(totalSupply) } {symbol}</StyledDetailSpan>
              </StyledDetail>
            </StyledDetails>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: 24px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - 24px * 2) / 3);
  position: relative;
`

const StyledCardIcon = styled.div`
  height: 70px;
  width: auto;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 24px auto 16px;
`

const StyledIconImage = styled.img`
  height: 70px;
  width: auto;
  display: block;
`

// const StyledTitle = styled.h4`
//   color: ${(props) => props.theme.color.grey[600]};
//   font-size: 24px;
//   font-weight: 700;
//   margin: ${(props) => props.theme.spacing[2]}px 0 0;
//   padding: 0;
// `

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledSpacer = styled.div`
  height: 24px;
  width: 24px;
`

const StyledDetails = styled.div`
  width: 100%;
  margin-top: 8px;
`

const StyledDetail = styled.div`
  color: #000000;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`

const StyledDetailSpan = styled.span`
  display: inline-block;
  font-weight: 400;
  &:last-of-type {
    font-weight: 600;
  }
`

const StyledMagnification = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #FEC025;
  border-radius: 3px;
  width: 52px;
  height: 24px;
  line-height: 24px;
  color: #000000;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`

// const StyledInsight = styled.div`
//   display: flex;
//   justify-content: space-between;
//   box-sizing: border-box;
//   border-radius: 8px;
//   background: #fffdfa;
//   color: #aa9584;
//   width: 100%;
//   margin-top: 12px;
//   line-height: 32px;
//   font-size: 13px;
//   border: 1px solid #e6dcd5;
//   text-align: center;
//   padding: 0 12px;
// `

export default FarmCards
