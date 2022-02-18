import {useTsaContract} from '../../hooks/useContract'

export async function useTotalSupply() {
    const contract = useTsaContract() 
    return await contract?.totalSupply().then((res: any) => {
      console.log("tsp: TotalSupply", {res})
      return Promise.resolve(res)
    }).catch((err: any) => {
    console.log("tsp: ", {err})
    return Promise.reject(err)
  })

}

export const useTsaBalance = (account: string) => {
  const contract = useTsaContract() 
  return contract?.balanceOf(account).then((res: any) => {
    console.log("tsp: ", {res})
    return Promise.resolve(res)
  }).catch((err: any) => {
    console.log("tsp: ", {err})
    return Promise.reject(err)
  })

}
export const useTsaPrice = () => {
  const contract = useTsaContract() 
  return contract?.price().then((res: any) => {
    console.log("tsp: Price", {res})
    return Promise.resolve(res)
  }).catch((err: any) => {
    console.log("tsp: ", {err})
    return Promise.reject(err)
  })
}