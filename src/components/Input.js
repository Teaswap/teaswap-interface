import styled from 'styled-components';
import { EFFECT, MEDIA_QUERY } from '../constants/style';

export const InputSearch = styled.input`
  width: 100%;
  height: 45px;
  outline: none;
  border: none;
  margin-left: 10px;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  background: rgba(0, 0, 0, 0);
`;

export const InputComponent = styled.input`
  height: 30px;
  width: calc(100% - 6px);
  max-width: 600px;
  border-width: 1px;
  // box-shadow: ${EFFECT.shadowInput};
  border-radius: 0px;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  padding: 3px;
  margin: ${(props) => (props.$margin === 0 ? '0' : '20px')};
  padding-left: 10px;
  ${MEDIA_QUERY.sm} {
    width: 90%;
  }
`;

export const TextAreaComponent = styled.textarea`
  width: calc(100% - 10px);
  max-width: 600px;
  box-shadow: ${EFFECT.shadowInput};
  border-radius: 0px;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  padding: 5px;
  margin: ${(props) => (props.$margin === 0 ? '0' : '20px')};
`;
