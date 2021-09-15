import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postPictureAPI } from '../../webAPI/productAPI';
import {
  postProduct,
  updateProduct,
  setPrice, transfer
} from '../../redux/slices/productSlice/productSlice';
import { useTranslation } from 'react-i18next'
import {MintInfoInterface} from "../useMintCallback";
import useLogin from "../userHooks/useLogin";

export default function useProductForm(id) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [productCategory, setProductCategory] = useState(0);
  const [productPictureUrl, setProductPictureUrl] = useState(
    'https://i.imgur.com/uqZxFCm.png'
  );
  const [productRoyalty, setProductRoyalty] = useState(0);
  const [productMediaType, setProductMediaType] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [delivery, setDelivery] = useState(0);
  const [saleCopyright, setSaleCopyright] = useState(0);
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
  const [hasSaleCopyright, setHasSaleCopyright] = useState('');
  const [hasPaymentMethod, setHasPaymentMethod] = useState('');
  const [hasProductQuantity, setHasProductQuantity] = useState('');

    
  const [isCheckImage, setIsCheckImage] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)


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

    // if (!deliveryLocation || !deliveryLocation.trim()) {
    //   hasError = true;
    //   setHasDeliveryLocation(false);
    // } else {
    //   setHasDeliveryLocation(true);
    // }

    if (!checkValidNumber(productPrice, 50000000, 0)) {
      hasError = true;
      setHasProductPrice(false);
    } else {
      setHasProductPrice(true);
    }

    // if (!checkValidNumber(productQuantity, 1000, 1)) {
    //   hasError = true;
    //   setHasProductQuantity(false);
    // } else {
    //   setHasProductQuantity(true);
    // }

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
      setSaleCopyright(product.sale_copyright);
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
    sale_copyright: saleCopyright,
  };

  useEffect(() => {
    if (isSubmitClicked === true) {
      checkDataValidity();
    }
  }, [formData]);

  const {t} = useTranslation();

  const handleSubmitAddForm = (e) => {
    e.preventDefault();
    // checkDataValidity();
    setIsSubmitClicked(true);
    // if (!hasError) {
    //   postProduct(formData)(dispatch);
    // }
  };

  const checkInputError = () => {
    checkDataValidity();
    return hasError;
  };

  const handleSubmitProduct = (mintInfo,tokenId) => {
    // checkDataValidity();
    // if (!hasError) {
      let mintData = {
        ProductCategoryId: mintInfo.ProductCategoryId,
        name: mintInfo.productName,
        picture_url: mintInfo.productPictureUrl,
        info: mintInfo.productInfo,
        price: mintInfo.productPrice,
        quantity: 1,
        delivery: mintInfo.delivery, // 出貨方式  0:面交、1:郵寄
        delivery_location: mintInfo.delivertyLocation, // 出貨地點的欄位
        delivery_time: undefined, // 備貨時間的欄位
        payment_method: undefined, // 付款方式 0:貨到付款
        royalty: mintInfo.productRoyalty,
        extoken: mintInfo.productToken,
        mediaType:mintInfo.productMediaType,
        remark: mintInfo.remark,
        tokenid:tokenId,
        sale_copyright: mintInfo.saleCopyright,
      };
      postProduct(mintData)(dispatch);
    // }
    navigate('/nft/users/backstage')
  };

  const handleResaleProduct = (product,reSalePrice,reSaleToken) => {
    // checkDataValidity();
    // if (!hasError) {
    // product.price=reSalePrice;
    // product.extoken=reSaleToken;
    updateProduct(product.id,product,reSalePrice,reSaleToken,'0')(dispatch);
    // }
    // navigate('/nft/users/backstage')
  };

  const handleSetPrice = (product,price) => {
    // checkDataValidity();
    // if (!hasError) {
    // product.price=price;
    setPrice(product.id,price,product.UserId)(dispatch);
    // }
    // navigate('/nft/users/backstage')
  };


  const handleTransfer = (id,toAddress,chainId) => {
    transfer(id,toAddress,chainId)(dispatch)
  };

  const checkisUser = (address) => {
    // checkDataValidity();
    // if (!hasError) {
    // product.price=price;
    // return isUser(address)(dispatch);
    // }
    // navigate('/nft/users/backstage')
  };

  const handleSubmitEditForm = (e) => {
    e.preventDefault();
    checkDataValidity();
    setIsSubmitClicked(true);
    if (!hasError) {
      debugger
      updateProduct(id, formData)(dispatch);
      navigate('/nft/users/backstage');
    }
  };

  const handleChangePicture = (e, setProductPictureUrl, setIsCheckImage, setIsLoadingUpload, setUploadError) => {
    const formData = new FormData();
    console.log('handleChangePicture', e.target.files[0])
    console.log('productMediaType', productMediaType)
    setUploadError('')
    setIsCheckImage(true);
    setIsLoadingUpload(true)
    formData.append('image', e.target.files[0]);
    postPictureAPI(formData).then((res) => {
      if (res.ok === 0) return setUploadError(res.message);
      setIsLoadingUpload(false);
      setIsCheckImage(false);
      console.log('setProductPictureUrl', res.data.link)
      setProductPictureUrl(res.data.link)
    })
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
    saleCopyright,
    deliveryTime,
    deliveryLocation,
    paymentMethod,
    productPictureUrl,
    productMediaType,
    remark,
    isCheckImage,
    isLoadingUpload,
    uploadError,

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

    setIsCheckImage,
    setIsLoadingUpload,
    setUploadError,
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
    handleSubmitProduct,
    checkInputError,
    handleSetPrice,
    handleResaleProduct,
    hasSaleCopyright,
    setSaleCopyright,
    handleTransfer,
    checkisUser
  };
}
