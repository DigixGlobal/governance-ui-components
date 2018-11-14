import styled from 'styled-components';
import { Container } from '../../../components/common/common-styles';

export const PreviewWrapper = styled.div``;
export const Section = styled.div``;
export const Title = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium';
  margin-bottom: 1rem;
`;
export const Content = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 5rem;
`;
export const Heading = styled.div`
  color: ${props => props.theme.textDefault.lighter.toString()};
  font-family: 'Futura PT Medium';
  margin-bottom: 2rem;
`;
export const DataContent = styled.div`
  font-family: 'Futura PT Medium';
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const Media = styled.div`
  ${Container};
  justify-content: space-between;
  align-items: flex-start;
`;

export const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;
export const RightCol = styled.div``;

export const ImageHolder = styled.div`
  background-color: ${props => props.theme.backgroundPrimary.default.toString()};
  border-radius: 3px;
  min-width: 500px;
  height: 200px;
  & > img {
    max-width: 500px;
    max-height: 200px;
  }
`;
