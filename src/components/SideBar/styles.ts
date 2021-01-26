import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div``;

export const ButtonMenu = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 1.2rem;
  z-index: 20000;
  font-size: 2rem;
  border: none;
  background: transparent;
`;

export const Header = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-bottom: 1px solid #2b2b2b;
  background-color: ${colors.white};

  img {
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }

  div {
    font-size: 20px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    color: ${colors.primary};
  }
`;

export const ContentFooter = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;

  a + a {
    margin-left: 16px;
  }
`;
