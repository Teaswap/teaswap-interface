import React, { useEffect, useState } from 'react'
import { ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import {MEDIA_QUERY} from '../../constants/style';
import { NavLink } from 'react-router-dom'
import useUser from '../../hooks/userHooks/useUser';

const List = ()=>{
  const { handleGetMe } = useUser();
  const [mintUrl, setMintUrl] = useState("/nft/users/apply")
  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (result && result.data && result.data.is_vendor) return setMintUrl('/nft/products/post');
    });
  }, []);

  return (
    <PageWrapper >
      <img className="page-banner" src={process.env.PUBLIC_URL + '/mint_banner.png'} width="100%" />
      <Title>
        <StyledLink to={mintUrl}>
          Click & Mint Now!
        </StyledLink>
      </Title>
      {/* <SubTitle>
        <StyledLink href="https://docs.google.com/forms/d/e/1FAIpQLSeDP0KdH1VC9v9G-D97SUX1ykcOOkMR_ff9OX5je-g1Qw8ePw/viewform">
          Featured Artist Application 
        </StyledLink>
      </SubTitle> */}
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
  font-weight: 500;
  color: #474747;

  :hover {
    text-decoration: none;
    color: #474747;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: #474747;
  }

  :active {
    text-decoration: none;
    color: #474747;
  }

  :visited {
    color: inherit;
    color: #474747;
  }
`
const Title = styled.p`
  font-size: 32px;
  text-align: center;
`
// const SubTitle = styled.p`
//   font-size: 20px;
//   text-align: center;
// `

