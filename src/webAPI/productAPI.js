import { BASE_URL } from '../constants/unit';

function changeProductSort(queue) {
  let sort;
  let order;
  switch (queue) {
    case 'lowToHight':
      sort = 'price';
      order = 'ASC';
      break;
    case 'hightToLow':
      sort = 'price';
      order = 'DESC';
      break;
    default:
      sort = 'id';
      order = 'DESC';
  }
  return { sort, order };
}

const getProductsAPI = (page, artworkType, catId, extoken) => {
  return fetch(`${BASE_URL}/products?_page=${page}&_artworkType=${artworkType}&_catId=${catId}&_extoken=${extoken}`).then((res) => res.json());
};

const getProductCategoriesAPI = () => {
  return fetch(`${BASE_URL}/products/categories`).then((res) => res.json());
};

const getProductsFromCategoryAPI = (id, page, queue) => {
  let { sort, order } = changeProductSort(queue);
  return fetch(
    `${BASE_URL}/products/categories/${id}?_page=${page}&_sort=${sort}&_limit=9&_order=${order}`
  ).then((res) => res.json());
};

const getProductsFromVendorAPI = (id, page, limit, type) => {
  return fetch(
    `${BASE_URL}/products/vendor/${id}?_page=${page}&_limit=${limit}&_type=${type}`
  ).then((res) => res.json());
};

const searchProductAPI = (keyword, page, queue) => {
  let { sort, order } = changeProductSort(queue);
  return fetch(
    `${BASE_URL}/products/search?_keyword=${keyword}&_page=${page}&_limit=9&_sort=${sort}&_order=${order}`
  ).then((res) => res.json());
};

const getProductAPI = (id) => {
  return fetch(`${BASE_URL}/products/${id}`).then((res) => res.json());
};

const postProductAPI = ({
  ProductCategoryId,
  name,
  picture_url,
  info,
  price,
  quantity,
  delivery, // 出貨方式  0:面交、1:郵寄
  delivery_location,
  royalty,
  extoken,
  mediaType,
  remark, // 備註
  tokenid,
  sale_copyright
}) => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/products/new`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ProductCategoryId,
      name,
      picture_url,
      info,
      price,
      quantity,
      delivery,
      delivery_location,
      royalty,
      extoken,
      mediaType,
      remark,
      tokenid,
      sale_copyright
    }),
  })
    .then((res) => res.json())
    .then((res) => res);
};

const setPriceAPI = (id,price)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/products/productprice/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      price:price
    }),
  }).then((res) => res.json());
};

const transferAPI = (id,toAddress,chainid)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/products/transfer/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address:toAddress,
      chainid:chainid
    }),
  }).then((res) => res.json());
};

const revokeAPI = (id)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/products/revoke/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const stakeAPI = (delivery_location, tokenid)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/products/stake`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      delivery_location: delivery_location,
      tokenid: tokenid
    }),
  }).then((res) => res.json());
};

const unstakeAPI = (delivery_location)=>{
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/products/unstake`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      delivery_location: delivery_location
    }),
  }).then((res) => res.json());
};

const isUserAPI = (address)=>{
  return fetch(`${BASE_URL}/users/isuser/${address}` ).then((res) => res.json());
};

const likeProductAPI = (id)=>{
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/products/like/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const updateProductAPI = (
  id,
  {
    ProductCategoryId,
    name,
    picture_url,
    info,
    price,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location,
    royalty,
    extoken,
    status,
    mediaType,
    remark, // 備註
    tokenid,
    sale_copyright,
  }
) => {
  const token = localStorage.getItem('token');
  if (price <=0) return
  return fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ProductCategoryId,
      name,
      picture_url,
      info,
      price,
      quantity,
      delivery, // 出貨方式  0:面交、1:郵寄
      delivery_location,
      royalty,
      extoken,
      status,
      mediaType,
      remark, // 備註
      tokenid,
      sale_copyright
    }),
  }).then((res) => res.json());
};

const deleteProductAPI = (id) => {
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const postPictureAPI = (formData) => {
  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID 13c7722407e3240',
    },
    body: formData,
  }).then((res) => res.json());
};

export {
  getProductsAPI,
  getProductCategoriesAPI,
  getProductsFromCategoryAPI,
  getProductsFromVendorAPI,
  searchProductAPI,
  getProductAPI,
  isUserAPI,
  postProductAPI,
  updateProductAPI,
  deleteProductAPI,
  postPictureAPI,
  setPriceAPI,
  likeProductAPI,
  transferAPI,
  revokeAPI,
  stakeAPI,
  unstakeAPI
};
