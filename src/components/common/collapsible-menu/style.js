import styled from 'styled-components';

import { colors } from '../../global';

export const MenuContainer = styled.div`
  width: 243px;
  height: 100vh;
  padding: 25px;
  background-color: ${colors.primary};
  color: ${colors.secondary};

`;

export const CloseMenu = styled.div`
  float: right;
  text-transform: uppercase;
  color: ${colors.secondary};


  svg {
    fill: ${colors.secondary}
  }

  div {
    position:relative;
    top:7px;
  }


`;

export const ProfileContainer = styled.div`
  margin-top: 50px;

  img {
    display:block;
  }
`;

export const Welcome = styled.p`
  margin-top: 20px;
  text-transform:uppercase;

`;

export const UserType = styled.p`
  margin-top: 5px;
  color: #4A90E2;
`;

export const MenuList = styled.ul `
  margin-top:50px;
  list-style: none;
`;

export const MenuItem = styled.li`
  padding-top: 20px;
  text-transform:uppercase;
`;