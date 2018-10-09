import styled from 'styled-components';

export const MenuContainer = styled.div`
  // width: 24.3rem;
  height: 100vh;
  padding: 2.5rem;
  background-color: ${props => props.theme.sidePanelBgColor.toString()};
  color: ${props => props.theme.textColorInverted.default.toString()};
  font-size: 1.6rem;
  box-shadow: 1rem 0.9rem 2.1rem rgba(128, 152, 213, 0.2);
  flex: 1 0 0;
`;

export const CloseMenu = styled.div`
  float: right;
  text-transform: uppercase;
  color: ${props => props.theme.textColorInverted.default.toString()};

  svg {
    fill: ${props => props.theme.textColorInverted.default.toString()};
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
  color: ${props => props.theme.primary.default.toString()};
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
`;

export const MenuItem = styled.li`
  padding-top: 2rem;
  color: ${props => props.theme.primary.default.toString()};
  /* text-transform: uppercase; */
  position: relative;

  > span {
    display: inline-block;
    position: absolute;
    top: 2.5rem;
    margin-left: 3.5rem;
  }
`;
