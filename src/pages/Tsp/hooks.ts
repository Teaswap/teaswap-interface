import {useTspContract} from '../../hooks/useContract'

export async function useTotalSupply() {
    const contract = useTspContract() 
    return await contract?.totalSupply().then((res: any) => {
      console.log("tsp: TotalSupply", {res})
      return Promise.resolve(res)
    }).catch((err: any) => {
    console.log("tsp: ", {err})
    return Promise.reject(err)
  })

}

export const useTspBalance = (account: string) => {
  const contract = useTspContract() 
  return contract?.balanceOf(account).then((res: any) => {
    console.log("tsp: ", {res})
    return Promise.resolve(res)
  }).catch((err: any) => {
    console.log("tsp: ", {err})
    return Promise.reject(err)
  })

}
export const useTspPrice = () => {
  const contract = useTspContract() 
  return contract?.price().then((res: any) => {
    console.log("tsp: Price", {res})
    return Promise.resolve(res)
  }).catch((err: any) => {
    console.log("tsp: ", {err})
    return Promise.reject(err)
  })
}