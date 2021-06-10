import { useSelector, useDispatch } from 'react-redux';
import {
  getMe,
  selectUser,
  updateUser,
  updatePassword,
  uploadAvatar,
  uploadQRCode,
  uploadBanner,
  updatePermission,
  selectErrorMessage,
  getUserById,
  updateUserInfo,
  applyForVendor,
  updateAnnouncement, selectWalletUser
} from '../../redux/slices/userSlice/userSlice'
import { setWalletUser } from '../../state/user/actions'

export default function useUser() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const walletUser = useSelector(selectWalletUser);

  const errorMessage = useSelector(selectErrorMessage);

  const handleSetwalletUser = (data) => {setWalletUser(data)};
  const handleGetMe = () => getMe()(dispatch).then((result) => result);
  const handleUpdatePassword = (data) =>
    dispatch(updatePassword(data)).then((result) => result);
  const handleUpdateUser = (data) =>
    (updateUser(data)(dispatch)).then((result) => result);
  const handleUploadAvatar = (data) =>
    (uploadAvatar(data)(dispatch)).then((result) => result);
  const handleUploadQRCode = (data) =>
    (uploadQRCode(data)(dispatch)).then((result) => result);
  const handleUploadBanner = (data) =>
    (uploadBanner(data)(dispatch)).then((result) => result);
  const handleUpdatePermission = (data) =>
    (updatePermission(data)(dispatch)).then((result) => result);
  const handleGetUserById = (id) =>
    (getUserById(id)(dispatch)).then((result) => result);
  const handleUpdateUserInfo = (id, data) =>
    (updateUserInfo(id, data)(dispatch)).then((result) => result);
  const handleApplyForVendor = () =>
    (applyForVendor()(dispatch)).then((result) => result);
  const handleUpdateAnnouncement = (data) =>
    (updateAnnouncement(data)(dispatch)).then((result) => result);

  return {
    user,
    walletUser,
    errorMessage,
    handleGetMe,
    handleUpdateUser,
    handleUpdatePassword,
    handleUploadAvatar,
    handleUploadQRCode,
    handleUploadBanner,
    handleUpdatePermission,
    handleGetUserById,
    handleUpdateUserInfo,
    handleApplyForVendor,
    handleUpdateAnnouncement,
    handleSetwalletUser
  };
}
