import { getAuthToken } from '../NFTutils';
import { BASE_URL } from '../constants/unit';

const mintAPI = (address, hash)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/airdrop/mint`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address,
      hash
    }),
  }).then((res) => res.json());
}

const checkAPI = (address, hash)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/airdrop/check`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address,
      hash
    }),
  }).then((res) => res.json());
};

const getCountAPI = (address)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/airdrop/count?address=${address}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  }).then((res) => res.json());
}

const mintedAPI = (address)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/airdrop/minted`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address
    }),
  }).then((res) => res.json());
}

export default {
  mintAPI,
  checkAPI,
  getCountAPI,
  mintedAPI
}
