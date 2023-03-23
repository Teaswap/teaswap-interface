import React from 'react';
import styled from 'styled-components';
import { COLOR, FONT, MEDIA_QUERY } from '../../constants/style';
import { InputComponent, TextAreaComponent } from '../Input';
import { RadioBox } from './RadioBox';
import { SelectBox } from './SelectBox';
import { PictureBox } from './PictureBox';

const QuestionBox = styled.div`
  margin-bottom: 30px;
  width: 100%;
  max-width: 600px;
  ${MEDIA_QUERY.sm} {
    width: 90%;
  }
`;

const QuestionTitle = styled.div`
  margin-bottom: 10px;
  color: #474747;
  font-size: 12px;
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  color: ${COLOR.text_alert};
  position: absolute;
`;

export const InputItem = ({
  title,
  type,
  label,
  isNumber,
  errorMessage,
  hasValue,
  handleChange,
  placeholder=null,
  options,
  productPictureUrl,
  textareaRows,
  disabled = false,
  value,
}) => {
  return (
    <QuestionBox>
      <QuestionTitle>{label ? label : title}</QuestionTitle>

      {type === 'input' && (
        <InputComponent
          value={value}
          $margin={0}
          $size={title === '商品名稱' && 'lg'}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      )}

      {type === 'textArea' && (
        <TextAreaComponent
          $margin={0}
          $size={'lg'}
          rows={textareaRows}
          onChange={handleChange}
          value={value}
        ></TextAreaComponent>
      )}

      {type === 'radio' && (
        <RadioBox
          label={label}
          title={title}
          options={options}
          handleChange={handleChange}
          oldValue={value}
        />
      )}

      {type === 'select' && (
        <SelectBox
          options={options}
          handleChange={handleChange}
          oldValue={value}
        />
      )}

      {type === 'picture' && (
        <PictureBox
          pictureUrl={productPictureUrl}
          handleChange={handleChange}
        />
      )}

      {hasValue === false && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </QuestionBox>
  );
};
