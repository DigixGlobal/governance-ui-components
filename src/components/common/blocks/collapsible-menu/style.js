import styled from 'styled-components';

export const MenuContainer = styled.div`
  padding: 2.5rem;
  padding-right: 0;
  background: ${props => props.theme.backgroundLeftPanel.default.toString()};
  border-right: ${props => props.theme.borderColor.lightest.toString()};
  color: ${props => props.theme.textContrast.default.toString()};
  font-size: 1.6rem;
  box-shadow: ${props => props.theme.boxShadow};
  flex: 1 0 0;
  height: 100vh;
`;

export const CloseMenu = styled.div`
  float: right;
  text-transform: uppercase;
  color: ${props => props.theme.textContrast.default.toString()};

  svg {
    fill: ${props => props.theme.textContrast.default.toString()};
  }

  div {
    position: relative;
    top: 1rem;
  }
`;

export const ProfileContainer = styled.div`
  margin-top: 5rem;

  img {
    display: block;
  }
`;

export const Welcome = styled.div`
  margin: 2rem 0;
  font-size: 1.4rem;
  font-family: 'Futura PT Medium';
  color: ${props => props.theme.textPrimary.default.toString()};
  span {
    font-family: 'Futura PT Light';
    display: block;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const UserType = styled.p`
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: #c19f58;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.borderColor.default.toString()};
`;

export const MenuList = styled.ul`
  margin-top: 5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.li`
  color: ${props =>
    props.selected
      ? props.theme.textSecondary.default.toString()
      : props.theme.textDefault.default.toString()};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;
  cursor: pointer;
  border-right: 4px solid
    ${props => (!props.selected ? 0 : props.theme.backgroundSecondary.default.toString())};
  > span {
    font-family: 'Futura PT Book';
    display: inline-block;
    position: absolute;
    top: 0rem;
    margin-left: 4.5rem;
  }
  > svg {
    fill: orangered;
    color: orangered;
    stroke: orangered;
  }
`;
