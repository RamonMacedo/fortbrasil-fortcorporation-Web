import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const apperFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  animation: ${apperFromLeft} 1s;

  h1 {
    font-size: 22px;
    font-weight: 600;
    margin: 10px 0px;
    text-align: left;
    color: ${colors.primary};
  }

  img {
    align-self: center;
  }

  form {
    margin: 15px 0;
    width: 340px;
    text-align: center;

    a {
      color: #7c7c7c;
      text-align: right;
      display: block;
      margin-top: 15px;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 15px;

      &:hover {
        color: ${shade(0.2, '#7C7C7C')};
      }

      @media (max-width: 900px) {
        font-size: 12px;
      }
    }

    button {
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      margin-top: 20px;
    }
  }

  p {
    margin-top: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;

    @media (max-width: 900px) {
      font-size: 12px;
    }
  }
`;
