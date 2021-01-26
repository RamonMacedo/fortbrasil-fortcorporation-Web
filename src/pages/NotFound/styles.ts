import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100vh;
  background: ${colors.primary};
`;

export const WellcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  background: ${colors.primary};

  > img {
    width: 100px;
  }

  > span {
    font-family: 'Open Sans';
    font-weight: 500;
    font-size: 1.4em;
    text-align: center;
    color: ${colors.white};
    margin-top: 16px;
  }
`;

export const Title = styled.p`
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 2.4em;
  margin-top: 30px;
  color: ${colors.white};
  text-align: center;
`;
