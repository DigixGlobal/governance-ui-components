import styled from 'styled-components';
import { H2 } from '@digix/gov-ui/components/common/common-styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.backgroundTertiary.lighter.toString()};
  flex: 5 0 0;
  padding: 12em;
  margin-left: 15%;
`;

export const Title = styled(H2)``;

export const TosWrapper = styled.div`
  padding: 1rem 2rem;
`;

export const TosOverlay = styled.div`
  max-height: 65vh;
  overflow-y: scroll;
  background: none;
  border-top: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  padding: 0;

  p {
    font-size: 1.6rem;
  }

  div {
    padding: 2rem 0;
  }

  strong {
    font-family: 'Futura PT Medium', sans-serif;
  }
`;
