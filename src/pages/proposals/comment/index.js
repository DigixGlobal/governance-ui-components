import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../forms/quill.css';

import { Button, Icon, Select } from '../../../components/common/elements/index';

import {
  CommentFilter,
  Author,
  EditorContainer,
  ThreadedComments,
  Title,
  CommentEditor,
  CommentList,
  ParentCommentItem,
  CommentPost,
  UserInfo,
  ActionBar,
  CommentReplyPost,
} from './style';

class CommentThread extends React.Component {
  render() {
    return (
      <ThreadedComments>
        <Title>Discussion</Title>

        <EditorContainer>
          <Button kind="round" primary ghost>
            Comment
          </Button>
          <CommentEditor>
            <Author>
              Comment as <span>0x7246DF13354a6a3222078fA948D682D81d83cAAe</span>
            </Author>
            <ReactQuill id="details" />
          </CommentEditor>
        </EditorContainer>
        <CommentFilter>
          <Select
            small
            id="test"
            items={[{ text: 'Latest', value: 'latest' }, { text: 'Oldest', value: 'oldest' }]}
          />
        </CommentFilter>
        <CommentList>
          <ParentCommentItem>
            <UserInfo>
              0x7246DF13354a6a3222078fA948D682D81d83cAAe <span>•</span> Reputation Points: 123
              <span>•</span> Quarter Points: 123
            </UserInfo>
            <CommentPost>
              <p>
                Lorem ipsum dolor sit amet, an augue vivendo referrentur usu, paulo zril epicurei id
                per. Et vis tantas iriure quaestio. Ut habemus similique eum, quas voluptaria mei
                cu. Vel ne zril gloriatur complectitur. No stet percipit nominati vis. Everti
                pertinax assentior vis ea.
              </p>
              <p>
                Has id utamur saperet insolens, suas augue inani et pro. Mea ex augue omittantur,
                dicat postulant voluptaria an mei. Ad simul luptatum sea, quo ex corrumpit
                reformidans, feugait denique no vix. Dicta evertitur reformidans ei quo, ad quo
                doming oblique repudiare, ea laoreet mediocritatem eam.
              </p>
              <ActionBar>
                <Button kind="text" xsmall>
                  <Icon kind="reply" />
                  Reply
                </Button>
                <Button kind="text" xsmall>
                  <Icon kind="like" />
                  Like
                </Button>
                <Button kind="text" xsmall>
                  <Icon kind="trash" />
                  Trash
                </Button>
              </ActionBar>
            </CommentPost>
            <CommentReplyPost>
              <UserInfo>
                0x7246DF13354a6a3222078fA948D682D81d83cAAe <span>•</span> Reputation Points: 123
                <span>•</span> Quarter Points: 123
              </UserInfo>
              <CommentPost>
                <p>
                  Lorem ipsum dolor sit amet, an augue vivendo referrentur usu, paulo zril epicurei
                  id per. Et vis tantas iriure quaestio. Ut habemus similique eum, quas voluptaria
                  mei cu. Vel ne zril gloriatur complectitur. No stet percipit nominati vis. Everti
                  pertinax assentior vis ea.
                </p>
                <p>
                  Has id utamur saperet insolens, suas augue inani et pro. Mea ex augue omittantur,
                  dicat postulant voluptaria an mei. Ad simul luptatum sea, quo ex corrumpit
                  reformidans, feugait denique no vix. Dicta evertitur reformidans ei quo, ad quo
                  doming oblique repudiare, ea laoreet mediocritatem eam.
                </p>
                <ActionBar>
                  <Button kind="text" xsmall>
                    <Icon kind="reply" />
                    Reply
                  </Button>
                  <Button kind="text" xsmall>
                    <Icon kind="like" />
                    Like
                  </Button>
                  <Button kind="text" xsmall>
                    <Icon kind="trash" />
                    Trash
                  </Button>
                </ActionBar>
              </CommentPost>
            </CommentReplyPost>
          </ParentCommentItem>
        </CommentList>
      </ThreadedComments>
    );
  }
}

export default CommentThread;
