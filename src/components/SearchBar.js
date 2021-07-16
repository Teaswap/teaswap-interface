import React, { useState } from 'react';
import styled from 'styled-components';
import { EFFECT, COLOR, MEDIA_QUERY } from '../constants/style';
import { IconComponent } from '../components';
import { InputSearch } from './Input';
import { useLocation, useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import { BsSearch } from 'react-icons/bs';

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 220px;
  height: 32px;
  border-radius: 0px;
  & div {
    display: flex;
    align-items: center;
  }
  ${MEDIA_QUERY.md} {
    display: none;
  }
`;

const SearchArea = styled.div`
  width: 90%;
  padding-left: 10px;
`;

const SearchBar = () => {
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const handleChangeInput = (e) => setValue(e.target.value);
  const handleSearchProduct = (keyWord) => {
    if (location.pathname.includes('search')) {
      navigate(`/nft/products/search/${keyWord}`);
      window.location.reload();
    }
    navigate(`/nft/products/search/${keyWord}`);
    setValue('');
  };
  const [searchBarWidth, setSearchBarWidth] = useState('0');
  const [searchBarDisplay, setSearchBarDisplay] = useState('none');

  return (
    <SearchBarContainer>
        <InputSearch
          id="search-bar"
          style={{
            width: searchBarWidth,
            display: searchBarDisplay
          }}
          value={value}
          onChange={handleChangeInput}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && value !== '') {
              handleSearchProduct(value);
            }
          }}
        onBlur={() => () => {
          setSearchBarWidth('0')
          setSearchBarDisplay('none')
        }}
        />
        <BsSearch onClick={() => {
          if (searchBarWidth == '0') {
            setSearchBarWidth('100%')
            setSearchBarDisplay('inline-block')
          }else{
            setSearchBarWidth('0')
            setSearchBarDisplay('none')
          }
        }} size="17" style={{marginLeft: '-30px', cursor: 'pointer'}} color="#7f7f7f" />
    </SearchBarContainer>
  );
};

export default SearchBar;
