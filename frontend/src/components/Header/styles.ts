import styled from 'styled-components';

export const Container = styled.header`
  background-color: #1169B0;
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 32px;
`;

export const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  gap: 27px;

  a {
    color: #fff;
    text-decoration: none;
  }
`

export const ActionsMenu = styled.nav`
  display: flex;
  gap: 20px;
  button {
    color: #91BCDF;
    background-color: transparent;
    border-color: #D9D9D9;
    border-bottom: 0px;
    border-left: 0px;
    border-top: 0px;
    padding-right: 20px;
  }
`;