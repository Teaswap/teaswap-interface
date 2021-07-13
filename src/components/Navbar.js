import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Nav, NormalButton } from './NFTButton';
import { User } from './navbarSystem';
import { Logo, SearchBar, CategoryItemBox } from '../components';
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../hooks/userHooks/useUser';
import useProduct from '../hooks/productHooks/useProduct';
import useLogout from '../hooks/userHooks/useLogout';
import { MEDIA_QUERY } from '../constants/style';
import {
  selectUserId,
  selectIsUserLoading,
} from '../redux/slices/generalSlice/generalSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice/userSlice'
import IconComponent from './Icon';


const NavbarContainer = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 80px;
  height: ${(props) => (props.$size === 'sm' ? '65px' : '135px')};
  background: #fcfcfc;
  padding: 25px;
  ${MEDIA_QUERY.lg} {
    height: ${(props) => (props.$size === 'sm' ? '65px' : '165px')};
    padding: 10px;
  }
  ${MEDIA_QUERY.sm} {
    height: ${(props) => (props.$size === 'sm' ? '65px' : '200px')};
    padding: 10px;
    margin: 20px 0;
  }
`;

const NavbarTop = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const NavbarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${MEDIA_QUERY.lg} {
    margin-left: 0;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  ${MEDIA_QUERY.md} {
    display: none;
  }
`;

const RightSide = styled.div`
  display; flex;
  ${MEDIA_QUERY.md} {
  }
`;

const OptionList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${MEDIA_QUERY.md} {
    display: none;
  }
`;

const Empty = styled.div`
  width: 90px;
`;

const CatTitle = styled.span`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  ${MEDIA_QUERY.sm}{
    display: none;
  }
`

const H5Cart = styled.span`
  display: none;
  ${MEDIA_QUERY.sm}{
    display: block;
  }
  position: absolute;
  right: 30px;
  top: 3px;
`

const Navbar = () => {
  const location = useLocation();
  const { setWalletUser } = useUser();
  const { walletUser } = useUser();
  const { productCategories, handleGetProductCategories } = useProduct();
  const { handleLogout } = useLogout();
  const currentPath = location.pathname;
  const userId = useSelector(selectUserId);
  const isUserLoading = useSelector(selectIsUserLoading);
  const [isAdmin, setIsAdmin] = useState(false);
  const { handleGetMe } = useUser();
  const user = useSelector(selectUser);

  const handleClickLogout = () => {
    handleLogout();
    setIsAdmin(false);
  };

  useEffect(() => {
    if (currentPath === '/nft' || currentPath.includes('products')) {
      handleGetProductCategories();
    }
    handleGetMe().then((result) => {
      if (!result || result.ok === 0 || !result.data) return;
      setIsAdmin(result.data.is_admin);
    });
  }, []);

  useEffect(() => {
    if(user){
      setIsAdmin(user.is_admin);
    }

  }, [user]);

  const navigate = useNavigate();

  return (
    <NavbarContainer
      $size={
        currentPath === '/nft' || currentPath.includes('products') ? '' : 'sm'
      }
    >
      <NavbarTop>
        {/* <LeftSide>
          <Logo />
        </LeftSide> */}
        <CatTitle className="all-category-title">Categories</CatTitle>
        <RightSide>
          <H5Cart>
            <IconComponent kind={'shopping-cart'}></IconComponent>
          </H5Cart> 
          <OptionList>
            {/* {isAdmin && <Nav children={'管理後台'} path={'/nft/admin'} />} */}
            {userId && (
              <>
                <User />
                {/* <Cart /> */}
                {/* <Notification /> */}
              </>
            )}
            {/*{isUserLoading ? (*/}
            {/*  <Empty />*/}
            {/*) : (*/}
            {/*  <>*/}
            {/*    {userId && (*/}
            {/*      <NormalButton children='登出' onClick={handleClickLogout} />*/}
            {/*    )}*/}
            {/*    {!userId && <Nav children={'登入 / 註冊'} path={'/entrance'} />}*/}
            {/*  </>*/}
            {/*)}*/}
          </OptionList>
          <SearchBar />
        </RightSide>
      </NavbarTop>

      {(currentPath === '/nft' || currentPath.includes('products')) && (
        <NavbarBottom>
          <div className="nft-category">
            {productCategories.map((category) => (
              <CategoryItemBox
                text={category.name}
                id={category.id}
                key={category.id}
              />
            ))}
          </div>
        </NavbarBottom>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
