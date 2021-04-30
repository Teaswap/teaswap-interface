import React from 'react';
import styled from "styled-components";
import { IconComponent } from "../../components";
import { COLOR, FONT, DISTANCE } from "../../constants/style";
import { NavLink } from "react-router-dom";

const InputBox = styled.div`
  margin-bottom: ${DISTANCE.sm};
  width: 70%;
`;

const InputTitle = styled.h2`
  margin: 0 0 ${DISTANCE.xs} 15px;
  font-size: ${FONT.xs};
  font-weight: 400;
  color: ${COLOR.text_2};
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 3px ${DISTANCE.xs};
  width: 100%;
  border-radius: 25px;
  border: 1px solid ${COLOR.cccccc};
  font-size: ${FONT.sm};
`;

const Input = styled.input`
  width: 85%;
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  letter-spacing: 2px;
  ::placeholder {
    color: ${COLOR.text_2};
  }
`;

const ErrorMessage = styled.div`
  margin-top: ${DISTANCE.xs};
  color: ${COLOR.text_alert};
`;

const Links = styled.div`
  margin-top: ${DISTANCE.xs};
  text-align: center;
  color: ${COLOR.text_2};
`;

const Link = styled(NavLink)`
  display: inline-block;
  color: ${COLOR.text_2};
  &:hover {
    color: ${COLOR.hover};
  }
`;

export default function JoinInput({
  title,
  type,
  message,
  linksType,
  limit,
  handleInputChange,
  togglePassword,
  isPasswordShowed,
  errorMessage,
}) {
  return (
    <InputBox>
      <InputTitle>{title}</InputTitle>
      <InputWrapper>
        {type === "password" && <IconComponent kind='lock' />}
        {type === "username" && <IconComponent kind='user' />}
        {type === "email" && <IconComponent kind='envelope' />}

        <Input
          className={
            (type === "username" && "username_input") ||
            (type === "password" && "password_input") ||
            (type === "email" && "email_input")
          }
          type={type === "password" && !isPasswordShowed ? "password" : "text"}
          maxLength={limit}
          onChange={handleInputChange}
          placeholder={message}
        ></Input>

        {type === "password" && (
          <span onClick={togglePassword}>
            <IconComponent kind='invisible' />
          </span>
        )}
      </InputWrapper>

      <ErrorMessage>{errorMessage}</ErrorMessage>

      {linksType === "password" && (
        <Links>
          <Link to={"#"}>忘記密碼</Link> ｜ <Link to={"#"}>重寄認證信</Link>
        </Links>
      )}
    </InputBox>
  );
}
