import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IconComponent } from '../components';
import { COLOR, EFFECT } from '../constants/style';
import { MEDIA_QUERY } from '../constants/style';

const ProductCategoryItem = styled.li`
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  float: left;
  min-width: 127px;
  height: 40px;
  padding: 10px;
  box-shadow: 3px 3px 2px rgb(0 0 0 / 7%);
  color: ${COLOR.gray};
  & p {
    width: 100%;
    padding: 0;
    text-align: center;
    min-width: fit-content;
    &:hover {
      color: ${COLOR.dark_gray};
    }
    ${MEDIA_QUERY.md} {
      margin-top: 6px;
      margin-bottom: 6px;
    }
  }
  :hover{
    color: ${COLOR.dark_gray};
    box-shadow: 3px 3px 2px rgb(0 0 0 / 17%);
  }
  a{
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
  }
`;

const CategoryItemBox = ({ text, id }) => {
  const navigate = useNavigate();
  const handleGetProductFromCategory = (id) => {
    navigate(`/nft/products/category/${id}`);
  };
  return (
    <ProductCategoryItem onClick={() => handleGetProductFromCategory(id)}>
      <p>{text}</p>
    </ProductCategoryItem>
  );
};

export default CategoryItemBox;
