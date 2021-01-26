import styled from 'styled-components';

import { shade } from 'polished';

import colors from '../../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background: ${colors.background};
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 18px;
  color: #5d5d5d;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #5d5d5d;
  margin-top: 12px;
  margin-bottom: 5px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormBox = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;

  margin-top: 40px;

  form {
    display: flex;
    flex: 1;

    max-width: 550px;
    width: 100%;

    flex-direction: column;
    padding: 50px;

    background-color: #fff;
    border-radius: 10px;

    border-radius: 10px;

    div {
      input {
        &::placeholder {
          color: #686868;
        }
      }
    }

    button {
      align-self: center;
      max-width: 320px;
      width: 100%;
      height: 45px;
      margin-top: 0;
      margin-left: 3px;
      background: ${colors.primary};

      margin-top: 45px;

      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, colors.primary)};
      }
    }
  }

  @media (max-width: 800px) {
    padding: 0 20px;

    form {
      margin-top: 60px;
      padding: 50px 30px;
      button {
        height: 55px;
      }
    }
  }
`;

export const Select = styled.div`
  background: #fff;
  border: 1px solid #8d8d8d;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;

  width: 100%;
  color: #373737;

  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;

  & + div {
    margin-right: 16px;
  }

  select {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    padding: 13px 15px;
    background: transparent;
    border: 0;
    color: #7b7b7b;
    width: calc(100% + 30px);

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    z-index: 2;

    option {
      background-color: #fff;
    }

    @media (max-width: 600px) {
      font-size: 18px;
      padding: 11px 15px;
    }
  }

  svg {
    position: absolute;
    right: 15px;
  }
`;

export const CityAndUfBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  > span {
    font-size: 14px;
    margin: 30px 0 12px 0;
    font-weight: 300;
    color: ${colors.default};
  }

  & + div {
    margin-left: 18px;
  }
`;

export const CityAndUfContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  margin-top: 0;
`;

export const ImportFileContainer = styled.section`
  background: #fff;
  border-radius: 5px;
`;

export const Footer = styled.section`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    color: #969cb3;

    img {
      margin-right: 5px;
    }
  }
`;
