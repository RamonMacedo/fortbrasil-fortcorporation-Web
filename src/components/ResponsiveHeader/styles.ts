import styled from 'styled-components';

export const Container = styled.div`
  display: none;

  & img {
    height: 2rem;
  }

  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    position: absolute;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;
  }
`;
