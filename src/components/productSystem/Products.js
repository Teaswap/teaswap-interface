import React from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE,EFFECT } from '../../constants/style';
import { MoreButton, ErrorMessage } from '../../components/productSystem/';
import useProduct from '../../hooks/productHooks/useProduct';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectProductCount,
  selectProducts,
} from '../../redux/slices/productSlice/productSlice';
import { TYPE } from '../../theme';

const ProductsContainer = styled.div`
  padding: 0; 
`;

const ProductsWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) => props.$justify || 'center'};
`;

const ProductContainer = styled.div`
  width: ${(props) => props.$height || '450px'};
  border-width: 0 0 0 0;
  border-style: solid solid solid solid;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 20px;
  font-size: 15px;
  color: #000000;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px; 
`;

const Placeholder = styled.div`
  width: ${(props) => props.$width || '450px'};
  margin: ${(props) => props.$margin || '0 20px'};
`;

const ProductPicture = styled.img`
  position: relative;
  width: ${(props) => props.$width || '100%'};
  transition: opacity 0.2s;
  cursor: pointer;
`;

const ProductName = styled.div`
  width: 90%;
  text-align: left;
  margin-top: ${DISTANCE.md};
  cursor: pointer;
}
`;

const VendorName = styled.div`
  margin-top: ${DISTANCE.sm};
  width: 90%;
  text-align: left;
  cursor: pointer;

`;

const ProductPrice = styled.div`
  margin-top: 5px;
  width: 90%;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledLink = styled.a`
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
`

const Product = ({ product, onLoad, loaded, $width, $height, $margin }) => {
  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return (
    <ProductContainer $width={$width} $height={$height} $margin={$margin}>
      <StyledLink href={`/nft/products/${product.id}`}>
        <ProductPicture
          src={product.picture_url}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={onLoad}
          $width={$width}
          $height={$height}
        />
      </StyledLink>
      <ProductName>
        <StyledLink href={`/nft/products/${product.id}`}>
          <TYPE.gray fontSize={15}>
            {product.name}
          </TYPE.gray>
        </StyledLink>
      </ProductName>
      <VendorName>
        {/* <StyledLink href={`/nft/products/vendor/${product.User.id}`}> */}
          <TYPE.darkGray fontSize={14}>
            {product.info}
          </TYPE.darkGray>
        {/* </StyledLink> */}
      </VendorName>
      <ProductPrice>
        <TYPE.darkGray fontSize={14}>
          {product.remark}
        </TYPE.darkGray>
      </ProductPrice>
    </ProductContainer>
  );
};

export const Products = ({
  products,
  id,
  handler,
  productErrorMessage,
  $width,
  $height,
  $margin,
  $padding,
  $justify,
}) => {
  const { loaded, onLoad } = useProduct();
  const productsArray = useSelector(selectProducts);
  const productCount = useSelector(selectProductCount);
  return (
    <>
      <ProductsContainer $padding={$padding}>
        <ProductsWrap $justify={$justify}>
          <>
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  onLoad={onLoad}
                  loaded={loaded}
                  $width={$width}
                  $height={$height}
                  $margin={$margin}
                />
              );
            })}
          </>
          <Placeholder $width={$width} $margin={$margin} />
          <Placeholder $width={$width} $margin={$margin} />
          <Placeholder $width={$width} $margin={$margin} />
          <Placeholder $width={$width} $margin={$margin} />
        </ProductsWrap>
      </ProductsContainer>

      {productCount - productsArray.length <= 0 ? (
        <></>
      ) : (
        <>{handler && <MoreButton id={id} handler={handler} />}</>
      )}

      {productErrorMessage && (
        <ErrorMessage productErrorMessage={productErrorMessage} />
      )}
    </>
  );
};
