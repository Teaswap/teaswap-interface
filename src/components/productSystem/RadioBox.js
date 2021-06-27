import React from 'react';
import styled from 'styled-components';
import { Radio } from './Radio';

const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 14px;
`;

export const RadioBox = ({ title, options, handleChange, oldValue}) => {
  return (
    <RadioContainer>
      {options.map((option) => (
        <Radio
          key={option.id}
          name={title}
          disable={option.disable || false}
          value={option.value?option.value:option.id}
          children={option.name}
          handleChange={handleChange}
          currentOption={oldValue}
        />
      ))}
    </RadioContainer>
  );
};
