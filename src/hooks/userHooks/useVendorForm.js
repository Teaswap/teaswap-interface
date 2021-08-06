import { useState } from 'react';
import useUser from '../../hooks/userHooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function useVendorForm() {
  const navigate = useNavigate();
  const { user, handleUpdateUser, handleUpdateUserInfo } = useUser();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [profile, setProfile] = useState('');
  const [artsNumber, setArtsNumber] = useState('');
  const [contact, setContact] = useState('');
  const [other, setOther] = useState('');
  const [artworksLink, setArtworksLink] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (setSuccessMode, isAdminStatus, goPost=false) => {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if(!re.test(String(email).toLowerCase())) return setEmailError('Email format is wrong')
    if (nickname && !nickname.trim()) return setNicknameError('姓名格式錯誤');
    if (!email) return setEmailError('Enter your email');
    setNicknameError('');
    setEmailError('');
    const data = {
      nickname: nickname ? nickname : '',
      email: email ? email : '',
      description: description ? description : '',
      portfolio: portfolio ? portfolio : '',
      twitter: twitter ? twitter : '',
      instagram: instagram ? instagram : '',
      profile: profile ? profile : '',
      artsNumber: artsNumber ? artsNumber : '',
      contact: contact ? contact : '',
      other: other ? other : '',
      artworksLink: artworksLink ? artworksLink : '',
    };
    console.log('submit user', data)
    if (isAdminStatus)
      return handleUpdateUserInfo(user.userId, data).then((result) => {
        if (result) return;
        setSuccessMode(true);
      });
    handleUpdateUser(data).then((result) => {
      if (result) return navigate('/nft/products/post');
      setSuccessMode(true);
      if (goPost)
        navigate('/nft/products/post')
      // navigator to post
    });
  };

  return {
    nickname,
    email,
    description,
    portfolio,
    twitter,
    instagram,
    profile,
    artsNumber,
    contact,
    artworksLink,
    other,
    emailError,
    nicknameError,
    setNickname,
    setEmail,
    setDescription,
    setPortfolio,
    setTwitter,
    setInstagram,
    setProfile,
    setArtsNumber,
    setContact,
    setArtworksLink,
    setOther,
    handleSubmit,
  };
}
