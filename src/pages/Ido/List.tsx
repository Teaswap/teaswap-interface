import React from "react";
import { ColumnCenter } from "../../components/Column";
import styled from "styled-components";
// import ConTitle from "../../components/Content/Title";
import {COLOR, FONT, MEDIA_QUERY} from "../../constants/style";

import GridImg4 from "../../assets/images/grid_img4.webp";
import GridImg5 from "../../assets/images/grid_img5.webp";
// import GridImg1 from "../../assets/images/grid_img1.webp";
//import GridImg2 from '../../assets/images/grid_img2.webp'
// import GridImg3 from "../../assets/images/grid_img3.webp";
import GridImg6 from "../../assets/images/6.jpg";
import GridImg7 from "../../assets/images/grid_image7.jpg";
import GridImg8 from "../../assets/images/penguinbrothers.png";
import GridImg9 from "../../assets/images/Whostheboss.png";
// import GridImg10 from "../../assets/images/blindbox.png";
import GridImg11 from "../../assets/images/2020.gif";
// import GridImg12 from "../../assets/images/xtinct.png";
// import GridImg13 from "../../assets/images/HOTBOXOG_IROBANNER.png";
// import GridImg12 from "../../assets/images/TSAWeb3MusicBox.png";
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
//     {
//       image:
//         "https://teaswap.mypinata.cloud/ipfs/QmPp1hJzgNLrEdSTyYwKzigq2S2SzonuDYrEBWEvNoqNPx",
//       Learn: "https://www.teaswap.art/wda",
//       LearnText: "Learn > On Ethereum",
//       author: "TSAWeb3 Dictionary Music Mystery Box",
//       medium: "https://www.youtube.com/watch?v=IrXHwLUMq-E&t=22s",
//       info: `Web3Social Key is a No-Code Social Token Launchpad. By using your Web3Social
// Key powered by TSA NFT, you can unlock features like launching your own social
// token, starting community funding and fansumers economy, and more. Total 2100
// keys will be opening to the market with standard and premium features available.v`,
//       joinUs: "/wsk",
//       when: "When: December 6, 2022",
//       end: new Date(1655273475719),
//       duration: 6048000,
//       sign: NewImg,
//     },
    {
      image: "https://teaswap.mypinata.cloud/ipfs/QmSs8X1xn1W7icwzQnpUM3UcCaPq2bVmpiYMiyaLmyFTPw",
      Learn: "https://www.teaswap.live/tsabroadway",
      LearnText: "Learn > On BNB Chain",
      author: "TSA Broadway Series Collectibles",
      medium: "https://www.youtube.com/watch?v=6OqBxO0xQT0",
      info: t("iroinfo1"),
      info2: ``,
      joinUs:
        "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0x624b680136AA1Dd629F8F832a8044c1dF6C33BE9",
      when: "When: Feb 8, 2023",
      end: new Date(1684454400000),
      duration: 8640000,
      sign: NewImg,
    },
    {
      image:
        "https://teaswap.mypinata.cloud/ipfs/QmXhRCWRaAKXjyWzXAwUqE2bPNNEt6yvxRsUwvTQzqdYVK",
      Learn: "https://www.teaswap.live/web3socialkey",
      LearnText: "Learn > On Ethereum",
      author: "Web3Social Key",
      medium: "https://youtu.be/jEmasPf-KXE",
      info: `Web3Social Key is a No-Code Social Token Launchpad. With your Web3Social Key, you can unlock features like launching your own customised smart contract, social token, starting community funding and fansumers economy, and more. Total 2100 keys will be released with standard and premium features available.`,
      joinUs: "/wsk",
      when: "When: Jan 18, 2023",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmRHs1qFsnyEZvzdxWmoZHei4dkBmPo7r7KM6uMDq2pnWy',
      Learn: "https://www.teaswap.art/blind-box",
      LearnText: "Learn > On BNB Chain",
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
      image:
        "https://teaswap.mypinata.cloud/ipfs/QmPp1hJzgNLrEdSTyYwKzigq2S2SzonuDYrEBWEvNoqNPx",
      Learn: "https://www.teaswap.art/wda",
      LearnText: "Learn > On Ethereum",
      author: "TSAWeb3 Dictionary Music Mystery Box",
      medium: "https://www.youtube.com/watch?v=IrXHwLUMq-E&t=22s",
      info: `Web3 Dictionary Album 100 is designed to provide very basic, simple, clear and easy to understand introductory explanations of new terms and technology surrounding the so called “Web3” as well as the “ Metaverse ”. These include things like blockchain, bitcoin, decentralized finance, NFTs, and more.`,
      joinUs: "/wda",
      when: "When: December 8, 2022",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image:
        "https://teaswap.mypinata.cloud/ipfs/QmPp1hJzgNLrEdSTyYwKzigq2S2SzonuDYrEBWEvNoqNPx",
      Learn: "https://www.teaswap.art/twd",
      LearnText: "Learn > On Polygon",
      author: "TSAWeb3 Dictionary Music Mystery Box",
      medium: "https://www.youtube.com/watch?v=IrXHwLUMq-E&t=22s",
      info: `Web3 Dictionary Album 100 is designed to provide very basic, simple, clear and easy to understand introductory explanations of new terms and technology surrounding the so called “Web3” as well as the “ Metaverse ”. These include things like blockchain, bitcoin, decentralized finance, NFTs, and more.`,
      joinUs: "/twd",
      when: "When: Aug 18, 2022",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },

    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmQiXeRzxZCUTKjGeiQAFByYeG2JRYGsWk6BWnrrhkfhvr/HOTBOXOG_IRO_BG.jpg',
      Learn: "https://www.teaswap.art/xhb",
      LearnText: "Learn > On Ethereum",
      author: "HotBox Og (XHB)",
      medium: "https://youtu.be/ZBrlqqftFmE",
      info: `"HOTBOX Og" is a mystery airdrop collection for XTincT’s upcoming album “Melancholy Dr." EP.  HOTBOX Og is a 10 track music NFT Mystery Box, accommodated by utilities, staking, airdrops, metaverse events and more. Each song is inspired by the blockchain and expressed through chill melancholy tones by XTincT.`,
      joinUs: "/xhb",
      when: "When: October 13, 2022",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },

    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmQ9JfAQeCZcBABthGEzDqZd4jRiJpaLq6mMLRG6NkGT9K',
      Learn: "",
      LearnText: "Learn > On Polygon",
      author: "TSA Gift Shop",
      medium: "",
      info: `TSANFT GiftShop is very excited to launch “TSA #Web3 Wearable Dictionary” featuring #TSA 100 unique Wearable Collections. TSA Giftshop is on Metaverse Voxels, Sandbox and Dvision. `,
      joinUs: "https://opensea.io/collection/tsa-gift-shop",
      when: "When: Ongoing",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmY1RqynAH6W1pxXdds5e5ftgvBx2YbPZpSDjDke4wiwAH',
      Learn: "",
      LearnText: "Learn > On Polygon",
      author: "Digital One Asset ",
      medium: "",
      info: `A collection of Digital Assets building on Voxels Architecture Island . Visit Us: https://www.cryptovoxels.com/play?coords=N@1215E,785N `,
      joinUs: "https://opensea.io/collection/digitalone",
      when: "When: Ongoing",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg7,
      Learn: "https://www.teaswap.live/penguinpunks",
      LearnText: "Learn > On Ethereum Mainnet",
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
      image: GridImg11,
      Learn: "https://www.teaswap.art/poap2",
      LearnText: "Learn > On Ethereum Mainnet",
      author: "Digital 20/20 POAP",
      medium: "https://www.youtube.com/watch?v=5Fbg1IohSxk",
      info:
        "POAPs, or Proof of Attendance Protocol, are unique NFT badges given to attendees to prove their attendance at an event. Attendees from  the Digital 20/20 Digital 20/20: Boom Into Web3 Social  are eligible to receive a Digital 20/20 POAP NFT to celebrate and record your attendance! Accept Credit Card Payment and $ETH",
      joinUs: "/poap2",
      when: "When: Ongoing, 2022",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmQiXeRzxZCUTKjGeiQAFByYeG2JRYGsWk6BWnrrhkfhvr/stake%20the%20hotbox.png',
      Learn: "",
      LearnText: "Learn > On BNB Chain",
      author: "The Hot Box (THB)",
      medium: "",
      info: `A collection of 8,000 limited edition of Virtual cannabis products are available in the The HotBox. Holding a The Hot Box gives holders access to our discord-based DAO, XCoinDAO, where we deliver interconnectivity via social programs and rewards to the community, have a say in the future of the XCoin ecosystem. `,
      joinUs: "/thb",
      when: "When: Ongoing, 2022",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },

    {
      image: GridImg11,
      Learn: "https://www.teaswap.art/poap",
      LearnText: "Learn > On Polygon",
      author: "Digital 20/20 POAP",
      medium: "https://youtu.be/PACwzNMMQgs",
      info:
        "POAPs, or Proof of Attendance Protocol, are unique NFT badges given to attendees to prove their attendance at an event. Attendees from  the Digital 20/20 Towards Digital World event are eligible to receive a Digital 20/20 POAP NFT to celebrate and record your attendance!",
      joinUs: "/poap",
      when: "When: Ongoing, 2022",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmaaXRyf27N174h51Za8QzC4p5DaokkF8XYXDcqZnJ4ndN',
      Learn: "",
      LearnText: "Learn > On Polygon",
      author: "TSA Dreamhome Editions",
      medium: "",
      info: `TSADreamHome Collection NFT provides access to Meta Journey and is designed to be used in the Metaverse Voxels & Sandbox. Cruise, Car, Piano, Helicopter. Each NFT is GLTF format with unlockable content which would be the vox or vxm model in a dropbox link. `,
      joinUs: "https://opensea.io/collection/tsadreamhome",
      when: "When: Ongoing",
      end: new Date(1655273475719),
      duration: 6048000,
      sign: NewImg,
    },

    {
      image: 'https://teaswap.mypinata.cloud/ipfs/QmQiXeRzxZCUTKjGeiQAFByYeG2JRYGsWk6BWnrrhkfhvr/HOTBOXOG_IRO_BG.jpg',
      Learn: "https://www.teaswap.art/xhb2",
      LearnText: "Learn > On Optimism",
      author: "HotBox Og (XHB)",
      medium: "https://youtu.be/NsAw8Z-lmoA",
      info: `"HOTBOX Og" is a mystery airdrop collection for XTincT’s upcoming album “Melancholy Dr." EP. HOTBOX Og is a 10 track music NFT Mystery Box, accommodated by utilities, staking, airdrops, metaverse events and more. Each song is inspired by the blockchain and expressed through chill melancholy tones by XTincT.`,
      joinUs: "/xhb2",
      when: "When: TBD",
      end: new Date(1655273475719),
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
      joinUs: "/boss",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },

    {
      image: GridImg8,
      Learn: "https://alpha.niftykit.com/drops/penguinbrother",
      LearnText: "Learn > On Ethereum Mainnet",
      author: "The Opportunity for Youth NFT Program",
      medium: "https://youtu.be/pdB4u8PXV2c",
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
      LearnText: "Learn > On BNB Chain",
      author: "The Opportunity for Youth NFT Program",
      medium: "https://www.youtube.com/watch?v=Dfgq197zYTo&t=10s",
      info:
        "Located in the TSA MetaPlay Park, you will find 12,888 unique TSA Penguins playing around on the Sandbox TSA Meta & TSA MetaPlay Franchise. The NFTs come in different rarity levels: N (Normal ), R (Rare) & SR ( Super Rare).",
      joinUs: "https://www.teaswap.art/nft/products/vendor/265609",
      when: "When: Ongoing",
      end: new Date(1640942516),
      duration: 6048000,
      sign: NewImg,
    },
    {
      image: GridImg6,
      Learn: "https://www.teaswap.live/tsametaverse",
      LearnText: "Learn > On BNB Chain",
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
      LearnText: "Learn > On BNB Chain",
      author: "TSA Broadway Series Collectibles",
      medium: "https://www.youtube.com/watch?v=6OqBxO0xQT0",
      info: t("iroinfo1"),
      info2: ``,
      joinUs:
        "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0x887Ed22FAF9C4B985ecB019eA54A5185350AE214",
      when: "When: Ended",
      end: undefined,
      duration: 259200,
      sign: EndedImg,
    },
    {
      image: GridImg5,
      Learn: "https://www.caojunnft.com/",
      LearnText: "Learn > On BNB Chain",
      author: "Cao Jun NFT Collectibles",
      medium: "https://www.youtube.com/watch?v=zjgxziqWj3w",
      info: `CaoJun limited edition NFT series. The record price for CaoJun  artist at auction is $1,309,063 USD.`,
      joinUs:
        "/iro/bnb/0x5f99ACF13CAff815DD9cB4A415c0fB34e9F4545b/0xF72ECaD992CebB0138aC13b616199f131F847b04",
      when: "When: Ended",
      end: undefined,
      duration: 259200,
      sign: EndedImg,
    },
  ];

  return (
    <PageWrapper>
      <IncubatorBox />
      <PageWrapper2>
        <div style={{width: '100%', maxWidth: '1320px', marginTop: "75px", position: "relative", textAlign: 'center' }}>
          <div
            style={{
              width: '100%',
              fontSize: 19,
              color: '#474747',
              marginTop: '20px',
              fontWeight: 'bold'
            }}
            >
            Initial Art Offering ("IRO")
          </div>
          <ExternalLink
            style={{
              width: '100%',
              display: 'block',
              marginTop: '20px',
              fontSize: 14,
            }}
            href={'https://www.teaswap.live/info'}>
            TSA Incubator Dashboard
          </ExternalLink>
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
                    if (v.LearnText == "Learn > On Ethereum Mainnet") {
                      window.open("https://www.teaswap.live/penguinpunks");
                    } else if (
                      v.LearnText == "Learn > On Ethereum Mainnet" &&
                      v.author == "The Opportunity for Youth NFT Program"
                    ) {
                      window.open("https://www.teaswap.live/penguinbrother");
                    } else if (
                      v.author === "TSAWeb3 Dictionary Music Mystery Box"
                    ) {
                      window.open("https://www.teaswap.live/tsaweb3music");
                    } else if (
                      v.LearnText == "Learn > On Polygon" &&
                      v.author !== "Who's the Boss?" &&
                      v.author !== "Digital 20/20 POAP"
                    ) {
                      window.open("https://www.teaswap.art/tsp");
                    } else if (v.author == "Digital 20/20 POAP") {
                      window.open("https://www.teaswap.live/poapnft");
                    } else if (v.author == "Who's the Boss?") {
                      window.open("https://www.teaswap.live/whostheboss");
                    } else if (v.author == "TSA Magic Box") {
                      window.open("https://www.teaswap.live/tsa-magicbox");
                    } else if (v.author.startsWith("HotBox")) {
                      window.open("https://www.Xtinct.io");
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
                {/*{v.joinUs === "penguinpunks" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.live/penguinpunks">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {/*{v.joinUs === "Alpha" && (*/}
                {/*  <ExternalLink href="https://alpha.niftykit.com/drops/penguinbrother">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {/*{v.joinUs === "vendor" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.art/nft/products/vendor/265609">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {v.joinUs.startsWith('http') ? (
                  <ExternalLink href={v.joinUs}>
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </ExternalLink>
                ): (
                  <StyledLink to={v.joinUs}>
                    <JoinUs>{t("Join Us")}</JoinUs>
                  </StyledLink>
                )}
                {/*{v.joinUs !== "vendor" &&*/}
                {/*  v.joinUs !== "Alpha" &&*/}
                {/*  v.joinUs !== "penguinpunks" &&*/}
                {/*  v.joinUs !== "tsapenguinpunks" &&*/}
                {/*  v.joinUs !== "Boss" &&*/}
                {/*  v.joinUs !== "poap" &&*/}
                {/*  v.joinUs !== "twd" &&*/}
                {/*  v.joinUs !== "xhb" &&*/}
                {/*  v.joinUs !== "poap2" && (*/}
                {/*    <StyledLink to={v.joinUs}>*/}
                {/*      <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*    </StyledLink>*/}
                {/*  )}*/}
                {/*{v.joinUs === "tsapenguinpunks" && (*/}

                {/*)}*/}
                {/*{v.joinUs == "poap" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.art/poap">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {/*{v.joinUs == "poap2" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.art/poap2">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {/*{v.joinUs == "Boss" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.art/boss">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {/*{v.joinUs == "twd" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.art/twd">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}
                {/*{v.joinUs == "xhb" && (*/}
                {/*  <ExternalLink href="https://www.teaswap.art/xhb">*/}
                {/*    <JoinUs>{t("Join Us")}</JoinUs>*/}
                {/*  </ExternalLink>*/}
                {/*)}*/}

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
        <div style={{width: '100%'}}>
          <Title style={{marginTop: '50px', width: '100%', fontSize: 20, display: 'flex', justifyContent: 'center'}}>
            Note : How to launch your own Web3Social Token ? &nbsp;
            <ExternalLink href={"https://docs.google.com/forms/d/e/1FAIpQLSfA-dOW15tyN6dfyZScvcEmT3lC13K9ThFBTruiFD0wOVsoUQ/viewform"}>
              Apply Now !
            </ExternalLink>
          </Title>
        </div>
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

const Title = styled.h1`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
`;
