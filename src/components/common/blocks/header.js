import styled from 'styled-components';

const Header = styled.button`
  background: ${props => props.theme.mainBackgroundColor};
  color: ${props => props.theme.textColor};
  border: 15px solid ${props => props.theme.textColor};
`;

export default Header;
