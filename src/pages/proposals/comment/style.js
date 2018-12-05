import styled, { css } from 'styled-components';
import { H2 } from '../../../components/common/common-styles';

export const CommentFilter = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const ThreadedComments = styled.div``;

export const Title = styled(H2)`
  font-family: 'Futura PT Medium';
  color: ${props => props.theme.textPrimary.light.toString()};
`;

export const CommentList = styled.div``;

export const CommentListItem = styled.div`
  margin-bottom: 3rem;
`;

export const CommentEditor = styled.div`
  border: 1px solid #ccc;
`;

export const UserInfo = styled.div`
  padding: 1rem 0;
  font-family: 'Futura PT Medium';

  span {
    margin: 0 1.2rem;
  }
`;

export const CommentPost = styled.div`
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: 4px;
  padding: 5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const ActionBar = styled.div`
  border: 1px solid #ccc;
  margin-top: 2rem;
`;

export const CommentReplyPost = styled.div`
  margin-left: 5rem;
  margin-top: 1rem;
`;
