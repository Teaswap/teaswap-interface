import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setPage,
  setProducts,
  setSort,
  selectVendorInfo,
  selectCreator,
  selectSort,
  selectProductCount,
  selectProductCategories,
  selectProduct,
  selectProductCarts,
  selectProductOrders,
  selectProducts,
  selectPage,
  selectCategory,
  selectErrorMessage,
  searchProduct,
  getProduct,
  getProducts,
  getProductCategories,
  getProductsFromCategory,
  getProductsFromVendor,
  getUserById,
  selectUserCreated,
  selectUserSold,
  likeProduct,
} from '../../redux/slices/productSlice/productSlice';

import { tokenOptions} from "../../constants";

import {useMultipleContractSingleData} from "../../state/multicall/hooks";
import {STAKING_REWARDS_INTERFACE} from "../../constants/abis/staking-rewards";
import {BUSD, CJAI, NFTEXCHANGE, SHIH, UNI, ZERO_ADDRESS,BETH} from "../../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import { setErrorMessage } from '../../state/user/actions';


function averageTime(count, products) {
  let totalTime = 0;
  for (let i = 0; i < count; i++) {
    totalTime += products[i].delivery_time;
  }
  return Math.ceil(totalTime / count);
}

export default function useProduct() {
  const [isShowContact, setIsShowContact] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const vendorInfo = useSelector(selectVendorInfo);
  const Creator = useSelector(selectCreator);
  const productCategories = useSelector(selectProductCategories);
  const product = useSelector(selectProduct);
  const productCarts = useSelector(selectProductCarts);
  const productOrders = useSelector(selectProductOrders);
  const products = useSelector(selectProducts);
  const productCount = useSelector(selectProductCount);
  const userCreated = useSelector(selectUserCreated);
  const userSold = useSelector(selectUserSold);
  const category = useSelector(selectCategory);
  const productErrorMessage = useSelector(selectErrorMessage);
  const averageShippingTime = averageTime(products.length, products);
  const sort = useSelector(selectSort);

  const handleClick = () => {
    setIsShowContact(true);
  };

  const onLoad = () => {
    setLoaded(true);
  };

  const getLeftCountForProduct = ({length, limit}) => {
    limit = limit || 9;
    const leftCount = limit % length
    return leftCount
  }

  // const handleGETHasNFT = (string) => {
  //   const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  //   const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')
  // }

  const handleGetProduct = (id, page) => {
    dispatch(setPage(page));
    (getProduct(id)(dispatch)).then((res) => {
      if (!res.product || ![0, 1, 3].includes(Number(res.product.status))) {
        return navigate('/');
      }
      (getProductsFromVendor(res.vendorInfo.id, page, 4)(dispatch)).then(
        (products) => {
          console.log('getProductsFromVendor', products)
          let tempProducts = []
          if (products && products.length > 0){
            tempProducts = products.filter((product) => {
              return product.id !== Number(id);
            });
            if (tempProducts.length > 3) {
              tempProducts.pop();
            }
          }
          console.log('getProductsFromVendor tempProducts', tempProducts)
          return dispatch(setProducts(tempProducts));
        }
      );
    });
  };

  const handleGetProducts = (page, artworkType, catId, extoken) => {
    dispatch(setPage(page));
    getProducts(page, artworkType, catId, extoken)(dispatch);
  };

  const handleLikeProduct = (id) => {
    likeProduct(id)(dispatch);
  };

  const handleGetProductCategories = () => getProductCategories()(dispatch);

  const handleGetSearchProduct = (keyword, page) => {
    dispatch(setPage(page));
    searchProduct(keyword, page)(dispatch);
  };

  const handleGetProductFromCategory = (id, page) => {
    dispatch(setPage(page));
    getProductsFromCategory(id, page)(dispatch);
  };

  const handleGetProductsFromVendor = (id, page, type) => {
    setErrorMessage('')
    dispatch(setPage(page));
    (getProductsFromVendor(id, page, 9, type)(dispatch)).then((res) => {
      if (res.message === 'not a Vendor') navigate('/nft');
    });
  };

  const handleGetProductsMoreButton = () => {
    dispatch(setPage(page + 1));
    getProducts(page + 1)(dispatch);
  };

  const handleSearchProductMoreButton = (keyword) => {
    dispatch(setPage(page + 1));
    searchProduct(keyword, page + 1, sort)(dispatch);
  };

  const handleVendorProductMoreButton = (id) => {
    dispatch(setPage(page + 1));
    dispatch(getProductsFromVendor(id, page + 1, 10)).then((res) => {
      if (res.message === 'not a vendor') navigate('/nft');
    });
  };

  const handleCategoryProductMoreButton = (id) => {
    dispatch(setPage(page + 1));
    getProductsFromCategory(id, page + 1, sort)(dispatch);
  };

  const handleChangeProductSort = (id, sort, page) => {
    dispatch(setPage(page));
    dispatch(setProducts([]));
    dispatch(setSort(sort));
    currentPage.includes('/category')
      ? getProductsFromCategory(id, page, sort)(dispatch)
      : searchProduct(id, page, sort)(dispatch);
  };

  const handleGetUserById = (id) => {
    getUserById(id)(dispatch);
  };
  
  const handleTokenSwitch = (extoken) => {

    if (!extoken) return;



    let extokenName = 'TSA'
    for(let i = 0 ;i<tokenOptions.length;i++){
        if(tokenOptions[i].value === extoken){
            extokenName=tokenOptions[i].name
            break
        }
    }
    return extokenName
  }

  return {
    page,
    loaded,
    isShowContact,
    vendorInfo,
    Creator,
    productCategories,
    averageShippingTime,
    product,
    productCarts,
    productOrders,
    products,
    category,
    productCount,
    userCreated,
    userSold,
    productErrorMessage,

    setPage,
    setProducts,
    setLoaded,
    setIsShowContact,

    onLoad,
    handleClick,
    handleGetProducts,
    handleGetProduct,
    handleGetSearchProduct,
    handleGetProductsMoreButton,
    handleSearchProductMoreButton,
    handleVendorProductMoreButton,
    handleCategoryProductMoreButton,
    handleGetProductCategories,
    handleGetProductFromCategory,
    handleGetProductsFromVendor,
    handleChangeProductSort,
    handleGetUserById,
    handleTokenSwitch,
    getLeftCountForProduct,
    handleLikeProduct
  };
}
