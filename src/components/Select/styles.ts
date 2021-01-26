import styled from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
`;

export const Error = styled(Tooltip)`
  position: absolute;
  top: 0;
  margin-top: 12px;
  right: 52px;
  height: 20px;

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
