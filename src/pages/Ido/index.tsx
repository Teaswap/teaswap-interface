import React from 'react'
import { useParams } from 'react-router-dom'
import Index2 from './index2'
import Index4 from './index4'
import Index3 from './index3'
import Index5 from './index5'

const Index = ()=>{

  const params = useParams()
  const p = {
    currencyIdA: params.currencyIdA,
    currencyIdB: params.currencyIdB,
    idoAddress: params.idoAddress
  }

  return (
    <>
      {params.idoAddress == '0x1Ef0d833Ad1b1D76da36bb28bEF37Ee86874571E' && (
          <Index4 params={p} />
      )}
      {params.idoAddress == '0xF72ECaD992CebB0138aC13b616199f131F847b04' && (
        <Index2 params={p} />
      )}
      {params.idoAddress == '0x887Ed22FAF9C4B985ecB019eA54A5185350AE214' && (
        <Index3 params={p} />
      )}
      {params.idoAddress == '0x624b680136AA1Dd629F8F832a8044c1dF6C33BE9' && (
        <Index5 params={p} />
      )}
    </>
  )
};
export default Index;
