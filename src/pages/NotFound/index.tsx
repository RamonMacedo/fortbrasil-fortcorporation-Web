import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import Button from '../../components/Button';

import { Container, WellcomeContent, Title } from './styles';

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <Container>
        <WellcomeContent>
          <img src={logo} alt="Logo" />
          <Title>404</Title>
          <span>Página não encontrada!!</span>
          <Button onClick={() => history.goBack()}>
            Voltar para Dashboard
          </Button>
        </WellcomeContent>
      </Container>
    </>
  );
};

export default NotFound;
