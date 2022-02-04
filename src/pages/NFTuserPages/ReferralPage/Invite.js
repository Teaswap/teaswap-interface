import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import useENS from '../../../hooks/useENS';


export default () => {

  const params = useParams();
  localStorage.setItem('invite_account', params.account);
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/drops')
  })

  return (
    <div>

    </div>
  )
}