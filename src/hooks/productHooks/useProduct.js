import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setPage,
  setProducts,
  setSort,
  selectVendorInfo,
  selectSort,
  selectProductCount,
  selectProductCategories,
  selectProduct,
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
} from '../../redux/slices/productSlice/productSlice';
import {useMultipleContractSingleData} from "../../state/multicall/hooks";
import {STAKING_REWARDS_INTERFACE} from "../../constants/abis/staking-rewards";
import {BUSD, CJAI, NFTEXCHANGE, SHIH, UNI, ZERO_ADDRESS} from "../../constants";
import {ChainId} from "@teaswap/uniswap-sdk";

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
  const productCategories = useSelector(selectProductCategories);
  const product = useSelector(selectProduct);
  const products = useSelector(selectProducts);
  const productCount = useSelector(selectProductCount);
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

  // const handleGETHasNFT = (string) => {
  //   const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  //   const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')
  // }

  const handleGetProduct = (id, page) => {
    dispatch(setPage(page));
    (getProduct(id)(dispatch)).then((res) => {
      if (!res.product || Number(res.product.status) !== 1) {
        return navigate('/');
      }
      (getProductsFromVendor(res.vendorInfo.id, page, 4)(dispatch)).then(
        (products) => {
          let tempProducts = products.filter((product) => {
            return product.id !== Number(id);
          });
          if (tempProducts.length > 3) {
            tempProducts.pop();
          }
          return dispatch(setProducts(tempProducts));
        }
      );
    });
  };

  const handleGetProducts = (page) => {
    dispatch(setPage(page));
    getProducts(page)(dispatch);
  };

  const handleGetProductCategories = () => getProductCategories()(dispatch);

  const handleGetSearchProduct = (keyword, page) => {
    dispatch(setPage(page));
    searchProduct(keyword, page)(dispatch);
  };

  const handleGetProductFromCategory = (id) => {
    getProductsFromCategory(id, 1)(dispatch);
  };

  const handleGetProductsFromVendor = (id, page) => {
    dispatch(setPage(page));
    (getProductsFromVendor(id, page, 10)(dispatch)).then((res) => {
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

    const tokenOptions = [
      { name: 'BNB',value:ZERO_ADDRESS },
      { name: 'BUSD',value:BUSD.address },
      { name: 'TSA',value:UNI[ChainId.BSC_MAINNET].address },
      { name: 'Shih',value:SHIH.address },
      { name: 'CJAI',value:CJAI.address },
    ]

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
    productCategories,
    averageShippingTime,
    product,
    products,
    category,
    productCount,
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
    handleTokenSwitch
  };
}
