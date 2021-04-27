import styled from 'styled-components';
import { MEDIA_QUERY } from '../constants/style';

export const StandardNavPage = styled.div`
  min-height: 50vh;
  top: -40px;
  width: 100%;
  max-width: 1400px;
  position: relative;
  ${MEDIA_QUERY.md} {
    margin: 0 auto;
    padding: 30px;
  }
;
`;

export const ThickNavPage = styled.div`
  min-height: 50vh;
  top: -40px;
  position: relative;
`;

export const ThickNavTwoColumnsPage = styled.div`
  display: flex;
  margin-top: 65px;
  height: calc(100vh - 95px);
  width: 100%;
  top: -40px;
  position: relative;
`;
