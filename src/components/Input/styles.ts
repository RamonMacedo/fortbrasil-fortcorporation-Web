import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #FFF;
  border: 1px solid #B4B4B4;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 15px;


  width: 100%;
  color: #7C7C7C;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${colors.primary};
      border-color: ${colors.primary};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${colors.primary};
    `}


  input {
    flex: 1;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    background: transparent;
    border: 0;
    color: #7C7C7C;

    &::placeholder {
      color: #686868;
    }
  }

  svg {
    margin-right: 12px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    text-align: center;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
