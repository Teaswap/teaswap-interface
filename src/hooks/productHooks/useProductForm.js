import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postPictureAPI } from '../../webAPI/productAPI';
import {
  postProduct,
  updateProduct,
} from '../../redux/slices/productSlice/productSlice';
import { useTranslation } from 'react-i18next'

export default function useProductForm(id) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPictureUrl, setProductPictureUrl] = useState(
    'https://i.imgur.com/uqZxFCm.png'
  );
  const [productRoyalty, setProductRoyalty] = useState('');
  const [productMediaType, setProductMediaType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('0x83Ed4dF752CCe79cA786D505D4063541419CFf15');
  const [delivery, setDelivery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [remark, setRemark] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const [hasProductName, setHasProductName] = useState('');
  const [hasProductInfo, setHasProductInfo] = useState('');
  const [hasProductCategory, setHasProductCategory] = useState('');
  const [hasProductToken, setHasProductToken] = useState('');
  const [productToken, setProductToken] = useState('');
  const [hasProductRoyalty, setHasProductRoyalty] = useState('');
  const [hasProductMediaType, setHasProductMediaType] = useState('');
  const [hasDeliveryLocation, setHasDeliveryLocation] = useState('');
  const [hasProductPrice, setHasProductPrice] = useState('');
  const [hasDeliveryTime, setHasDeliveryTime] = useState('');
  const [hasDelivery, setHasDelivery] = useState('');
  const [hasPaymentMethod, setHasPaymentMethod] = useState('');
  const [hasProductQuantity, setHasProductQuantity] = useState('');


  let hasError = false;

  const handleChange = (setValue) => (e) => {
    console.log(e, e.target.value)
    setValue(e.target.value)
  };

  const checkValidNumber = (input, max, min) => {
    const num = Number(input);
    if (Number.isNaN(num) || num > max || num < min) {
      return false;
    }
    return true;
  };

  const checkDataValidity = () => {
    if (!productName || !productName.trim()) {
      hasError = true;
      setHasProductName(false);
    } else {
      setHasProductName(true);
    }

    if (!productCategory) {
      hasError = true;
      setHasProductCategory(false);
    } else {
      setHasProductCategory(true);
    }

    if (!productInfo || !productInfo.trim()) {
      hasError = true;
      setHasProductInfo(false);
    } else {
      setHasProductInfo(true);
    }

    if (!deliveryLocation || !deliveryLocation.trim()) {
      hasError = true;
      setHasDeliveryLocation(false);
    } else {
      setHasDeliveryLocation(true);
    }

    if (!checkValidNumber(productPrice, 50000000, 0)) {
      hasError = true;
      setHasProductPrice(false);
    } else {
      setHasProductPrice(true);
    }

    if (!checkValidNumber(productQuantity, 1000, 1)) {
      hasError = true;
      setHasProductQuantity(false);
    } else {
      setHasProductQuantity(true);
    }

    if (!checkValidNumber(delivery, 2, 0)) {
      hasError = true;
      setHasDelivery(false);
    } else {
      setHasDelivery(true);
    }

  };

  const changeProductValue = (product) => {
    if (product) {
      setProductName(product.name);
      setProductInfo(product.info);
      setProductCategory(product.ProductCategoryId);
      setProductPictureUrl(product.picture_url);
      setProductPrice(product.price);
      setProductQuantity(product.quantity);
      setProductRoyalty(product.royalty);
      setProductToken(product.token);
      setDelivery(product.delivery);
      setPaymentMethod(product.payment_method);
      setRemark(product.remark);
    }
  };

  let formData = {
    ProductCategoryId: productCategory,
    name: productName,
    picture_url: productPictureUrl,
    info: productInfo,
    price: productPrice,
    quantity: productQuantity,
    delivery: delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location: deliveryLocation, // 出貨地點的欄位
    delivery_time: deliveryTime, // 備貨時間的欄位
    payment_method: paymentMethod, // 付款方式 0:貨到付款
    royalty: productRoyalty,
    extoken: productToken,
    mediaType:productMediaType,
    remark,
  };

  useEffect(() => {
    if (isSubmitClicked === true) {
      checkDataValidity();
    }
  }, [formData]);

  const {t} = useTranslation();

  const handleSubmitAddForm = (e) => {
    e.preventDefault();
    checkDataValidity();
    setIsSubmitClicked(true);
    if (!hasError) {
      postProduct(formData)(dispatch);
    }
  };

  const handleSubmitProduct = () => {
    checkDataValidity();
    setIsSubmitClicked(true);
    if (!hasError) {
      postProduct(formData)(dispatch);
    }
  };

  const handleSubmitEditForm = (e) => {
    e.preventDefault();
    checkDataValidity();
    setIsSubmitClicked(true);
    if (!hasError) {
      updateProduct(id, formData)(dispatch);
      navigate('/nft/users/backstage');
    }
  };

  const handleChangePicture = (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    postPictureAPI(formData).then((res) => setProductPictureUrl(res.data.link));
  };

  return {
    productCategory,
    productName,
    productInfo,
    productPrice,
    productQuantity,
    productRoyalty,
    productToken,
    delivery,
    deliveryTime,
    deliveryLocation,
    paymentMethod,
    productPictureUrl,
    productMediaType,
    remark,

    hasProductName,
    hasProductInfo,
    hasProductCategory,
    hasDeliveryLocation,
    hasProductPrice,
    hasDeliveryTime,
    hasDelivery,
    hasPaymentMethod,
    hasProductQuantity,
    hasProductToken,
    hasProductMediaType,
    hasProductRoyalty,

    setProductName,
    setProductInfo,
    setProductCategory,
    setProductPictureUrl,
    setProductPrice,
    setDeliveryTime,
    setDeliveryLocation,
    setDelivery,
    setPaymentMethod,
    setProductToken,
    setRemark,
    setProductQuantity,
    setProductRoyalty,
    setHasProductToken,
    setHasProductMediaType,
    setHasProductRoyalty,
    setProductMediaType,
    
    changeProductValue,
    handleChange,
    handleSubmitAddForm,
    handleSubmitEditForm,
    handleChangePicture,
    handleSubmitProduct
  };
}
