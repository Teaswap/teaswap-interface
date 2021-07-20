import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/style';
const RadioInput = styled.input`
  margin-right: 10px;
  font-size: 12px;
`;

const RadioLabel = styled.label`
  color: #474747;
  // width: 150px;
  margin: 5px 10px;
`;

export const Radio = ({
  children,
  value,
  name,
  handleChange,
  currentOption,
  disable
}) => {
  return (
    <RadioLabel>
      <RadioInput
        disabled={disable}
        $margin={0}
        rows='15'
        type='radio'
        value={value}
        name={name}
        onChange={handleChange}
        checked={currentOption && value == currentOption}
      />
      {children}
    </RadioLabel>
  );
};
