import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background: ${colors.background};
`;

export const Content = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 80%;
  height: 45px;

  margin-top: 75px;

  form {
    display: flex;
    flex: 1;

    align-items: center;

    div {
      margin: 0 2px;
      input {
        &::placeholder {
          color: #686868;
        }
      }
    }

    button {
      max-width: 180px;
      width: 100%;
      height: 45px;
      margin-top: 0;
      margin-left: 8px;
    }
  }

  small {
    margin-top: 5px;
    margin-left: 3px;
  }

  @media (max-width: 800px) {
    width: 90%;
    height: 55px;
    margin-top: 85px;

    form {
      div {
        height: 55px;
      }

      button {
        height: 55px;
      }
    }
  }
`;

export const ButtonAddProduct = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 40px;

  a {
    color: ${colors.acept};
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;

    font-size: 18px;

    svg {
      margin-right: 8px;
    }
  }
`;

export const BoxProducts = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 80%;
  margin-top: 20px;

  @media (max-width: 800px) {
    width: 90%;
  }
`;
