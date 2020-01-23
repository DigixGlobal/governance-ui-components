import styled from 'styled-components';
import { H2 } from '@digix/gov-ui/components/common/common-styles';
import { Button } from '@digix/gov-ui/components/common/elements/index';

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

export const Title = styled(H2)`
  margin-top: 0;
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.8rem;
  text-transform: uppercase;
`;

export const Intro = styled.p`
  margin-top: 3rem;
  font-size: 1.6rem;
`;

export const Content = styled.div`
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

export const SpProposal = {
  SpContainer: styled.div`
    padding: 3.2rem 2.4rem 2.4rem 2.4rem;
  `,
  SpTitle: styled.h1`
    color: ${props => props.theme.textColor.primary.light.toString()};
    font-size: 2.4rem;
    margin-bottom: 2.4rem;
  `,
  SpParagraph: styled.p`
    line-height: 1.5;
    word-break: break-all;
  `,
  SpButton: styled(Button)`
    margin: 2.4rem 0 0 0;
    width: 100%;
  `,
};
