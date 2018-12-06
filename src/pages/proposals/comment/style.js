import styled from 'styled-components';
import { H2 } from '../../../components/common/common-styles';

export const CommentFilter = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const Author = styled.div`
  margin: 2rem 0;

  span {
    font-family: 'Futura PT Medium';
  }
`;

export const ThreadedComments = styled.div``;

export const Title = styled(H2)`
  font-family: 'Futura PT Medium';
  color: ${props => props.theme.textPrimary.light.toString()};
`;

export const CommentList = styled.div``;

export const ParentCommentItem = styled.div`
  margin-bottom: 3rem;
`;

export const EditorContainer = styled.div`
  position: relative;
  & > button {
    background: #fff;
    border-width: 1px;
    position: absolute;
    bottom: 0;
    padding: 0.8rem 1rem;
    margin: 0.6rem 2rem;
    right: 0;
  }
`;

export const CommentEditor = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;

  & > div:last-child {
    display: flex;
    flex-direction: column-reverse;

    & > div:last-child {
      border-bottom: 0px;
      border-radius: 0;
      border-top: 1px solid #ccc !important;
    }
  }
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
  padding: 4rem 4rem 3rem 4rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const ActionBar = styled.div`
  margin-top: 2rem;
  margin-left: -1rem;
`;

export const CommentReplyPost = styled.div`
  margin-left: 5rem;
  margin-top: 1rem;
`;
