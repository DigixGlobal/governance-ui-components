import styled from 'styled-components';

export const MenuContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 280px;
  max-width: 280px;
  padding: 8rem 2.5rem;
  padding-right: 0;
  background: ${props => props.theme.backgroundLeftPanel.default.toString()};
  border-right: ${props => props.theme.borderColor.lightest.toString()};
  color: ${props => props.theme.textContrast.default.toString()};
  font-size: 1.4rem;
  box-shadow: ${props => props.theme.boxShadow};
  flex: 1 0 0;
  z-index: 1;
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
  margin: 5rem 2.5rem 0 0;

  img {
    display: block;
  }
`;

export const Welcome = styled.div`
  margin: 2rem 0;
  font-family: 'Futura PT Medium';
  color: ${props => props.theme.textPrimary.default.toString()};
  span {
    font-family: 'Futura PT Book';
    text-overflow: ellipsis;
    overflow: hidden;
    width: 180px;
  }
`;

export const UserType = styled.p`
  margin-top: 0.5rem;
  font-size: 1.4rem;
  font-family: 'Futura PT Medium';
  color: ${props => props.theme.textSecondary.default.toString()};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
`;

export const MenuList = styled.ul`
  margin-top: 5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.li`
  & > a {
    color: ${props =>
      props.selected
        ? props.theme.textSecondary.default.toString()
        : props.theme.textDefault.light.toString()};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 3rem;
    position: relative;
    border-right: 4px solid
      ${props => (!props.selected ? 0 : props.theme.backgroundSecondary.default.toString())};
    > span {
      font-family: 'Futura PT Medium';
      display: inline-block;
    }
  }
`;
