import { getAuthToken } from '../NFTutils';
import { BASE_URL } from '../constants/unit';

export const registerAPI = (user) => {
  const { username, password, email } = user;
  return fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  }).then((res) => res.json());
};

export const loginAPI = (user) => {
  const { username, password } = user;
  return fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const bindWalletUserAPI = (address,chainId) => {
  return fetch(`${BASE_URL}/users/bind`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      address : address,
      chainId : chainId
    }),
  }).then((res) => res.json());
};

export const getMeAPI = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const postMailAPI = (mail) => {
  const { name, email, content, phone } = mail;
  return fetch(`${BASE_URL}/users/mails`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      content,
    }),
  }).then((res) => res.json());
};

export const getFaqAPI = () => {
  return fetch(`${BASE_URL}/manages/faqs`).then((res) => res.json());
};
