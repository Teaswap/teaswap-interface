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
  const [opensea, setOpensea] = useState('');
  const [profile, setProfile] = useState('');
  const [artsNumber, setArtsNumber] = useState('');
  const [contact, setContact] = useState('');
  const [other, setOther] = useState('');
  const [artworksLink, setArtworksLink] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (setSuccessMode, isAdminStatus, goPost=false) => {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!re.test(String(email).toLowerCase())) return setEmailError('Invalid email')
    if (nickname && !nickname.trim()) return setNicknameError('姓名格式錯誤');
    if (!email) return setEmailError('*This field is required.');
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
      opensea_link: opensea ?? ''
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
    opensea,
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
    setOpensea,
    setProfile,
    setArtsNumber,
    setContact,
    setArtworksLink,
    setOther,
    handleSubmit,
  };
}
