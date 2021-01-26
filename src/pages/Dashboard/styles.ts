import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background: ${colors.background};
`;

export const WellcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${colors.primary};
  /* padding-left: 250px; */
  @media (max-width: 800px) {
    padding-left: 0px;
  }

  > img {
    width: 100px;
  }

  > span {
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 1.2em;
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
