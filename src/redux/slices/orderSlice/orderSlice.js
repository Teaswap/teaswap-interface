import { createSlice } from "@reduxjs/toolkit";
import {
  getMe,
  getClientOrder as getClientOrderAPI,
  getSellerOrder as getSellerOrderAPI,
  getDetailOrder as getDetailOrderAPI,
  cancelOrder as cancelOrderAPI,
  sentOrder as sentOrderAPI,
  payOrder as payOrderAPI,
  completeOrder as completeOrderAPI,
} from "../../../webAPI/orderAPI.js";
import { setAuthToken, getAuthToken } from "../../../NFTutils";
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    // state
    isLoading: false,
    order: [],
    detailOrder: [],
    errorMessage: null,
    userData: null,
    mask: false,
  },
  reducers: {
    // reducer
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setDetailOrders: (state, action) => {
      state.detailOrder = action.payload;
    },
    setMask: (state, action) => {
      state.mask = action.payload;
    },
  },
});

export const {
  //action
  setErrorMessage,
  setUser,
  setMask,
  setIsLoading,
  setOrder,
  setDetailOrders,
} = orderSlice.actions;

export const getUser = () => (dispatch) => {
  dispatch(setIsLoading(true));
  if (getAuthToken()) {
    return getMe().then((res) => {
      dispatch(setIsLoading(false));
      if (res.ok !== 1) {
        setAuthToken(null);
        return;
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  }
  dispatch(setIsLoading(false));
};

export const getClientOrder = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return getClientOrderAPI().then((res) => {
    if (!res || res.ok === 0)
      return dispatch(setErrorMessage(res ? res.message : "no data"));
    dispatch(setOrder(res.data));
    dispatch(setIsLoading(false));
    return res.data;
  });
};

export const getSellerOrder = (order) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getSellerOrderAPI(order).then((res) => {
    if (!res || res.ok === 0)
      return dispatch(setErrorMessage(res ? res.message : "no data"));
    dispatch(setOrder(res.data));
    dispatch(setIsLoading(false));
    return res.data;
  });
};

export const getDetailOrder = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getDetailOrderAPI(id).then((res) => {
    if (!res || res.ok === 0)
      return dispatch(setErrorMessage(res ? res.message : "no data"));
    dispatch(setDetailOrders(res.data));
    dispatch(setIsLoading(false));
    return res.data;
  });
};

export const cancelOrder = (id, cancelReason) => (dispatch) => {
  dispatch(setIsLoading(true));
  return cancelOrderAPI(id, cancelReason).then((res) => {
    dispatch(setIsLoading(false));
    return res.data;
  });
};

export const sentOrder = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return sentOrderAPI(id).then((res) => {
    dispatch(setIsLoading(false));
    return res.data;
  });
};
export const completeOrder = (quantity, productId, sellerId) => (dispatch) => {
  dispatch(setIsLoading(true));
  return completeOrderAPI(quantity, productId, sellerId).then((res) => {
    dispatch(setIsLoading(false));
    return res.data;
  });
};

export const payOrder = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return payOrderAPI(id).then((res) => {
    dispatch(setIsLoading(false));
    return res.data;
  });
};

export const selectMask = (state) => state.order.mask;
export const selectLoading = (state) => state.order.isLoading;
export const selectError = (state) => state.order.errorMessage;
export const selectOrder = (state) => state.order.order;
export const selectDetailOrder = (state) => state.order.detailOrder;
export const selectUser = (state) => state.order.userData;
export default orderSlice.reducer;
