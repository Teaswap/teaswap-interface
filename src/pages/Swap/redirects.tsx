import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../state";
import {
  ApplicationModal,
  setOpenModal,
} from "../../state/application/actions";

// Redirects to swap but only replace the pathname
export const RedirectPathToSwapOnly: React.FC = (): JSX.Element => {
  return <Navigate to="/swap" />;
};

// ({ location }: useParams) {
//   return <Navigate to={{ ...location, pathname: '/swap' }} />
// }

export const RedirectPathToHomeOnly: React.FC = (): JSX.Element => {
  return <Navigate to="/explore" />;
};
export const RedirectPathToNftOnly: React.FC = (): JSX.Element => {
  return <Navigate to="/nft/products/category/1" />;
};

export const RedirectPathToIroOnly: React.FC = (): JSX.Element => {
  return <Navigate to="/iro" />;
};
// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
export const RedirectToSwap: React.FC = (): JSX.Element => {
  // const params = useParams();
  // const {
  //   location: { search },
  //   match: {
  //     params: { params }
  //   }
  // } = props
  return <Navigate to="/swap" />;
};
// return (
//   <Navigate
//     to= '/swap',
//       search:
//         search && search.length > 1
//           ? `${search}&outputCurrency=${outputCurrency}`
//           : `?outputCurrency=${outputCurrency}`
//     }}
//   />
//   )
// }

// export function OpenClaimAddressModalAndRedirectToSwap(props: RouteComponentProps) {
//   const dispatch = useDispatch<AppDispatch>()
//   useEffect(() => {
//     dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM))
//   }, [dispatch])
//   return <RedirectPathToSwapOnly {...props} />
// }
export const OpenClaimAddressModalAndRedirectToSwap: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM));
  }, [dispatch]);
  return <RedirectPathToSwapOnly />;
};
