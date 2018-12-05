import React from 'react';

import { Button, Select } from '../../../components/common/elements/index';

import {
  CommentFilter,
  ThreadedComments,
  Title,
  CommentEditor,
  CommentList,
  CommentListItem,
  CommentPost,
  UserInfo,
  ActionBar,
  CommentReplyPost,
} from './style';

class CommentThread extends React.Component {
  renderCommentListItem = () => {
    const thread = [];

    for (let i = 0; i < 2; i++) {
      thread.push(
        <CommentListItem>
          <UserInfo>
            0x7246DF13354a6a3222078fA948D682D81d83cAAe <span>•</span> Reputation Points: 123{' '}
            <span>•</span> Quarter Points: 123
          </UserInfo>
          <CommentPost>
            <p>
              Lorem ipsum dolor sit amet, an augue vivendo referrentur usu, paulo zril epicurei id
              per. Et vis tantas iriure quaestio. Ut habemus similique eum, quas voluptaria mei cu.
              Vel ne zril gloriatur complectitur. No stet percipit nominati vis. Everti pertinax
              assentior vis ea.
            </p>
            <p>
              Has id utamur saperet insolens, suas augue inani et pro. Mea ex augue omittantur,
              dicat postulant voluptaria an mei. Ad simul luptatum sea, quo ex corrumpit
              reformidans, feugait denique no vix. Dicta evertitur reformidans ei quo, ad quo doming
              oblique repudiare, ea laoreet mediocritatem eam.
            </p>
            <ActionBar>
              <Button kind="iconLabeled">Reply</Button>
              <Button kind="iconLabeled">Like</Button>
              <Button kind="iconLabeled">Trash</Button>
            </ActionBar>
          </CommentPost>
          <CommentReplyPost>
            <UserInfo>
              0x7246DF13354a6a3222078fA948D682D81d83cAAe <span>•</span> Reputation Points: 123{' '}
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
                <Button kind="iconLabeled">Reply</Button>
                <Button kind="iconLabeled">Like</Button>
                <Button kind="iconLabeled">Trash</Button>
              </ActionBar>
            </CommentPost>
          </CommentReplyPost>
        </CommentListItem>
      );
    }
    return thread;
  };

  render() {
    return (
      <ThreadedComments>
        <Title>Discussion</Title>
        <CommentEditor>Text Area</CommentEditor>
        <CommentFilter>
          <Select
            small
            id="test"
            items={[{ text: 'Latest', value: 'latest' }, { text: 'Oldest', value: 'oldest' }]}
          />
        </CommentFilter>
        <CommentList>{this.renderCommentListItem()};</CommentList>
      </ThreadedComments>
    );
  }
}
export default CommentThread;
