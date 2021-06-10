import { createSlice } from '@reduxjs/toolkit';
import {
  getMeAPI,
  updateUserAPI,
  updatePasswordAPI,
  uploadAvatarAPI,
  uploadQRCodeAPI,
  uploadBannerAPI,
  updatePermissionAPI,
  getUserByIdAPI,
  updateUserInfoAPI,
  applyForVendorAPI,
  updateAnnouncementAPI
} from '../../../webAPI/userAPI'
// import user from '../../../state/user/reducer'
// import { useState } from 'react'
import { setUser, setErrorMessage } from '../../../state/user/actions'

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: {},
//     errorMessage: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setErrorMessage: (state, action) => {
//       state.errorMessage = action.payload;
//     },
//
//     setVendorInfo: (state, action) => {
//       state.vendorInfo = action.payload;
//     },
//   },
// });

// export const { setUser, setErrorMessage } = userSlice.actions;


export const  getMe = () => (dispatch) => {

    dispatch(setUser({is_admin:false,is_vendor:false}));
    dispatch(setErrorMessage(''));
    return getMeAPI().then((result) => {
      if (!result || result.ok === 0)
        return dispatch(
          setErrorMessage(result ? result.message : 'something wrong')
        );
      dispatch(setUser(result.data));
      return result;
    });

};

export const updateUser = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updateUserAPI(data).then((result) => {
    if (!result || result.ok === 0) {
      dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    }
    getMe()(dispatch);
  });
};

export const updatePassword = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updatePasswordAPI(data).then((result) => {
    if (!result || result.ok === 0) {
      dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    }
    dispatch(getMe());
  });
};

export const uploadAvatar = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return uploadAvatarAPI(data).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    getMe()(dispatch);
    return result;
  });
};

export const uploadQRCode = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return uploadQRCodeAPI(data).then((result) => result);
};

export const uploadBanner = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return uploadBannerAPI(data).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    getMe()(dispatch);
    return result;
  });
};

export const updatePermission = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updatePermissionAPI(data).then((result) => {
    if (!result || result.ok === 0) {
      dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    }
  });
};

export const getUserById = (id) => (dispatch) => {
  dispatch(setUser({}));
  dispatch(setErrorMessage(''));
  return getUserByIdAPI(id).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    dispatch(setUser(result.data));
    return result;
  });
};

export const updateUserInfo = (id, data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updateUserInfoAPI(id, data).then((result) => {
    if (!result || result.ok === 0) {
      dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    }
  });
};

export const applyForVendor = () => (dispatch) => {
  dispatch(setErrorMessage(''));
  return applyForVendorAPI().then((result) => {
    if (!result || result.ok === 0) {
      dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    }
    getMe()(dispatch);
  });
};

export const updateAnnouncement = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updateAnnouncementAPI(data).then((result) => {
    if (!result || result.ok === 0) {
      dispatch(setErrorMessage(result ? result.message : 'something wrong'));
      return result;
    }
    getMe()(dispatch);
  });
};

export const selectUser = (state) => state.user.user;
export const selectErrorMessage = (state) => state.user.errorMessage;
export const selectWalletUser = (state) => state.user.walletUser;
// export default userSlice.reducer;
