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
} from '../../../webAPI/productAPI';

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

export const getProduct = (id) => (dispatch) => {
  return getProductAPI(id).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
    }
    const { vendorInfo, Creator, category, product, userCreated, userSold } = res.data;
    dispatch(setCreator(Creator));
    dispatch(setVendorInfo(vendorInfo));
    dispatch(setUserCreated(userCreated));
    dispatch(setUserSold(userSold));
    dispatch(setProduct(product));
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
  tokenid
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
    tokenid
  }).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : 'something wrong'));
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
    delivery_location, // 出貨地點的欄位
    delivery_time, // 備貨時間的欄位
    payment_method, // 付款方式 0:貨到付款
    remark, // 備註
  }
) => (dispatch) => {
  return updateProductAPI(id, {
    ProductCategoryId,
    name,
    picture_url,
    info,
    price,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location, // 出貨地點的欄位
    delivery_time, // 備貨時間的欄位
    payment_method, // 付款方式 0:貨到付款
    remark, // 備註
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
