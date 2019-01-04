import styled, { css } from 'styled-components';
import { H2 } from '@digix/gov-ui/components/common/common-styles';
import { Button, TextArea } from '@digix/gov-ui/components/common/elements/index';

export const CommentFilter = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const Author = styled.div`
  margin-top: 2rem;
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
`;

export const CommentEditor = styled.div``;

export const CommentTextArea = styled(TextArea)`
  height: 15rem;
  resize: none;
`;

export const PostCommentButton = styled(Button)`
  margin-left: 0;
  ${props =>
    props.disabled &&
    css`
      border-width: 1px;
      background-color: transparent;
      border-color: ${props.theme.buttonBorderDisabled.light.toString()};
      color: ${props.theme.buttonTextDefault.light.toString()};

      &:hover {
        border-color: ${props.theme.buttonBorderDisabled.light.toString()};
        color: ${props.theme.buttonTextDefault.light.toString()};
      }
    `};
`;

export const UserInfo = styled.div`
  padding: 1rem 0;
  font-family: 'Futura PT Medium';
  span {
    margin: 0 1.2rem;
  }
`;

export const CommentPost = styled.div`
  background: ${props =>
    props.deleted
      ? props.theme.backgroundTertiary.lightest.toString()
      : props.theme.backgroundDefault.default.toString()};
  border: 1px solid
    ${props =>
      props.deleted
        ? props.theme.backgroundTertiary.lighter.toString()
        : props.theme.borderColor.lighter.toString()};
  border-radius: 4px;
  box-shadow: ${props => props.theme.boxShadow};
  color: ${props =>
    props.deleted
      ? props.theme.textDefault.light.toString()
      : props.theme.textDefault.default.toString()};
  padding: 2rem 3rem 2rem 3rem;
  margin-top: ${props => (props.deleted ? 2 : 0)}rem;
`;

export const ActionBar = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  margin-top: 2rem;
  margin-left: -1rem;
`;

export const ActionCommentButton = styled(Button)`
  margin: 1rem 0.5rem;
  margin-bottom: -1rem;
  padding: 1rem;

  &:first-child {
    margin-left: -1rem;
  }
`;

export const CommentReplyPost = styled.div`
  margin-left: 5rem;
  margin-top: 1rem;
`;

export const LoadMoreButton = styled(Button)`
  margin-left: -2rem;
`;
