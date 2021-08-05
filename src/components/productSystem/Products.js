import React from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE,EFFECT, MEDIA_QUERY } from '../../constants/style';
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
  justify-content: space-between;
  ${MEDIA_QUERY.sm}{
    justify-content: center;
  }
`;

const ProductContainer = styled.div`
  width: 30.333333%;
  ${MEDIA_QUERY.lg} {
    width: 45%;
    margin: 0 2.5%;
  }
  ${MEDIA_QUERY.md} {
    width: 60%;
    margin: 0 20%;
  }
  ${MEDIA_QUERY.sm}{
    width: 90%;
    margin: 0;
  }
  margin-top: 50px;
  border-width: 0 0 0 0;
  border-style: solid solid solid solid;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  overflow: hidden;
  transform: translateZ(0);
  font-size: 15px;
  color: #000000;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px; 
  text-align: center;
`;

const Placeholder = styled.div`
  width: ${(props) => props.$width || '311px'};
  margin: ${(props) => props.$margin || '0 20px'};
`;

const ProductPicture = styled.img`
  position: relative;
  height: 450px;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.2s;
  cursor: pointer;
`;

const ProductName = styled.div`
  width: 95%;
  font-size: 12px;
  text-align: left;
  margin-top: 10px;
  cursor: pointer;
  color: #7f7f7f;
}
`;

const VendorName = styled.div`
  margin-top: 10px;
  width: 95%;
  font-size: 12px;
  color: #7f7f7f;
  text-align: left;
  cursor: pointer;

`;

const ProductPrice = styled.div`
  margin-top: 5px;
  width: 95%;
  text-align: left;
  margin-bottom: 10px;
`;

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
`

export const Product = ({ product, onLoad, loaded, $width, $height, $margin }) => {
  const {handleTokenSwitch} = useProduct();
  const formatter = new Intl.NumberFormat();
  return (
    <ProductContainer $width={$width} $height={$height} $margin={$margin}>
      {product.link && (
        <NavLink to={product.link}>
          <ProductPicture
            src={product.picture_url}
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={onLoad}
            $width={$width}
            $height={$height}
          />
        </NavLink>
      )}
      {!product.link && (
        <NavLink to={`/nft/products/${product.id}`}>
          <ProductPicture
            src={product.picture_url}
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={onLoad}
            $width={$width}
            $height={$height}
          />
        </NavLink>
      )}

      <ProductName>
        {product.title}
        {(product.number) && (
          ' | ' + product.number
        )}
      </ProductName>
      <VendorName>
        {product.name}
      </VendorName>
      {(product.desc) &&
        (
          <VendorName>
            {product.desc}
          </VendorName>
        )
      }
      {product.price && (<ProductPrice>
        <TYPE.darkGray fontSize={12}>
        {product.price} 
        <span style={{fontSize: '9px'}}>{' ' + handleTokenSwitch(product.extoken)}</span>
        </TYPE.darkGray>
      </ProductPrice>)
      }
    </ProductContainer>
  );
};


export const Products = ({
  products,
  productErrorMessage,
  $width,
  $height,
  $margin,
  $padding,
  $justify,
}) => {
  const { loaded, onLoad, getLeftCountForProduct } = useProduct();
  const productsArray = useSelector(selectProducts);
  const productCount = useSelector(selectProductCount);
  const appendPros = []
  const leftCount = getLeftCountForProduct({length: products.length})
  for(let i = 0; i < leftCount; i++) {
    appendPros.push(<Placeholder $width={$width} $margin={$margin} />)
  }
  console.log('appendPros', leftCount, appendPros)

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
            {appendPros}
          </>
        </ProductsWrap>
      </ProductsContainer>

      {/* {productCount - productsArray.length <= 0 ? (
        <></>
      ) : (
        <>{handler && <MoreButton id={id} handler={handler} />}</>
      )} */}

      {productErrorMessage && (
        <ErrorMessage productErrorMessage={productErrorMessage} />
      )}
    </>
  );
};
