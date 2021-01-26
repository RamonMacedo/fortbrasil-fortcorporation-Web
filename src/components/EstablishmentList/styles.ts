import styled from 'styled-components';

import { shade } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  border: 1px solid #d7d7d7;
  box-sizing: border-box;

  margin-bottom: 12px;

  @media (max-width: 960px) {
    flex-direction: column;
    margin-bottom: 25px;
    border: unset;
    box-sizing: unset;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const ContentInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 10px;

  justify-content: space-between;
  text-transform: capitalize;

  div:first-child {
    font-family: 'Open Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
`;

export const ContentImg = styled.img`
  width: 85px;
  height: 70px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  max-width: 300px;
  margin-right: 20px;

  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 600;

  div:first-child {
    margin-right: 20px;
  }

  @media (max-width: 960px) {
    max-width: 100%;
    margin-right: 0px;
    margin-top: 20px;
  }
`;

export const EditButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: transparent;
  height: 45px;
  border-radius: 5px;
  border: solid 1px ${colors.editButton};
  padding: 0 16px;
  color: ${colors.editButton};
  width: 100%;
  font-weight: 500;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, colors.editButton)};
    border: solid 1px ${shade(0.2, colors.editButton)};
    color: #fff;
  }

  svg {
    margin-right: 5px;
  }
`;

export const DeleteButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 45px;
  border-radius: 5px;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  border: solid 1px ${colors.deleteButton};
  color: ${colors.deleteButton};
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, colors.deleteButton)};
    border: solid 1px ${shade(0.2, colors.deleteButton)};
    color: #fff;
  }

  svg {
    margin-right: 5px;
  }
`;
