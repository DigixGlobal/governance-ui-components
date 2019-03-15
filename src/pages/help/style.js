import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  color: ${props => props.theme.textDefault.default.toString()};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 50vh;
  width: 320px;
  text-align: center;
  margin: 0 auto;

  svg {
    fill: ${props => props.theme.icon.default.light.toString()};
  }
`;
export const EmptyStateTitle = styled.div`
  font-size: 2rem;
  margin: 2rem 0 1rem;
`;

export const IconContainer = styled.div`
  width: 200px;
  display: block;
`;

export const ButtonLink = styled.span`
  border: 0;
  background: transparent;
  color: ${props => props.theme.linkSecondaryColor.default.toString()};
  display: block;
  text-transform: uppercase;
  padding: 1rem 2rem;
  margin: 1rem;
  &:hover {
    background: ${props => props.theme.backgroundTertiary.lighter.toString()};
    color: ${props => props.theme.linkSecondaryColor.default.toString()};
  }
`;
