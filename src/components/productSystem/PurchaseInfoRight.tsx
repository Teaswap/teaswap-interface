import React from 'react';
import styled from 'styled-components';
import { ProductInfo, VendorIntro } from '../../components/productSystem';
import { MEDIA_QUERY } from '../../constants/style';
const PurchaseInfoRightContainer = styled.section`
  margin-left: 100px;
  width: calc(50% + -40px);

  ${MEDIA_QUERY.lg} {
    width: 100%;
    margin-left: 0;
  }
`;

export interface userInterface {
    id:number
    username?: string,
    password?: string,
    nickname?: string,
    email?: string,
    address?: string,
    is_admin?: boolean,
    is_vendor?: boolean,
    announcement?: string,
    account?: string,
    socialmedia_id?: string,
    birthday?: number,
    id_card_no?: string,
    avatar_url?: string,
    banner_url?: string,
    status?: number,
    deletedAt?: number,
}

export interface cateInterface{
    id:number,
    name:string
}

export interface userMiniInterface {
    id:number,
    username: string,
    nickname: string,
    address: string
}

export interface ProductInterface{
    id:number,
    Product_category:cateInterface,
    name: string,
    picture_url: string,
    info: string,
    UserId:number,
    price: number,
    quantity: number,
    delivery: number,
    delivery_location: string,
    delivery_time: number,
    payment_method: number,
    royalty:number,
    extoken:string,
    media_type:string,
    remark: string,
    tokenId: string,
    orderId: string,
    status: number,
    createdAt:string,
    sale_copyright: number,
    views: number,
    likes: number,
}

interface infoRightProps {
    product:ProductInterface,
    products:ProductInterface[],
    id:number,
    productErrorMessage:string,
    vendorInfo:userInterface,
    user:userMiniInterface
};

export const PurchaseInfoRight = ({
  product,
  products,
  id,
  productErrorMessage,
  vendorInfo,
    user
}:infoRightProps) => {
  return (
    <PurchaseInfoRightContainer>
      <ProductInfo product={product} user={user}/>
      <VendorIntro
        products={products}
        id={id}
        vendorInfo={vendorInfo}
        productErrorMessage={productErrorMessage}
      />
    </PurchaseInfoRightContainer>
  );
};
