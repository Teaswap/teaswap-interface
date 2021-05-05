import React from 'react'
import {Navigate} from 'react-router-dom'
// import AddLiquidity from './index'

export function RedirectToAddLiquidity() {
  return <Navigate to="/add/" />
}

// const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/
// export function RedirectOldAddLiquidityPathStructure(props: RouteComponentProps<{ currencyIdA: string }>) {
//   const {
//     match: {
//       params: { currencyIdA }
//     }
//   } = props
//   const match = currencyIdA.match(OLD_PATH_STRUCTURE)
//   if (match?.length) {
//     return <Redirect to={`/add/${match[1]}/${match[2]}`} />
//   }
//
//   return <AddLiquidity {...props} />
// }

export const RedirectOldAddLiquidityPathStructure: React.FC = (): JSX.Element => {
  // const params = useParams();
  // const currencyIdA = params.currencyIdA
  return <Navigate to='/add' />;
};

// export function RedirectDuplicateTokenIds(props: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
//   const {
//     match: {
//       params: { currencyIdA, currencyIdB }
//     }
//   } = props
//   if (currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
//     return <Redirect to={`/add/${currencyIdA}`} />
//   }
//   return <AddLiquidity {...props} />
// }
export const RedirectDuplicateTokenIds: React.FC = (): JSX.Element => {
  return <Navigate to='/add' />;
};
