import styled from 'styled-components';
import { MEDIA_QUERY } from '../constants/style';

export const StandardNavPage = styled.div`
  min-height: 50vh;
  width: 100%;
  max-width: 1400px;
  position: relative;
  ${MEDIA_QUERY.md} {
    margin: 0 auto;
    padding: 30px;
  }
  ${MEDIA_QUERY.sm} {
    padding: 0px;
  }
;
`;

export const ThickNavPage = styled.div`
  width: 100%;
  max-width: 1400px;
  min-height: 50vh;
  position: relative;
  margin-top: 50px;
  padding: 20px;
  padding-bottom: 50px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 16px 24px rgba(0, 0, 0, 0.1),
  0px 24px 32px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY.sm} {
    width: 90%;
    padding: 20px 2%;
  }
`;

export const ThickNavTwoColumnsPage = styled.div`
  display: flex;
  margin-top: 65px;
  height: calc(100vh - 95px);
  width: 100%;
  top: -40px;
  position: relative;
`;
