import React from 'react'
import styled from 'styled-components'

const Banner = styled.img`
  width: 100vw;
`
const Main = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`
const Title = styled.div`
  color: #7f7f7f;
  font-size: 27px;
  margin-top: 30px;
`

const Con = styled.div`
  color: #7f7f7f;
  font-size: 16px;
  margin-top: 20px;
`

const SubTitle = styled.div`
  color: #333333;
  font-size: 18px;
  margin-top: 50px;
`

const Index = ()=>{

  return (
    <>
      <Banner src={process.env.PUBLIC_URL + '/photo_2022-01-27_17-18-44.jpg'} alt="" />
      <Main>
        <Title>
          ABOUT THIS COLLECTION
        </Title>
        <SubTitle>
          TSA Penguin Punks
        </SubTitle>
        <Con>
        TSA MetaPlay is excited to present 12,888 special Limited Edition Penguin Punk NFTs ( R 100 + N )  to celebrate a new era of NFT. Every Penguin in the TSA MetaPlay is unique and programmatically -generated from over 120 possible traits. Some traits are rarer than others. 
        </Con>
        <Con>
        Each PenguinPunk  functions as your entrance to access to TSAMetaPlay GameFi Franchise, this NFT can be staked in the TSA NFT Stake Pool and earn up to a 5K $TSA Shared Pool per week! TSA MetaPlay GameFi Franchise will be launching on Sandbox, Dvision and TSA MetaPlay Park.
        </Con>
        <Con>
          PenguinPunk NFT that you buy from OpenSea Marketplace can later be sold on other marketplace like TSA NFT Marketplace, Treasureland,  without our approval, and with the same wallet.
        </Con>
        <Con>
        Preview: https://www.teaswap.art/nft/
        </Con>
        <Con>
        NFT Staking: https://teaswap.art/staking
        </Con>
        <Con>
        Join TSA Community Library Channel Discord :https://discord.gg/49xUD5NCGD Contact: support@tsanft.io
        </Con>
      </Main>
    </>
  )
};
export default Index;