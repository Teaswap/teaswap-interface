import React, { useEffect, useMemo, useState } from "react";
import { AutoColumn, ColumnCenter } from "../../components/Column";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ETHER, JSBI } from "@teaswap/uniswap-sdk";
// import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from "../../hooks/Tokens";
import { useWalletModalToggle } from "../../state/application/hooks";
import { ExternalLink, TYPE } from "../../theme";

import { RowBetween } from "../../components/Row";
import {
  CardSection,
  DataCard,
  CardNoise,
  CardBGImage,
} from "../../components/earn/styled";
import { ButtonPrimary, ButtonEmpty } from "../../components/Button";
import { STAKING_GENESIS, useIdoInfo } from "../../state/stake/hooks";
// import ClaimRewardModal from '../../components/earn/ClaimRewardModal'
import { useETHBalances, useTokenBalance } from "../../state/wallet/hooks";
import { useActiveWeb3React } from "../../hooks";
// import { useColor } from '../../hooks/useColor'
import { CountUp } from "use-count-up";

// import { wrappedCurrency } from '../../utils/wrappedCurrency'
import usePrevious from "../../hooks/usePrevious";

import { BIG_INT_ZERO } from "../../constants";
import BuyingModal from "../../components/ido/BuyingModal";
import ClaimIdoRewardModal from "../../components/earn/ClaimRewardModal";
import ConTitle from "../../components/Content/Title";
// import IncubatorBox from '../../components/general/IncubatorBox'
import { MEDIA_QUERY } from "../../constants/style";
import { Countdown } from "../Earn/Countdown";
import { ParamsType } from "./Interface";

const PageWrapper = styled.div`
  width: 100%;
  text-align: center;
  ${MEDIA_QUERY.sm} {
  }
`;

const AuthorInfo = styled(ColumnCenter)`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 80px;
  align-items: flex-start;
  ${MEDIA_QUERY.sm} {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const Author = styled(ColumnCenter)`
  max-width: 455px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #7f7f7f;
  font-size: 13px;
  ${MEDIA_QUERY.sm} {
    margin-top: 30px;
    width: 96%;
  }
`;

const Box = styled(ColumnCenter)`
  max-width: 405px;
  width: 90%;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1)
    rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 65%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 0px;
  margin-left: 40px;
  margin-top: 40px;
  padding: 20px;
  padding-bottom: 20px;
  ${MEDIA_QUERY.sm} {
    margin-left: 0;
    margin-top: 0;
    width: 80%;
  }
`;

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  // position: relative;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`;

const BottomSection = styled(AutoColumn)`
  border-radius: 0px;
  width: 100%;
  position: relative;
`;

const StyledDataCard = styled(DataCard)<{
  bgColor?: any;
  showBackground?: any;
}>`
  background-color: #b3b3b3;
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  // margin-top: -40px;
  // padding: 0 1.25rem 1rem 1.25rem;
  // padding-top: 32px;
  z-index: 1;
`;

const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  margin: 1rem;
  // padding: 1rem;
  z-index: 1;
  text-align: left;
`;

const VoteCard = styled(DataCard)`
  // background: radial-gradient(76.02% 75.41% at 1.84% 0%,#60a7ac 0%, #60a7ac 100%);
  overflow: hidden;
`;

const DataRow = styled(ColumnCenter)`
  justify-content: center;
`;

interface Props {
  params: ParamsType;
}

const Index = ({ params }: Props) => {
  // export default function Index({
  //   match: {
  //     params: { currencyIdA, currencyIdB }
  //   }
  // }: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account } = useActiveWeb3React();
  const { t } = useTranslation();
  console.log("changeLanguage", t("tokensAvailable"));
  // const params = useParams()

  // get currencies and pair
  const [currencyA, currencyB] = [
    useCurrency(params.currencyIdA),
    useCurrency(params.currencyIdB),
  ];
  // const tokenA = wrappedCurrency(currencyA ?? undefined, chainId)
  // const tokenB = wrappedCurrency(currencyB ?? undefined, chainId)

  // const [, stakingTokenPair] = usePair(tokenA, tokenB)
  // const stakingInfo = useStakingInfo(stakingTokenPair)?.[0]
  const idoInfo = useIdoInfo(params.idoAddress)?.[0];
  console.log("idoInfo", idoInfo);

  // detect existing unstaked LP position to show add button if none found
  const userETHBlance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];
  const userTokenAmount = useTokenBalance(
    account ?? undefined,
    idoInfo?.makeAmount?.token
  );
  const userLiquidityUnstaked =
    currencyA === ETHER ? userETHBlance : userTokenAmount;
  const showAddLiquidityButton = Boolean(
    idoInfo?.makeAmount?.equalTo("0") && userLiquidityUnstaked?.equalTo("0")
  );

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState<boolean>(false);
  const [showClaimRewardModal, setShowClaimRewardModal] = useState<boolean>(
    false
  );

  // fade cards if nothing staked or nothing earned yet
  const disableTop =
    !idoInfo?.makeAmount || idoInfo.makeAmount.equalTo(JSBI.BigInt(0));

  const countUpAmount = idoInfo?.unclaimAmount?.toFixed(4) ?? "0";
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? "0";

  const toggleWalletModal = useWalletModalToggle();

  const duration = useMemo(
    () => (idoInfo?.rewardsDuration ? idoInfo?.rewardsDuration : 100000),
    [idoInfo?.rewardsDuration]
  );

  const end = useMemo(
    () =>
      idoInfo?.periodFinish
        ? idoInfo?.periodFinish?.getTime() / 1000
        : STAKING_GENESIS + duration,
    [idoInfo?.periodFinish, duration]
  );

  const begin = useMemo(() => end - duration, [end, duration]);

  // get current time
  const [time, setTime] = useState(() => Math.floor(Date.now() / 1000));
  useEffect((): (() => void) | void => {
    // we only need to tick if rewards haven't ended yet
    if (time <= end) {
      const timeout = setTimeout(
        () => setTime(Math.floor(Date.now() / 1000)),
        1000
      );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time, end]);

  const timeUntilGenesis = begin - time;
  const timeUntilEnd = end - time;

  return (
    <PageWrapper>
      <img
        style={{ marginBottom: "20px" }}
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSfA-dOW15tyN6dfyZScvcEmT3lC13K9ThFBTruiFD0wOVsoUQ/viewform"
          );
        }}
        width="100%"
        src={process.env.PUBLIC_URL + "/incubator_banner.png"}
        alt=""
      />
      {params.idoAddress == "0xF72ECaD992CebB0138aC13b616199f131F847b04" && (
        <ConTitle con="CaoJun NFT Collectibles" />
      )}
      {params.idoAddress == "0x887Ed22FAF9C4B985ecB019eA54A5185350AE214" && (
        <ConTitle con={t("TSA Broadway Series NFT Collectibles")} />
      )}
      {idoInfo && (
        <BuyingModal
          isOpen={showStakingModal}
          onDismiss={() => setShowStakingModal(false)}
          idoInfo={idoInfo}
          userLiquidityUnstaked={userLiquidityUnstaked}
        />
      )}

      {idoInfo && (
        <ClaimIdoRewardModal
          isOpen={showClaimRewardModal}
          onDismiss={() => setShowClaimRewardModal(false)}
          idoInfo={idoInfo}
        />
      )}
      {/* <RowBetween style={{ gap: '24px' }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>
          Send {currencyA?.symbol} to buy {currencyB?.symbol} {t('Initial DEFI Offering')}
        </TYPE.mediumHeader>
        <DoubleCurrencyLogo currency0={currencyA ?? undefined} currency1={currencyB ?? undefined} size={24} /> */}
      {/* </RowBetween> */}
      <AuthorInfo>
        {params.idoAddress == "0xF72ECaD992CebB0138aC13b616199f131F847b04" && (
          <Author>
            <img
              src={process.env.PUBLIC_URL + "/cjainft.png"}
              width="150"
              style={{ marginBottom: "0px" }}
            />
            <div className="iro-title">
              CaoJun Limited Edition of NFT Collectibles
            </div>
            <div className="iro-title1">
              Key terms for CJAI NFT Collectibles & Initial Art Offering
              ("IRO"):{" "}
            </div>
            <ol
              style={{
                fontSize: "15px",
                textAlign: "left",
                lineHeight: "28px",
              }}
            >
              <li>​Total Edition of CaoJunNFT Collectibles released: 600</li>
              <li>Total TSA released for CJAI IRO: 15,000,000</li>
              <li>
                List TSA Token on TeaSwap, BakerySwap and SwapAll for trading
                and liquidity farming;
              </li>
              <li>
                Able to stake TSA to earn CJAI and iCASH, Deposit TSA-BNB BLP to
                earn TSA, Deposit TSA-BUSD to earn TSA, and Deposit TSA-USDT BLP
                to earn TSA.
              </li>
              <li>
                100,000 $TSA can be exchanged with 1 CaoJun NFT, and 1 CaoJun
                NFT can be converted into one exclusive physical CaoJun Limited
                Edition of NFT Collectible ("CaoJun NFT Collectible"). The NFT
                and $TSA will be burned afterward.
              </li>
              <li>
                The CaoJun NFT will be available at the CaoJun NFT Collectibles
                (under NFT Broadway tab), and can only be purchased with $TSA
              </li>
              <li>
                No minimum: Users can buy fractions of $TSA Offering for CaoJun
                NFT Collectibles
              </li>
            </ol>
            <div style={{ lineHeight: "30px", fontSize: "15px" }}>
              {" "}
              Details : 
              <ExternalLink href="https://www.caojunnft.com">
                https://www.caojunnft.com
              </ExternalLink>
            </div>
          </Author>
        )}
        {params.idoAddress == "0x887Ed22FAF9C4B985ecB019eA54A5185350AE214" && (
          <Author>
            <div className="iro-title">{t("irobigtitle")}</div>
            <div className="iro-title1">{t("irotitle")}</div>
            <ol
              style={{
                fontSize: "15px",
                textAlign: "left",
                lineHeight: "28px",
              }}
            >
              <li>{t("irocon1")}</li>
              <li>{t("irocon2")}</li>
              <li>{t("irocon3")}</li>
              <li>{t("irocon4")}</li>
              <li>{t("irocon5")}</li>
              <li>{t("irocon6")}</li>
              <li>{t("irocon7")}</li>
              <li>{t("irocon8")}</li>
              <li>{t("irocon9")}</li>
            </ol>
            {/* <div style={{lineHeight: '30px', fontSize: '15px'}}>  Details : 
                <ExternalLink href="https://www.caojunnft.com">
                  https://www.caojunnft.com
                </ExternalLink>
              </div> */}
          </Author>
        )}

        <Box>
          <PoolData>
            <AutoColumn className="padding-column" gap="sm">
              <TYPE.darkGray style={{ margin: 0 }}>
                {t("totalSupply")}
              </TYPE.darkGray>
              {/*<TYPE.darkGray fontSize={24} fontWeight={500}>*/}
              {/*  {valueOfTotalStakedAmountInUSDC*/}
              {/*    ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`*/}
              {/*    : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} BNB`}*/}
              {/*</TYPE.darkGray>*/}
              <RowBetween style={{ alignItems: "baseline" }}>
                <TYPE.darkGray fontSize={24} fontWeight={500}>
                  {idoInfo?.totalsupplayAmount
                    ? `${idoInfo?.totalsupplayAmount.toFixed(0, {
                        groupSeparator: ",",
                      })} ${currencyB?.symbol}`
                    : `${idoInfo?.totalsupplayAmount?.toSignificant(4, {
                        groupSeparator: ",",
                      }) ?? "-"} ${currencyB?.symbol}`}
                </TYPE.darkGray>
                <TYPE.gray>
                  {idoInfo?.totalSoldAmount?.toSignificant(2, {
                    groupSeparator: ",",
                  }) ?? "-"}{" "}
                  {t("sold")}
                </TYPE.gray>
              </RowBetween>
            </AutoColumn>
          </PoolData>
          <PoolData>
            <AutoColumn className="padding-column" gap="sm">
              <TYPE.darkGray style={{ margin: 0 }}>{t("Price")}</TYPE.darkGray>
              <TYPE.darkGray fontSize={24} fontWeight={500}>
                1 {currencyB?.symbol} {t("need")} {""}
                {idoInfo?.price
                  ? `${idoInfo?.price.toFixed(6, { groupSeparator: "," })} ${
                      currencyA?.symbol
                    } `
                  : `${idoInfo?.price?.toSignificant(6, {
                      groupSeparator: ",",
                    }) ?? "-"} ${currencyA?.symbol} `}
              </TYPE.darkGray>
              <TYPE.darkGray style={{ margin: 0 }}>{t("Rate")}</TYPE.darkGray>
              <TYPE.darkGray fontSize={24} fontWeight={500}>
                1 {currencyA?.symbol} {t("buy")} {""}
                {idoInfo?.rate
                  ? `${idoInfo?.rate.toFixed(2, { groupSeparator: "," })} ${
                      currencyB?.symbol
                    } `
                  : `${idoInfo?.rate?.toSignificant(4, {
                      groupSeparator: ",",
                    }) ?? "-"} ${currencyB?.symbol} `}
              </TYPE.darkGray>
            </AutoColumn>
          </PoolData>

          {showAddLiquidityButton && (
            <VoteCard>
              <CardNoise />
              <CardSection>
                <AutoColumn gap="md">
                  <RowBetween>
                    <TYPE.black fontWeight={600}>
                      {t("step")} 1.{" "}
                      {t("get-best-v2-liquidity-tokens", {
                        symbolOne: currencyA?.symbol,
                      })}
                    </TYPE.black>
                  </RowBetween>
                  <RowBetween style={{ marginBottom: "1rem" }}>
                    <TYPE.black fontSize={14}>
                      {/* {`BEST-V2 LP tokens are required. Once you've added liquidity to the ${currencyA?.symbol}-${currencyB?.symbol} pool you can stake your liquidity tokens on this page.`} */}
                      {t(
                        "best-v2-lp-tokens-are-required-once-youve-added-liquidity-to-the-symbolone-symboltwo-pool-you-can-stake-your-liquidity-tokens-on-this-page",
                        {
                          symbolOne: currencyA?.symbol,
                        }
                      )}
                    </TYPE.black>
                  </RowBetween>
                  <ButtonPrimary
                    padding="8px"
                    borderRadius="0px"
                    width={"fit-content"}
                    as={Link}
                    to={currencyA?.symbol?.includes("BLP") ? `/add` : `/swap`}
                  >
                    {`Add ${currencyA?.symbol}`}
                  </ButtonPrimary>
                </AutoColumn>
              </CardSection>
              <CardBGImage />
              <CardNoise />
            </VoteCard>
          )}

          <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
            <BottomSection gap="lg" justify="center">
              <StyledDataCard
                disabled={disableTop}
                showBackground={!showAddLiquidityButton}
              >
                <CardSection>
                  <CardBGImage desaturate />
                  <CardNoise />
                  <AutoColumn gap="md">
                    <RowBetween>
                      <TYPE.white fontWeight={600}>
                        {t("Your Token Paid")}
                      </TYPE.white>
                    </RowBetween>
                    <RowBetween style={{ alignItems: "baseline" }}>
                      <TYPE.white fontSize={28} fontWeight={600}>
                        {idoInfo?.makeAmount?.toSignificant(4) ?? "-"}
                      </TYPE.white>
                      <TYPE.white>{currencyA?.symbol}</TYPE.white>
                    </RowBetween>
                  </AutoColumn>
                </CardSection>
              </StyledDataCard>
              <StyledBottomCard
                dim={idoInfo?.makeAmount?.equalTo(JSBI.BigInt(0))}
              >
                {/* <CardBGImage desaturate />
                <CardNoise /> */}
                <AutoColumn className="padding-column" gap="sm">
                  <RowBetween>
                    <div>
                      <TYPE.black>
                        {t("Your Unclaimed")} {currencyB?.symbol}
                      </TYPE.black>
                    </div>
                    {idoInfo?.unclaimAmount &&
                      JSBI.notEqual(
                        BIG_INT_ZERO,
                        idoInfo?.unclaimAmount?.raw
                      ) && (
                        <ButtonEmpty
                          padding="8px"
                          borderRadius="0px"
                          width="fit-content"
                          onClick={() => setShowClaimRewardModal(true)}
                        >
                          {t("claim")}
                        </ButtonEmpty>
                      )}
                  </RowBetween>
                  <RowBetween style={{ alignItems: "baseline" }}>
                    <TYPE.largeHeader fontSize={28} fontWeight={600}>
                      <CountUp
                        key={countUpAmount}
                        isCounting
                        decimalPlaces={4}
                        start={parseFloat(countUpAmountPrevious)}
                        end={parseFloat(countUpAmount)}
                        thousandsSeparator={","}
                        duration={1}
                      />
                    </TYPE.largeHeader>
                    <TYPE.black fontSize={16} fontWeight={500}>
                      <span
                        role="img"
                        aria-label="wizard-icon"
                        style={{ marginRight: "8px " }}
                      >
                        ⚡ {t("Total Earned")}
                      </span>
                      {idoInfo?.earnedAmount?.toSignificant(2, {
                        groupSeparator: ",",
                      }) ?? "-"}
                      {currencyB?.symbol}
                    </TYPE.black>
                  </RowBetween>
                </AutoColumn>
              </StyledBottomCard>
            </BottomSection>
            {/* <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
                ⭐️
              </span>
              {t('when-you-withdraw-the-contract-will-automagically-claim-best-on-your-behalf')}
            </TYPE.main> */}

            {!showAddLiquidityButton && (
              <DataRow style={{ marginBottom: "1rem" }}>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="0px"
                  width="266px"
                  onClick={() => {
                    if (account) {
                      console.log(showStakingModal);
                      setShowStakingModal(true);
                      console.log(showStakingModal);
                    } else {
                      toggleWalletModal();
                    }
                  }}
                  disabled={timeUntilGenesis > 0 || timeUntilEnd < 0}
                >
                  {idoInfo?.makeAmount?.greaterThan(JSBI.BigInt(0))
                    ? t("Buy Again")
                    : t("Participate")}
                </ButtonPrimary>

                {idoInfo?.earnedAmount
                  ?.subtract(idoInfo?.claimedAmount)
                  .greaterThan(JSBI.BigInt(0)) && (
                  <ButtonPrimary
                    marginTop="5px"
                    padding="8px"
                    borderRadius="0px"
                    width="266px"
                    onClick={() => setShowClaimRewardModal(true)}
                  >
                    {t("claim")}
                  </ButtonPrimary>
                )}
              </DataRow>
            )}
            <Countdown
              exactEnd={idoInfo?.periodFinish}
              rewardsDuration={idoInfo?.rewardsDuration}
            />

            {!userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo(
                "0"
              ) ? null : (
              <TYPE.main>
                {userLiquidityUnstaked.toSignificant(6)} {t("tokensAvailable")}
              </TYPE.main>
            )}
          </PositionInfo>
        </Box>
      </AuthorInfo>

      {params.idoAddress == "0xF72ECaD992CebB0138aC13b616199f131F847b04" && (
        <IframeComponent iframe={iframe} />
      )}
      {params.idoAddress == "0x887Ed22FAF9C4B985ecB019eA54A5185350AE214" && (
        <div
          style={{
            width: "90%",
            maxWidth: "1000px",
            textAlign: "left",
            margin: "0 auto",
          }}
        >
          <p>Details :</p>
          <p>
            English：{" "}
            <ExternalLink href="https://www.teaswap.live/tsabroadway">
              https://www.teaswap.live/tsabroadway
            </ExternalLink>
          </p>
          <p>
            中文信息：{" "}
            <ExternalLink href="https://zh.teaswap.live/tsabroadway">
              https://zh.teaswap.live/tsabroadway
            </ExternalLink>
          </p>
        </div>
      )}
      {params.idoAddress == "0x887Ed22FAF9C4B985ecB019eA54A5185350AE214" && (
        <IframeComponent iframe={iframe2} />
      )}
      {params.idoAddress == "0xF72ECaD992CebB0138aC13b616199f131F847b04" && (
        <div
          style={{
            color: "#474747",
            marginTop: "50px",
          }}
        >
          ** Converting into one exclusive CaoJun NFT limited edition of digital
          collectible  or original collectibles ?
          <ExternalLink
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSfKQ5ESZ_843cjHGBwKuObT79bfjUPQ3XHOJpy9vw2VFbAZVA/viewform"
            }
          >
            Submit Now .
          </ExternalLink>
        </div>
      )}
      {params.idoAddress == "0x887Ed22FAF9C4B985ecB019eA54A5185350AE214" && (
        <div
          style={{
            maxWidth: "849px",
            width: "100%",
            margin: "0 auto",
            marginTop: "60px",
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "60px",
          }}
        >
          <span
            className="link-btn"
            style={{
              display: "block",
              alignSelf: "right",
              width: "256px",
              height: "40px",
              lineHeight: "40px",
              color: "#333333",
              backgroundColor: "#DBDBDB",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfIocxm-bnEI3CvQF0caJDjIp0Kz-BDbIRig_kC7vBo0L7p3Q/viewform"
              );
            }}
          >
            Redeem NFT
          </span>
        </div>
      )}
    </PageWrapper>
  );
};

const IframeDiv = styled.div`
  width: 100%;
  max-width: 849px;
  width: 100%;
  height: 521px;
  margin: 0 auto;
  margin-top: 60px;
  @media (max-width: 500px) {
    height: 220px;
    margin-top: 40px;
  }
`;

function IframeComponent(props: any) {
  return (
    <IframeDiv
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

const iframe =
  '<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/xa8OBoVx2yk?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>';
const iframe2 =
  '<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" style="margin-top: 30px; width: 100%; height: 100%; " src="https://www.youtube.com/embed/QVuiElOqJ5Y?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>';

export default Index;
