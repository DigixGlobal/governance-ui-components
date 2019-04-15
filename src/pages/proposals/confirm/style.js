import styled from 'styled-components';

import { media } from '@digix/gov-ui/components/common/breakpoints';
import { Container } from '@digix/gov-ui/components/common/common-styles';

export const PreviewWrapper = styled.div``;
export const Section = styled.div``;
export const Title = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium';
  margin-bottom: 1rem;
`;
export const Content = styled.div`
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;
export const Heading = styled.div`
  color: ${props => props.theme.textDefault.light.toString()};
  font-family: 'Futura PT Medium';
  margin-bottom: 2rem;
`;
export const DataContent = styled.div`
  font-family: 'Futura PT Medium';
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;
export const RightCol = styled.div``;

export const Media = styled.div`
  ${Container};
  justify-content: space-between;
  align-items: flex-start;
`;

export const ImageHolder = styled.div`
  border-radius: ${props => props.theme.borderRadius};
  width: 100%;
  padding: 0;
  display: flex;
  flex-flow: row wrap;

  img {
    height: auto;
    width: 100%;
    margin: 0 2rem 0 0;
  }
`;

export const ImageItem = styled.div`
  flex: 0 1 calc(33% - 1rem);
  margin-right: 1rem;
  margin-bottom: 1rem;
  position: relative;
  padding: 0;
  border-bottom: 1px solid ${props => props.theme.card.border.lighter.toString()};

  &:last-child {
    border-bottom: none;
  }

  canvas {
    width: 100%;
  }

  ${media.tablet`
      flex: 0 1 calc(33% - 1rem);
  `}

  ${media.mobile`
    flex: 0 1 auto;
  `}
`;

export const CTA = styled.div`
  ${Container};
  justify-content: space-between;
`;
