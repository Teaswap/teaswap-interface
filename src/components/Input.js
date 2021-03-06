import styled from 'styled-components';
import { EFFECT, MEDIA_QUERY } from '../constants/style';

export const InputSearch = styled.input`
padding-left: .75rem;
  width: 100%;
  height: 35px;
  outline: none;
  border: 1px solid #e6e6e6;
  margin-left: 10px;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  background: rgba(0, 0, 0, 0);
  box-shadow: ${EFFECT.shadowLight};

  focus: {
    transform: scale(500px, 0.5);
   
  }
`;

export const InputComponent = styled.input`
  height: 30px;
  width: calc(100% - 10px);
  max-width: 600px;
  //  border-width: 1px;
  //  box-shadow: ${EFFECT.shadowInput};
  border-radius: 0px;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  padding: 3px;
  margin: ${(props) => (props.$margin === 0 ? '0' : '20px')};
  outline: none;
  padding-left: 10px;
  border: 1px solid #cccccc;
  :hover,
  :focus {
    border: 1px solid #474747;
  }

  ${MEDIA_QUERY.sm} {
    width: 90%;
  }

`;

export const TextAreaComponent = styled.textarea`
  width: calc(100% - 10px);
  max-width: 600px;
 // box-shadow: ${EFFECT.shadowInput};
  border-radius: 0px;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  padding: 5px;
  outline: none;
  margin: ${(props) => (props.$margin === 0 ? '0' : '20px')};
  border: 1px solid #cccccc;
  :hover,
  :focus {
    border: 1px solid #474747;
  }
`;
