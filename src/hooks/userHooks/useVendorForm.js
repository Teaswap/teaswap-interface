import { useState } from 'react';
import useUser from '../../hooks/userHooks/useUser';

export default function useVendorForm() {
  const { user, handleUpdateUser, handleUpdateUserInfo } = useUser();
  const [nickname, setNickname] = useState('');
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

  const handleSubmit = (setSuccessMode, isAdminStatus) => {
    setNicknameError('');
    if (nickname && !nickname.trim()) return setNicknameError('姓名格式錯誤');
    const data = {
      nickname: nickname ? nickname : '',
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
      if (result) return;
      setSuccessMode(true);
    });
  };

  return {
    nickname,
    description,
    portfolio,
    twitter,
    instagram,
    profile,
    artsNumber,
    contact,
    artworksLink,
    other,
    setNickname,
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
