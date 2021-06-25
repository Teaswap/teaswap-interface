import React, { useState } from 'react';
import styled from 'styled-components';
import { EFFECT, COLOR, MEDIA_QUERY } from '../constants/style';
import { IconComponent } from '../components';
import { InputSearch } from './Input';
import { useLocation, useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import { BsSearch } from 'react-icons/bs';

const SearchBarContainer = styled.div`
  cursor: pointer;
  display: flex;F
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 32px;
  border-radius: 0px;
  margin-left: 140px;
  box-shadow: ${EFFECT.shadowLight};
  :hover{
    border: 1px solid #474747;
  }
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

  return (
    <SearchBarContainer>
      <SearchArea>
        <BsSearch size="15" color="#7f7f7f" />
        <InputSearch
          value={value}
          onChange={handleChangeInput}
          placeholder={t('Search')}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && value !== '') {
              handleSearchProduct(value);
            }
          }}
        />
      </SearchArea>
      <IconComponent kind={'angle-down'} />
    </SearchBarContainer>
  );
};

export default SearchBar;
