import React from 'react';
import styled from 'styled-components';
import { EFFECT } from '../../constants/style';

const Select = styled.select`
  height: 30px;
  width: 100px;
  box-shadow: ${EFFECT.shadowInput};
  border-radius: 0px;
  outline: none;
  border: none;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  padding: 3px;
`;

export const SelectBox = ({ options, handleChange, value, oldValue }) => {
  return (
    <Select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option value={option} key={option} defaultValue={oldValue === option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
