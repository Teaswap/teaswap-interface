import { getAuthToken } from '../NFTutils';
import { BASE_URL } from '../constants/unit';

const signAPI = (address, contract, chainId, amount)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/users/white-list/sign`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address,
      contract,
      chainId,
      amount
    }),
  }).then((res) => res.json());
};

const getCountAPI = (address, contract, chainId)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/users/white-list/amount?address=${address}&contract=${contract}&chainId=${chainId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  }).then((res) => res.json());
}

export default {
  signAPI,
  getCountAPI,
}
