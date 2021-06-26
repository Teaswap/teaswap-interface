import React, {useState} from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, MEDIA_QUERY } from '../../constants/style';
import { MoreButton, ErrorMessage } from '../../components/productSystem/';
import { Nav, ActionButton2 } from '../NFTButton';
import useProduct from '../../hooks/productHooks/useProduct';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Modal from '../../components/Modal'

const ProductsContainer = styled.div`
  padding: 0px 10px 50px 10px;
`;

const ProductsWrap = styled.div`
`;

const ProductContainer = styled.div`
  position: relative;
  padding: 20px;
  margin: 40px 20px;
  width: calc(90% - 40px);
  max-width: 380px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 16px 24px rgba(0, 0, 0, 0.1),  0px 24px 32px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY.sm} {

  }
`;

const Placeholder = styled.div`
  width: ${(props) => props.$width || '190px'};
  margin: ${(props) => props.$margin || '0 20px'};
`;

const ProductPicture = styled.img`
  position: relative;
  width: 100%;
  margin: 20px 0;
  // height: ${(props) => props.$height || '190px'};
  transition: opacity 0.2s;
  cursor: pointer;
`;

const ProductName = styled.div`
  margin-top: ${DISTANCE.md};
  text-align: left;
  cursor: pointer;
}
  a {
    display: block;
    font-size: ${FONT.xs};
    color: ${COLOR.black};
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
`;

const VendorName = styled.div`
  margin-top: ${DISTANCE.sm};
  text-align: left;
  cursor: pointer;
  a {
    display: block;
    font-size: ${FONT.xs};
    color: ${COLOR.text_2};
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
`;

const ProductPrice = styled.div`
  margin-top: 5px;
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  text-align: left;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Product = ({ product, onLoad, loaded, $width, $height, $margin }) => {
  const {handleTokenSwitch} = useProduct();
  const formatter = new Intl.NumberFormat();
  const {t} = useTranslation();
  const [isProof, setIsProof] = useState(false)
  const [isPrice, setIsPrice] = useState(false)

  const dismissProof = () => {
    setIsProof(false)
  }

  const dismissPrice = () => {
    setIsPrice(false)
  }

  return (
    <ProductContainer $width={$width} $height={$height} $margin={$margin}>
      <ButtonContainer>
        {/* <NavLink className="a-link" to={`/nft/products/edit/${product.id}`}>
          {t('Edit NFT')}
        </NavLink> */}
        {product.status != '1' && (
          <span onClick={() => {
            setIsProof(true)
          }} className="short-btn">{t("Proof")}</span>
        )}
        <span style={{marginLeft: '10px', color: '#7f7f7f'}}>{product.status == '1' ? 'My Artwork' : 'Pending'}</span>
        <span onClick={() => {
          setIsPrice(true)
        }} className="short-btn">{t("Set Price")}</span>
      </ButtonContainer>
      {product.status == '1' && (
        <NavLink style={{marginTop: '20px', display:"block"}} to={`/nft/products/${product.id}`}>
          <ProductPicture
            src={product.picture_url}
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={onLoad}
            $width={$width}
            $height={$height}
          />
        </NavLink>
      )}
      {product.status !== '1' && (
        <ProductPicture
          src={product.picture_url}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={onLoad}
          $width={$width}
          $height={$height}
        />
      )}
      
      <ProductName>
        <NavLink className="a-link" to={`/nft/products/${product.id}`}>{product.name}</NavLink>
      </ProductName>
      <VendorName>
        <NavLink className="a-link" to={`/nft/products/vendor/${product.User.id}`}>
          {product.User.nickname}
        </NavLink>
      </VendorName>
      {/* <ProductPrice>{formatter.format(product.price)}</ProductPrice> */}
      <ProductPrice>
        {formatter.format(product.price)} 
        <span style={{fontSize: '9px'}}>{' ' + handleTokenSwitch(product.extoken)}</span>
    </ProductPrice>
    <Modal isOpen={isProof} onDismiss={dismissProof} maxHeight={90}>
      <div className="new-modal">
        <p>确定上架</p>
        <div className="modal-btns">
          <span className='btn-sm-100 btn-primary'>{t("Confirm")}</span>
          <span className='btn-sm-100 btn-primary' onClick={dismissProof}>{t("Cancel")}</span>
        </div>
      </div>
    </Modal>
    <Modal className="new-modal" isOpen={isPrice} onDismiss={dismissPrice} maxHeight={90}>
      <div className="new-modal">
        <p>输入价格</p>
        <input type="text" className="input-primary" />
        <div className="modal-btns">
          <span className='btn-sm-100 btn-primary'>{t("Confirm")}</span>
          <span className='btn-sm-100 btn-primary' onClick={dismissPrice}>{t("Cancel")}</span>
        </div>
      </div>
    </Modal>
    </ProductContainer>
  );
};

export default function Products({
  products,
  id,
  handler,
  productErrorMessage,
  filter,
  productId,
  $width,
  $height,
  $margin,
  $padding,
  $justify,
}) {
  const { loaded, onLoad } = useProduct();
  return (
    <>
      <ProductsContainer $padding={$padding}>
        <ProductsWrap className="auto-list-div">
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
      {/* {loaded && !productErrorMessage ? (
        <MoreButton
          id={id}
          products={products}
          handler={handler}
        />
      ) : (
        <ErrorMessage productErrorMessage={productErrorMessage} />
      )} */}
    </>
  );
}
