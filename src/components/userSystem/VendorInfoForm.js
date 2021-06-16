import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import { SetQRCode } from '../userSystem/';
import { BirthdaySelector } from '../../components/userSystem';
import { COLOR, FONT, DISTANCE } from '../../constants/style';
import { InputComponent } from '../../components/Input';
import { GreyBtn } from '../NFTButton'
import useVendorForm from '../../hooks/userHooks/useVendorForm';
import {useTranslation} from 'react-i18next';
import {SetAvatar, SetBanner}  from '../../components/userSystem' 
  
const FontWrapper = styled.div`
  margin: 0 auto;
  margin: ${DISTANCE.md} 0;
  width: 90%;
  max-width: 620px;
`;

const InputName = styled.h2`
  color: ${COLOR.black};
  font-size: 14px;
  margin: ${DISTANCE.sm} 0;
  font-weight: normal;
`;

const InputDescription = styled.p`
  color: ${COLOR.text_1};
  font-size: ${FONT.sm};
  margin: ${DISTANCE.xs} 0;
`;

const Text = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  margin: ${DISTANCE.md} 0 ${DISTANCE.sm} 0;
`;

const ErrorMessage = styled.span`
  color: ${COLOR.text_alert};
  font-size: ${FONT.xss};
  margin: 0 15px;
`;

export default function VendorInfoForm({ setSuccessMode, isAdminStatus }) {
  const { user } = useUser();
  const {
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
    nicknameError
  }= useVendorForm();

  const {t} = useTranslation();

  useEffect(() => {
    if(user){
      setNickname(user.nickname ? user.nickname : '');
      setDescription(user.description ? user.description : '');
      setPortfolio(user.portfolio ? user.portfolio : '');
      setTwitter(user.twitter ? user.twitter : '');
      setInstagram(user.instagram ? user.instagram : '');
      setProfile(user.profile ? user.profile : '');
      setArtsNumber(user.artsNumber ? user.artsNumber : '');
      setContact(user.contact ? user.contact : '');
      setArtworksLink(user.artworksLink ? user.artworksLink : '');
      setOther(user.other ? user.other : '');
    }

  }, [user]);

  return (
    <>
      <FontWrapper action='' novalidate=''>
        <InputName>{t('Your Name')}</InputName>
        <InputComponent
          type='text'
          name='nickname'
          $margin={0}
          maxLength='20'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
        <InputName>{t('Add a description of you and your art (200 words maximum)')}</InputName>
        <InputComponent
          type='text'
          name='description'
          $margin={0}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputName>{t("Website or Digital Portfolio")}</InputName>
        <InputComponent
          type='text'
          name='portfolio'
          $size={'sm'}
          $margin={0}
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />
        <InputName>{t("Twitter ID and Followers")}</InputName>
        <InputComponent
          type='text'
          name='twitter'
          $size={'sm'}
          $margin={0}
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <InputName>{t("Instagram ID and Followers")}</InputName>
        <InputComponent
          type='text'
          name='instagram'
          $size={'sm'}
          $margin={0}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <InputName>{t("Your profile link on TeaSwap or the address you minted artworks on TeaSwap")}</InputName>
        <InputComponent
          type='text'
          name='profile'
          $size={'sm'}
          $margin={0}
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <InputName>{t("Number of Arts being exposed and Arts sold (approx.)")}</InputName>
        <InputComponent
          type='text'
          name='artsNumber'
          $size={'sm'}
          $margin={0}
          value={artsNumber}
          onChange={(e) => setArtsNumber(e.target.value)}
        />
        <InputName>{t("Contact (Telegram ID preferred)")}</InputName>
        <InputComponent
          type='text'
          name='contact'
          $size={'sm'}
          $margin={0}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <InputName>{t("Link to a selection of your artworks")}</InputName>
        <InputComponent
          type='text'
          name='artworksLink'
          $size={'sm'}
          $margin={0}
          value={artworksLink}
          onChange={(e) => setArtworksLink(e.target.value)}
        />
        <InputName>{t("Other things you want to share with us (Optional)")}</InputName>
        <InputComponent
          type='text'
          name='other'
          $size={'sm'}
          $margin={0}
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
        {/* <InputName>{t('Birthday')}</InputName>
        <BirthdaySelector setBirthday={setBirthday} />
        {birthdayError && <ErrorMessage>{birthdayError}</ErrorMessage>}
        <InputName>{t('Im QR-code')}</InputName>
        <InputDescription>wechat/line/tg QR-code</InputDescription> */}
        {/* <SetQRCode setSocialMediaId={setSocialMediaId} /> */}
        <Text>{t('Upload Avatar')}</Text>
        <SetAvatar setSuccessMode={setSuccessMode} />
        <Text>{t('UpLoad Banner')}</Text>
        <SetBanner setSuccessMode={setSuccessMode} />
      </FontWrapper>
      <GreyBtn
        style={{
          margin: '0 auto'
        }}
        onClick={() => handleSubmit(setSuccessMode, isAdminStatus)}
        $margin={0}
      >
        {t('Confirm')}
      </GreyBtn>
    </>
  );
}
