import { createSlice } from '@reduxjs/toolkit';
import { getUserByIdAPI } from '../../../webAPI/userAPI';
import {
  getProductsAPI,
  getProductCategoriesAPI,
  getProductsFromCategoryAPI,
  getProductsFromVendorAPI,
  searchProductAPI,
  getProductAPI,
  postProductAPI,
  updateProductAPI,
  deleteProductAPI,
  setPriceAPI,
  likeProductAPI
} from '../../../webAPI/productAPI';
import {completeOrder, createOrder as createOrderAPI} from "../../../webAPI/cartAPI";
import {setIsLoading, setOrderNumber} from "../cartSlice/cartSlice";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    vendorInfo: [],
    Creator: {},
    page: 1,
    sort: 'latest',
    product: [],
    products: [],
    productCount: 0,
    userCreated: 0,
    userSold: 0,
    category: [],
    categories: [],
    errorMessage: null,
  },
  reducers: {
    setVendorInfo: (state, action) => {
      state.vendorInfo = action.payload;
    },
    setCreator: (state, action) => {
      state.Creator = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    pushProducts: (state, action) => {
      state.products.push(...action.payload);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductCount: (state, action) => {
      state.productCount = action.payload;
    },
    setUserCreated: (state, action) => {
      state.userCreated = action.payload;
    },
    setUserSold: (state, action) => {
      state.userSold = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProductCarts: (state, action) => {
      state.productCarts = action.payload;
    },
    setProductOrders: (state, action) => {
      state.productOrders = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setVendorInfo,
  setCreator,
  setSort,
  setPage,
  pushProducts,
  setProducts,
  setProductCount,
  setUserCreated,
  setUserSold,
  setProduct,
  setProductCarts,
  setProductOrders,
  setCategories,
  setCategory,
  setErrorMessage,
} = productSlice.actions;

export const getProducts = (page) => (dispatch) => {
  getProductsAPI(page).then((res) => {
    if (res.ok === 0) {
      if (typeof res.message === 'object') {
        return dispatch(setErrorMessage('something wrong'));
      }
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    const { count, products } = res.data;
    // dispatch(pushProducts(products));
    dispatch(setProductCount(count));
  });
};

export const likeProduct = (id) => (dispatch) => {
  likeProductAPI(id).then((res) => {
    if (res.ok === 0) {
      if (typeof res.message === 'object') {
        return dispatch(setErrorMessage('something wrong'));
      }
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    const { product } = res.data;
    dispatch(setProduct(product));
  });
};



export const getProduct = (id) => (dispatch) => {
  return getProductAPI(id).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    const { vendorInfo, Creator, category, product, userCreated, userSold, Carts, Orders } = res.data;
    dispatch(setCreator(Creator));
    dispatch(setVendorInfo(vendorInfo));
    dispatch(setUserCreated(userCreated));
    dispatch(setUserSold(userSold));
    dispatch(setProduct(product));
    dispatch(setProductCarts(Carts));
    dispatch(setProductOrders(Orders));
    dispatch(setCategory(category));
    return res.data;
  });
};

export const getProductsFromCategory = (id, page, queue) => (dispatch) => {
  getProductsFromCategoryAPI(id, page, queue).then((res) => {
    if (res.ok === 0) {
      dispatch(setProductCount(0));
      dispatch(setProducts([]));
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    const { category, count, products } = res.data;
    dispatch(setCategory(category));
    dispatch(setProductCount(count));
    dispatch(setProducts(products));
  });
};

export const getProductsFromVendor = (id, page, limit, type="all") => (dispatch) => {
  return getProductsFromVendorAPI(id, page, limit, type).then((res) => {
    if (res.ok === 0) {
      dispatch(setErrorMessage(res ? res.message : 'something wrong'));
      dispatch(setProducts([]));
      dispatch(setProductCount(0));
      return res;
    }
    dispatch(setErrorMessage(''))
    const { count, products } = res.data;
    dispatch(setProducts(products));
    dispatch(setProductCount(count));
    return products;
  });
};

export const searchProduct = (keyword, page, queue) => (dispatch) => {
  searchProductAPI(keyword, page, queue).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    const { products, count } = res.data;
    dispatch(pushProducts(products));
    dispatch(setProductCount(count));
  });
};

export const getProductCategories = () => (dispatch) => {
  getProductCategoriesAPI().then((res) => {
    if (!res || res.ok === 0) {
      if (typeof res.message === 'object') {
        return dispatch(setErrorMessage('something wrong'));
      }
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    dispatch(setCategories(res.data));
  });
};

export const getUserById = (id) => (dispatch) => {
  dispatch(setVendorInfo({}));
  dispatch(setErrorMessage(''));
  return getUserByIdAPI(id).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    dispatch(setVendorInfo(result.data));
    return result;
  });
};

export const postProduct = ({
  ProductCategoryId,
  name,
  picture_url,
  info,
  price,
  quantity,
  delivery, // 出貨方式  0:面交、1:郵寄
  delivery_location,
  royalty,
  extoken,
  mediaType,
  remark, // 備註
  tokenid,
  sale_copyright
}) => (dispatch) => {
  return postProductAPI({
    ProductCategoryId,
    name,
    picture_url,
    info,
    price,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location,
    royalty,
    extoken,
    mediaType,
    remark, // 備註
    tokenid,
    sale_copyright
  }).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    return res.message;
  });
};

export const setPrice = (id,price,userid)=>(dispatch)=>{
  return setPriceAPI(id,price).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    if ( res.ok === 2 ) {
      const readyToOrderItems = [{
        ProductId: id,
        UserId: userid,
        product_quantity: 1,
      }]
      return createOrderAPI(readyToOrderItems).then((res) => {
        completeOrder(res.orderId).then((res)=>{console.log(JSON.stringify(res))});
      });
    }
    return res.message;
  });
};

export const updateProduct = (
  id,
  {
    ProductCategoryId,
    name,
    picture_url,
    info,
    price,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location,
    royalty,
    extoken,
    mediaType,
    remark, // 備註
    tokenid,
    sale_copyright
  },
  reSalePrice,reSaleToken,status
) => (dispatch) => {
  return updateProductAPI(id, {
    ProductCategoryId,
    name,
    picture_url,
    info,
    price:reSalePrice,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location,
    royalty,
    extoken:reSaleToken,
    status:status,
    mediaType,
    remark, // 備註
    tokenid,
    sale_copyright
  }).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    return res.message;
  });
};

export const deleteProduct = (id) => (_) => {
  return deleteProductAPI(id).then((res) => res.message);
};

// export const postPicture = (formData) => (_) => {
//   return postPictureAPI(formData).then((res) => {
//     return res;
//   });
// };

export const selectProductCategories = (state) => state.product.categories;
export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectProductCarts = (state) => state.product.productCarts;
export const selectProductOrders = (state) => state.product.productOrders;
export const selectCategory = (state) => state.product.category;
export const selectErrorMessage = (state) => state.product.errorMessage;
export const selectProductCount = (state) => state.product.productCount;
export const selectUserCreated = (state) => state.product.userCreated;
export const selectUserSold = (state) => state.product.userSold;
export const selectPage = (state) => state.product.page;
export const selectSort = (state) => state.product.sort;
export const selectVendorInfo = (state) => state.product.vendorInfo;
export const selectCreator = (state) => state.product.Creator;
export default productSlice.reducer;
