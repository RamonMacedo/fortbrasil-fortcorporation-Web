import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Container } from './styles';

const ResponsiveHeader: React.FC = () => {
  return (
    <>
      <Container>
        <Link to="/information">
          <img src={logo} alt="Mai$ Barato" />
        </Link>
      </Container>
    </>
  );
};

export default ResponsiveHeader;
