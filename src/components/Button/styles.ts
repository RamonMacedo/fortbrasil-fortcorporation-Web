import styled from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.button`
  background: ${colors.primary};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, colors.primary)};
  }
`;
