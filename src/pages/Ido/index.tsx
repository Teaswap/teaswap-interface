import React from 'react'
import { useParams } from 'react-router-dom'
import Index2 from './index2'
// import Index4 from './index4'
import Index3 from './index3'

const Index = ()=>{

  const params = useParams()
  const p = {
    currencyIdA: params.currencyIdA,
    currencyIdB: params.currencyIdB,
    idoAddress: params.idoAddress
  }

  return (
    <>
      {params.idoAddress == '0xF72ECaD992CebB0138aC13b616199f131F847b04' && (
        <Index2 params={p} />
      )}
      {params.idoAddress == '0x887Ed22FAF9C4B985ecB019eA54A5185350AE214' && (
        <Index3 params={p} />
      )}
    </>
  )
};
export default Index;