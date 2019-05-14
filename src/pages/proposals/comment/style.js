import styled, { css } from 'styled-components';
import { H2 } from '@digix/gov-ui/components/common/common-styles';
import { Button, TextArea } from '@digix/gov-ui/components/common/elements/index';

export const CommentFilter = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;

  span {
    font-family: 'Futura PT Heavy', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
`;

export const Author = styled.div`
  margin-top: 2rem;
  span {
    font-family: 'Futura PT Medium';
  }
`;

export const Title = styled(H2)`
  font-family: 'Futura PT Heavy', sans-serif;
  font-size: 1.8rem;
  color: ${props => props.theme.textColor.default.base.toString()};
  margin-top: 0;
`;

export const CommentList = styled.div``;

export const ParentCommentItem = styled.div`
  margin-bottom: 3rem;
`;

export const EditorContainer = styled.div`
  position: relative;
`;

export const CommentEditorContainer = styled.div`
  margin-top: 0.5em;
  position: relative;

  & .ql-toolbar.ql-snow {
    border-top-left-radius: ${props => props.theme.borderRadius};
    border-top-right-radius: ${props => props.theme.borderRadius};
  }

  & .ql-container.ql-snow {
    border-bottom-left-radius: ${props => props.theme.borderRadius};
    border-bottom-right-radius: ${props => props.theme.borderRadius};
  }

  ${props =>
    props.error &&
    css`
      & .ql-snow {
        border: 1px solid ${props.theme.alertMessage.error.default.toString()};
      }
    `};
`;

export const CommentEditor = styled.div``;

export const BannedCommentEditor = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: ${props => props.theme.textWhite.default.toString()};
  font-family: 'Futura PT Heavy';
  padding: 2rem;
  padding-top: 60px;
  position: absolute;
  text-align: center;
  top: 10px;

  height: calc(100% - 25px);
  width: 100%;
`;

export const CommentTextArea = styled(TextArea)`
  height: 15rem;
  resize: none;
`;

export const PostCommentButton = styled(Button)`
  margin-left: 0;
`;

export const UserInfo = styled.div`
  color: ${props =>
    props.isHidden
      ? props.theme.commentPost.admin.base.toString()
      : props.theme.commentPost.textColor.light.toString()};
  padding: 1rem 0;

  span {
    margin: 0 0.5rem;
    text-transform: capitalize;

    &:first-child {
      font-family: 'Futura PT Medium', sans-serif;
    }
  }
`;

export const Content = styled.div`
  font-weight: ${props => (props.isHidden ? 'bold' : 'normal')};
`;

export const CommentListItem = styled.div`
  ${props =>
    props.isHidden &&
    css`
      // color: ${props.theme.commentPost.admin.base.toString()};
    `};
`;

export const CommentPost = styled.div`
  background: ${props => props.theme.commentPost.background.base.toString()};
  border: 1px solid ${props => props.theme.commentPost.border.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  color: ${props => props.theme.textDefault.default.toString()};
  padding: 2rem 3rem 1rem 3rem;
  margin-top: ${props => (props.deleted ? 2 : 0)}rem;

  ${props =>
    props.deleted &&
    css`
      background: transparent,
      border: 1px solid ${props.theme.commentPost.border.lighter.toString()};
      color: ${props.theme.commentPost.textColor.light.toString()};
    `};

  ${props =>
    props.isHidden &&
    css`
      background: ${props.theme.commentPost.admin.fade.toString()};
      border: 1px solid ${props.theme.commentPost.admin.lightest.toString()};
      color: ${props.theme.commentPost.admin.base.toString()};
    `};
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  padding-bottom: 1rem;
  margin-top: 2rem;
  margin-left: -1rem;
  margin-bottom: -1rem;

  ${props =>
    props.isHidden &&
    css`
      border-top: 1px solid ${props.theme.commentPost.admin.fade.toString()};
    `};
`;

export const ButtonGroup = styled.div`
  margin-left: ${props => (props.first ? '-1rem' : '')};
`;

export const ActionCommentButton = styled(Button)`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  width: 90px;

  svg {
    fill: ${props => props.theme.commentPost.icon.base.toString()};
  }

  &:first-child svg {
    fill: none;
    stroke: ${props => props.theme.commentPost.icon.base.toString()};
    stroke-width: 1.5px;
  }

  span {
    color: ${props => props.theme.commentPost.textColor.base.toString()};
    font-family: 'Futura PT Medium', sans-serif;
    letter-spacing: 0.05rem;
  }

  ${props =>
    props.active &&
    css`
      svg {
        fill: ${props.theme.icon.active.base.toString()};
      }

      span {
        color: ${props.theme.icon.active.base.toString()};
      }
    `}

  ${props =>
    props.admin &&
    css`
      color: ${props.theme.commentPost.admin.light.toString()};

      svg {
        fill: ${props.theme.commentPost.admin.light.toString()};
      }
    `}
`;

export const CommentReplyPost = styled.div`
  margin-left: 5rem;
  margin-top: 1rem;
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.alertMessage.error.default.toString()};
  font-size: 1.4rem;
`;
