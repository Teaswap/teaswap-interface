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
  & p {
    padding: 0;
    margin-left: -5px;
    color: ${COLOR.black};
    min-width: fit-content;
    &:hover {
      color: ${COLOR.hover};
    }
    ${MEDIA_QUERY.md} {
      margin-top: 6px;
      margin-bottom: 6px;
    }
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
