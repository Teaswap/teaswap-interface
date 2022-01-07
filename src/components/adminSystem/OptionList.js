import React from 'react';
import styled from 'styled-components';
import { DISTANCE } from '../../constants/style';
import { Nav } from '../NFTButton';

const OptionListContainer = styled.div`
  margin: ${DISTANCE.md} 0;
  min-width: max-content;
`;

const OptionListOuter = styled.ul`
  display: flex;
  align-items: center;
`;

const OptionItem = styled.li`
  list-style: none;
`;

export default function OptionList() {
  return (
    <OptionListContainer>
      <OptionListOuter>
        <OptionItem>
          <Nav children={'商品管理'} path={'/nft/admin'} $margin={0} />
        </OptionItem>
        <OptionItem>
          <Nav children={'用戶管理'} path={'/nft/admin/users'} />
        </OptionItem>
        <OptionItem>
          <Nav children={'查看意見箱'} path={'/nft/admin/mails'} $margin={0} />
        </OptionItem>
      </OptionListOuter>
    </OptionListContainer>
  );
}
