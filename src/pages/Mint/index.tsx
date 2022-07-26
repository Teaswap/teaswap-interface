import React, { useEffect, useState } from 'react'
import { ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import {MEDIA_QUERY} from '../../constants/style';
import { NavLink } from 'react-router-dom'
import useUser from '../../hooks/userHooks/useUser';
import ConSubTitle from '../../components/Content/SubTitle';
import { useTranslation } from 'react-i18next';
import { useActiveWeb3React } from '../../hooks';
import WalletSwitch from '../../WalletSwitch';

const List = ()=>{
  const { chainId } = useActiveWeb3React()
  console.log('VendorBackstagePage chainId', chainId)

  const { handleGetMe } = useUser();
  const [mintUrl, setMintUrl] = useState("/nft/users/apply")
  const [minted, setMinted] = useState(false)
  const {t} = useTranslation();
  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (result && result.data && result.data.is_vendor)  {
        setMinted(true)
        return setMintUrl('/nft/products/post');
      }
    });
  }, []);

  return (
    <PageWrapper >
      <WalletSwitch />
      <img className="page-banner" src={process.env.PUBLIC_URL + '/mint_banner.png'} width="100%" />
      <Title>
        <StyledLink to={mintUrl}>
          {t('Create')}
        </StyledLink>
        {minted && (
          <StyledLink className="CreateButton" to='/nft/users/backstage'>
           {t('My Account')}
          </StyledLink>
        )}
       
      </Title>
      
      <ConSubTitle con="Featured Artist Application" />
        {/* <StyledLink href="https://docs.google.com/forms/d/e/1FAIpQLSeDP0KdH1VC9v9G-D97SUX1ykcOOkMR_ff9OX5je-g1Qw8ePw/viewform"> */}
         
        {/* </StyledLink> */}
    </PageWrapper>
  )
};
export default List;

const PageWrapper = styled(ColumnCenter)`
  text-align: center;
  width: 100%;
  ${MEDIA_QUERY.sm} {
  }
`
const StyledLink = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 17px;
  background-color: #7f7f7f;
  padding: 10px 0px;
  width: 240px;
  margin: 0 20px;
  display: inline-block;
  :hover {
    text-decoration: none;
    color: #ffffff;
    background-color: #474747;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: #ffffff;
  }

  :active {
    text-decoration: none;
    color: #ffffff;
  }

  :visited {
    color: #ffffff;
  }
`
const Title = styled.p`
  font-size: 32px;
  text-align: center;
  margin-top: 40px;
`
// const SubTitle = styled.p`
//   font-size: 20px;
//   text-align: center;
// `

