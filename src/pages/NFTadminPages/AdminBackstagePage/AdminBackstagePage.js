import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/userHooks/useUser';
import { useNavigate } from 'react-router-dom';
import { COLOR, FONT, DISTANCE } from '../../../constants/style';
import { OptionList, ExamineProduct } from '../../../components/adminSystem';
import { ThickNavPage } from '../../../components/Page';

const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  padding: 30px 0;
`;

const Title = styled.h1`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
  margin-top: ${DISTANCE.lg};
`;

const AdminBackstagePage = () => {
  const navigate = useNavigate();
  const { handleGetMe } = useUser();

  useEffect(() => {
    handleGetMe().then((result) => {
      if (!result.data || !result.data.is_admin) return navigate('/');
    });
  }, []);

  return (
    <ThickNavPage>
      <Wrapper>
        <Title>後台管理系統</Title>
        <OptionList />
        <Title>商品審查</Title>
        <ExamineProduct />
      </Wrapper>
    </ThickNavPage>
  );
};

export default AdminBackstagePage;
