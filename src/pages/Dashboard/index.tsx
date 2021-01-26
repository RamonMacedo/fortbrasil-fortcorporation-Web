import React from 'react';

import ResponsiveHeader from '../../components/ResponsiveHeader';
import logoWhite from '../../assets/logo-white.svg';

import { Container, WellcomeContent, Title } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Container>
        <ResponsiveHeader />
        <WellcomeContent>
          <img src={logoWhite} alt="Logo" />
          <Title>
            Bem-vindo ao Painel da <br />
            <strong>Fort Corporation</strong>
          </Title>
          <span>Soluções para o seu negócio!</span>
        </WellcomeContent>
      </Container>
    </>
  );
};

export default Dashboard;
