import styled from 'styled-components';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const Container = styled.div`
  min-height: 100vh;
  height: 100vh;
  background: ${props => props.theme.backgroundTertiary.lightest.toString()};
`;

export const ContentWrapper = styled.div`
  background: ${props => props.theme.backgroundTertiary.lightest.toString()};
  // min-height: 100vh;
  min-height: 100%;
  padding: 12rem;

  ${media.tablet`padding: 12rem 8rem;`}
  ${media.mobile`padding: 12rem 3rem;`}

  overflow: auto;
`;
