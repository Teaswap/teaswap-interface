import React from "react";
import { ColumnCenter } from "../../components/Column";
import styled from "styled-components";
import ConTitle from "../../components/Content/Title";
import { MEDIA_QUERY } from "../../constants/style";

import GridImg4 from "../../assets/images/grid_img4.webp";
import GridImg5 from "../../assets/images/grid_img5.webp";
import GridImg1 from "../../assets/images/grid_img1.webp";
//import GridImg2 from '../../assets/images/grid_img2.webp'
import GridImg3 from "../../assets/images/grid_img3.webp";
import GridImg6 from "../../assets/images/6.jpg";
import GridImg7 from "../../assets/images/grid_image7.jpg";
import GridImg8 from "../../assets/images/penguinbrothers.png";
import GridImg9 from "../../assets/images/Whostheboss.png";
import GridImg10 from "../../assets/images/blindbox.png";
import YoutobeImg from "../../assets/images/youtube.png";
import { ExternalLink } from "../../theme";

import EndedImg from "../../assets/images/sign/ended.png";
import NewImg from "../../assets/images/sign/new.png";

import IncubatorBox from "../../components/general/IncubatorBox";
import { ButtonPrimary } from "../../components/Button";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";
// import { useIdoInfo} from "../../state/stake/hooks";
// import {Countdown} from "../Earn/Countdown";
// import {useActiveWeb3React} from "../../hooks";
// import {RowBetween} from "../../components/Row";

const List = () => {
  // const { chainId } = useActiveWeb3React()
  // const idoInfos = useIdoInfo()
  const { t } = useTranslation();
  //
  // // const stakingRewardsExist = Boolean(typeof chainId === 'number' && (IFO_REWARDS_INFO[chainId]?.length ?? 0) > 0)
  //
  //
  // const endreal =  idoInfos?.[0].periodFinish
  // const durationreal = idoInfos?.[0].rewardsDuration
  //
  // const endfake = idoInfos?.[0].periodFinish
  // const durationfake = 3600
  console.log(t("tokensAvailable"), useTranslation());
  const products = [
    {
      image: GridImg7,
      Learn: "https://www.teaswap.live/penguinpunks",
      LearnText: "Learn > On ETH",
      author: "Your Journey to Digital Sustainability and DeFi",
      medium: "https://youtu.be/DUZVbvaa8jM",
      info:
        "Located in the TSA MetaPlay Park, you will find 12,888 unique TSA Penguins playing around on the Sandbox TSA Meta & TSA MetaPlay Franchise. The NFTs come in different rarity levels: N (Normal ), R (Rare) & SR ( Super Rare).",
      joinUs: "/tsa",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg10,
      Learn: "https://www.teaswap.art/blind-box",
      LearnText: "Learn > On BSC",
      author: "TSA Magic Box",
      medium: "https://www.youtube.com/watch?v=qdFTk2adcHI",
      info:
        "A collection of 10,000 limited edition TSANFTs are available in the TSA MagicBox.  Holding a TSA Magic Box gives holders access to our discord-based DAO, TSADAO, where we deliver interconnectivity via social programs and rewards to the community, have a say in the future of the TSA NFT Incubator & Marketplace.",
      joinUs: "/blind-box",
      when: "When: Ongoing [Whitelist Only]",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg9,
      Learn: "https://www.teaswap.art/boss",
      // "https://www.teaswap.live/tsacollections",
      LearnText: "Learn > On Polygon",
      author: "Who's the Boss?",
      medium: "https://www.youtube.com/watch?v=11q8PEuxnm4&t=1s",
      info:
        "A collection of 300 limited editions of  “Who's the Boss?” curated by TSANFT Incubator  (Normal & Rare)  and living on the Polygon, the second market is supported by OpenSea and Rarible, staking farming is powered by TSANFT Staking.",
      joinUs: "Boss",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg8,
      Learn: "https://alpha.niftykit.com/drops/penguinbrother",
      LearnText: "Learn > On ETH",
      author: "The Opportunity for Youth NFT Program",
      medium: "https://www.youtube.com/watch?v=Dfgq197zYTo&t=10s",
      info:
        "A collection of 8,888 unique Penguinbrothers (Normal & Rare) curated by TSA Incubator and living on the EThereum, Polygon and Binance Smart Chain. Supporting Youth NFT Programs by giving 5% of proceeds received from public sale to the PenguinPunks NFT Staking Pool for learning adoption in DeFi.",
      joinUs: "/tsp",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg7,
      Learn: "https://www.teaswap.art/nft/products/vendor/265609",
      LearnText: "Learn > On BSC",
      author: "The Opportunity for Youth NFT Program",
      medium: "https://www.youtube.com/watch?v=Dfgq197zYTo&t=10s",
      info:
        "Located in the TSA MetaPlay Park, you will find 12,888 unique TSA Penguins playing around on the Sandbox TSA Meta & TSA MetaPlay Franchise. The NFTs come in different rarity levels: N (Normal ), R (Rare) & SR ( Super Rare).",
      joinUs: "vendor",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg6,
      Learn: "https://www.teaswap.live/tsametaverse",
      LearnText: "Learn > On BSC",
      author: "TSA Metaverse Lot Offering",
      medium: "https://youtu.be/u-R5AwHFkl8",
      info:
        "TSA Metaverse Park is partnered with iCashRewards VR Center to develop a digital piece of TSA NFT real estate, a total of 200,000 lots will be available. Each lot is a unique (non-fungible) token that functions as your entrance to access TSA Metaverse Park.",
      joinUs:
        "/iro/bnb/0x1729552618376F8a179c0F61F9FE789C77b230FE/0x1Ef0d833Ad1b1D76da36bb28bEF37Ee86874571E",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg4,
      Learn: "https://www.teaswap.live/tsabroadway",
      author: "TSA Broadway Series Collectibles",
      medium: "https://www.youtube.com/watch?v=6OqBxO0xQT0",
      info: t("iroinfo1"),
      info2: ``,
      joinUs:
        "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0x887Ed22FAF9C4B985ecB019eA54A5185350AE214",
      // joinUs: "#",
      when: "When: Ended",
      end: undefined,
      duration: 259200,
      sign: EndedImg,
    },
    {
      image: GridImg5,
      Learn: "https://www.caojunnft.com/",
      author: "Cao Jun NFT Collectibles",
      medium: "https://www.youtube.com/watch?v=zjgxziqWj3w",
      info: `CaoJun limited edition NFT series. The record price for CaoJun  artist at auction is $1,309,063 USD.`,
      joinUs:
        "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0xF72ECaD992CebB0138aC13b616199f131F847b04",
      // joinUs: "#",
      when: "When: Ended",
      end: undefined,
      duration: 259200,
      sign: EndedImg,
    },
    {
      image: GridImg3,
      Learn: "https://www.caojunnft.com/",
      author: "The Art of TEAsWAP",
      medium: "https://www.youtube.com/watch?v=680CKTlcZjk&t=215s",
      info: `TSA is where we bring together creators, collectors, curators, influencers, brokers, wallets, auctioneers around the world to the NFT digital space.`,
      joinUs: "#",
      info2: `CaoJun limited edition NFT series. The record price for CaoJun  artist at auction is $1,309,063 USD.`,
      end: undefined,
      duration: undefined,
      sign: EndedImg,
    },
    {
      image: GridImg1,
      Learn: "https://www.caojunnft.com/",
      author: "iCashRewards",
      medium: "https://youtu.be/Jkq1PL2j4qg",
      info: "CaoJunNFT Collectibles",
      joinUs:
        "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0xF72ECaD992CebB0138aC13b616199f131F847b04",
      // joinUs: "#",
      info2:
        "CaoJun limited edition NFT series. The record price for CaoJun  artist at auction is $1,309,063 USD.",
      end: undefined,
      duration: 259200,
      sign: EndedImg,
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
  ];

  return (
    <PageWrapper>
      <IncubatorBox />
      <PageWrapper2>
        <div style={{ marginTop: "75px", position: "relative" }}>
          <ConTitle con='Initial Art Offering ("IRO")' />
        </div>

        <Grids>
          {products.map((v, i) => {
            return (
              <Grid key={i}>
                <img
                  width="100%"
                  height="220px"
                  src={v.image}
                  onClick={() => {
                    if (v.LearnText == "Learn > On ETH") {
                      window.open("https://www.teaswap.live/penguinpunks");
                    } else if (
                      v.LearnText == "Learn > On ETH" &&
                      v.author == "The Opportunity for Youth NFT Program"
                    ) {
                      window.open("https://www.teaswap.live/penguinbrother");
                    } else if (
                      v.LearnText == "Learn > On Polygon" &&
                      v.author !== "Who's the Boss?"
                    ) {
                      window.open("https://www.teaswap.art/tsp");
                    } else if (v.author == "Who's the Boss?") {
                      window.open("https://www.teaswap.live/whostheboss");
                    } else if (v.author == "TSA Magic Box") {
                      window.open("https://www.teaswap.live/tsa-magicbox");
                    } else {
                      window.open(
                        "https://www.teaswap.art/nft/products/vendor/263751"
                      );
                    }
                  }}
                />

                <Learn>
                  <ExternalLink href={v.Learn}>
                    <Learn>{v.LearnText || "Learn >"}</Learn>
                  </ExternalLink>
                </Learn>
                <Read>
                  <span>{v.author}</span>
                  <p style={{ display: "flex" }}>
                    {"Read"}
                    {/* <StyledLink to={v.medium}>youtubelink</StyledLink> */}
                    <ExternalLink href={v.medium}>
                      <img
                        style={{ marginLeft: "10px" }}
                        width="26"
                        height="26"
                        src={YoutobeImg}
                      />
                    </ExternalLink>
                  </p>
                </Read>
                <Spe></Spe>
                <Info>
                  {v.info}
                  {v.info2 && <p>{v.info2}</p>}
                </Info>
                <div style={{ marginTop: "40px" }}>{v.when && v.when}</div>
                {/* <Countdown exactEnd={v.end} rewardsDuration={v.duration?v.duration:1000} /> */}
                {v.joinUs === "penguinpunks" && (
                  <ExternalLink href="https://www.teaswap.live/penguinpunks">
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </ExternalLink>
                )}
                {v.joinUs === "Alpha" && (
                  <ExternalLink href="https://alpha.niftykit.com/drops/penguinbrother">
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </ExternalLink>
                )}
                {v.joinUs === "vendor" && (
                  <ExternalLink href="https://www.teaswap.art/nft/products/vendor/265609">
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </ExternalLink>
                )}
                {v.joinUs !== "vendor" &&
                  v.joinUs !== "Alpha" &&
                  v.joinUs !== "penguinpunks" &&
                  v.joinUs !== "tsapenguinpunks" &&
                  v.joinUs !== "Boss" && (
                    <StyledLink to={v.joinUs}>
                      <JoinUs>{t("Join Us")}</JoinUs>
                    </StyledLink>
                  )}
                {v.joinUs === "tsapenguinpunks" && (
                  <ExternalLink href="https://www.teaswap.live/tsapenguinpunks">
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </ExternalLink>
                )}
                {v.joinUs == "Boss" && (
                  <ExternalLink href="https://www.teaswap.art/boss">
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </ExternalLink>
                )}

                <img
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "5px",
                  }}
                  width="100"
                  src={v.sign}
                />
              </Grid>
            );
          })}
        </Grids>
      </PageWrapper2>
    </PageWrapper>
  );
};
export default List;

const PageWrapper = styled(ColumnCenter)`
  text-align: center;
  margin-top: -75px;
  width: 100%;
  ${MEDIA_QUERY.sm} {
    // margin-top: -40px;
  }
`;

const PageWrapper2 = styled(ColumnCenter)`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  margin-top: -100px;
  margin-bottom: 50px;
  max-width: 1400px;
  padding-top: 30px;
`;
const Grids = styled(ColumnCenter)`
  text-align: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
  ${MEDIA_QUERY.sm} {
    margin-top: -20px;
    justify-content: center;
  }
`;

const Grid = styled(ColumnCenter)`
  text-align: center;
  width: 420px;
  display: flex;
  padding: 15px;
  justify-content: flex-start;
  border-width: 0 0 0 0;
  border-style: solid solid solid solid;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1)
    rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 0px;
  margin-left: 30px;
  margin-top: 60px;
  align-items: flex-start;
  ${MEDIA_QUERY.sm} {
    margin-left: 0;
    // width: calc(90% - 30px);
  }
`;

const Learn = styled.span`
  color: #000000;
  font-size: 15px;
  margin-top: 6px;
  font-weight: bold;
  align-self: center;
`;

const Read = styled(ColumnCenter)`
  color: #474747;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 14px;
`;

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
`;
const Spe = styled.p`
  left: 13px;
  grid-area: 4 / 1 / 5 / 2;
  justify-self: start;
  align-self: start;
  width: 36px;
  height: 1px;
  background: rgb(179, 179, 179);
`;
const Info = styled.span`
  color: #474747;
  font-size: 14px;
  text-align: left;
  height: 130px;
`;

const JoinUs = styled(ButtonPrimary)`
  margin: 40px 0 37px 0;
  padding: 0px;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  align-self: flex-start;
  display: block;
`;
