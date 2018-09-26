import styled from 'styled-components';

import { colors } from '../../global';

export const MenuContainer = styled.div`
  width: 24.3rem;
  height: 100vh;
  padding: 2.5rem;
  background-color: ${colors.primary};
  color: ${colors.white};
  font-size: 1.6rem;

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
    top:1rem;
  }


`;

export const ProfileContainer = styled.div`
  margin-top: 5rem;

  img {
    display:block;
  }
`;

export const Welcome = styled.p`
  margin-top: 2rem;
  text-transform:uppercase;

`;

export const UserType = styled.p`
  margin-top: .5rem;
  color: #4A90E2;
`;

export const MenuList = styled.ul `
  margin-top:5rem;
  list-style: none;
`;

export const MenuItem = styled.li`
  padding-top: 2rem;
  text-transform:uppercase;
`;