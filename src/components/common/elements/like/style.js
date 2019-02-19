import styled from 'styled-components';

export const UpVote = styled.a`
  display: flex;
  align-content: center;
  color: ${props =>
    props.hasVoted
      ? props.theme.linkSecondaryColor.default.toString()
      : props.theme.linkDefaultColor.default.toString()};
  font-family: 'Futura PT Medium';
  &:visited {
    color: ${props =>
      props.hasVoted
        ? props.theme.linkSecondaryColor.default.toString()
        : props.theme.linkDefaultColor.default.toString()};
  }
  i::before {
    content: '';
    display: inline-block;
    height: 16px;
    width: 20px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M.667 5.667h2.666v8H.667v-8zm5.333 8h6c.553 0 1.027-.334 1.227-.814l2.013-4.7c.06-.153.093-.313.093-.486V6.333C15.333 5.6 14.733 5 14 5H9.793l.634-3.047.02-.213c0-.273-.114-.527-.294-.707l-.706-.7-4.394 4.394c-.24.24-.386.573-.386.94v6.666c0 .734.6 1.334 1.333 1.334zm0-8l2.893-2.894L8 6.333h6v1.334l-2 4.666H6V5.667z" id="a"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g mask="url(#b)" fill="#000" fill-opacity=".54"><path d="M0-1h16v16H0z"/></g></g></svg>');
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 0.25em;
  }
`;
