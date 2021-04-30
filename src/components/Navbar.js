import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Nav, NormalButton } from './NFTButton';
import { User, Cart, Notification } from './navbarSystem';
import { Logo, SearchBar, CategoryItemBox } from '../components';
import { useLocation } from 'react-router-dom';
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

const NavbarContainer = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  margin: 0 auto;
  height: ${(props) => (props.$size === 'sm' ? '65px' : '135px')};
  background: #fcfcfc;
  padding: 25px 0;
  z-index: 99;
  ${MEDIA_QUERY.lg} {
    height: ${(props) => (props.$size === 'sm' ? '65px' : '165px')};
    padding: 10px 0;
  }
  ${MEDIA_QUERY.sm} {
    height: ${(props) => (props.$size === 'sm' ? '65px' : '115px')};
    padding: 10px 0;
  }
`;

const NavbarTop = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const NavbarBottom = styled.div`
  display: flex;
  justify-content: left;
  margin-left: 210px;
  flex-wrap: wrap;
  ${MEDIA_QUERY.lg} {
    margin-left: 0;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  ${MEDIA_QUERY.md} {
    display: none;
    margin-left: 10px;
  }
`;

const RightSide = styled.div`
  margin-right: 90px;
  ${MEDIA_QUERY.md} {
    margin-right: 20px;
  }
`;

const OptionList = styled.div`
  display: flex;
  align-items: center;
  ${MEDIA_QUERY.md} {
    display: none;
  }
`;

const Empty = styled.div`
  width: 90px;
`;

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

  return (
    <NavbarContainer
      $size={
        currentPath === '/nft' || currentPath.includes('products') ? '' : 'sm'
      }
    >
      <NavbarTop>
        <LeftSide>
          <Logo />
          <SearchBar />
        </LeftSide>

        <RightSide>
          <OptionList>
            {isAdmin && <Nav children={'管理後台'} path={'/admin'} />}
            {userId && (
              <>
                <User />
                <Cart />
                <Notification />
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
        </RightSide>
      </NavbarTop>

      {(currentPath === '/nft' || currentPath.includes('products')) && (
        <NavbarBottom>
          {productCategories.map((category) => (
            <CategoryItemBox
              text={category.name}
              id={category.id}
              key={category.id}
            />
          ))}
        </NavbarBottom>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
