import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Select } from '@digix/gov-ui/components/common/elements/index';
import {
  CommentFilter,
  CommentList,
  ThreadedComments,
} from '@digix/gov-ui/pages/proposals/comment/style';

import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import ParentThread from '@digix/gov-ui/pages/proposals/comment/thread';

import { getDaoProposalDetails } from '@digix/gov-ui/reducers/dao-server/actions';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { initializePayload } from '@digix/gov-ui/api';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';

class CommentThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: null,
    };

    this.FILTERS = [
      {
        text: 'Latest',
        value: 'desc',
      },
      {
        text: 'Oldest',
        value: 'asc',
      },
    ];

    this.DEFAULT_FETCH_PARAMS = {
      sort_by: 'desc',
    };
  }

  componentDidMount() {
    const { ChallengeProof, getDaoProposalDetailsActions, proposalId } = this.props;

    if (!ChallengeProof.data) {
      return;
    }

    const payload = initializePayload(ChallengeProof);
    getDaoProposalDetailsActions({ proposalId, ...payload })
      .then(() => {
        this.fetchThreads(this.DEFAULT_FETCH_PARAMS);
      })
      .catch(() => {
        this.setError(CommentsApi.ERROR_MESSAGES.fetch);
      });
  }

  setError = error => {
    const message = JSON.stringify((error && error.message) || error);
    this.props.showHideAlert({ message });
    document.body.scrollTop = 0;
  };

  handleFilterChange = e => {
    this.fetchThreads({
      sort_by: e.target.value,
    });
  };

  addThread = body => {
    let threads = { ...this.state.threads };
    const { ChallengeProof, rootCommentId } = this.props;

    if (!ChallengeProof || !rootCommentId) {
      return;
    }

    const payload = initializePayload(ChallengeProof);
    CommentsApi.create(rootCommentId, body, payload)
      .then(newComment => {
        if (!threads) {
          threads = CommentsApi.generateNewThread(newComment);
        } else {
          threads.data.push(newComment);
        }

        this.setState({ threads });
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch(() => {
        this.setError(CommentsApi.ERROR_MESSAGES.createComment);
      });
  };

  fetchThreads = fetchParams => {
    const { ChallengeProof, rootCommentId } = this.props;
    if (!ChallengeProof.data || !rootCommentId) {
      return;
    }

    const payload = initializePayload(ChallengeProof);
    CommentsApi.getThread(rootCommentId, fetchParams, payload)
      .then(threads => {
        this.setState({ threads });
      })
      .catch(() => {
        this.setError(CommentsApi.ERROR_MESSAGES.fetch);
      });
  };

  renderThreads = threads => {
    const { uid } = this.props;
    return threads.data.map(thread => (
      <ParentThread key={thread.id} setError={this.setError} thread={thread} uid={uid} />
    ));
  };

  render() {
    const { rootCommentId, uid } = this.props;
    const { threads } = this.state;
    const noComments = !rootCommentId || !threads || threads.data.length === 0;

    return (
      <ThreadedComments>
        <CommentTextEditor uid={uid} addComment={this.addThread} />
        {noComments && <p>There are no comments to show.</p>}
        {!noComments && (
          <div>
            <CommentFilter>
              <Select
                small
                id="comment-filter"
                items={this.FILTERS}
                onChange={this.handleFilterChange}
              />
            </CommentFilter>
            <CommentList>{this.renderThreads(threads)}</CommentList>
            {threads.hasMore && <a href="#">Load more comments...</a>}
          </div>
        )}
      </ThreadedComments>
    );
  }
}

const { func, number, object, string } = PropTypes;

CommentThread.propTypes = {
  ChallengeProof: object,
  getDaoProposalDetailsActions: func.isRequired,
  proposalId: string.isRequired,
  rootCommentId: number,
  showHideAlert: func.isRequired,
  uid: string,
};

CommentThread.defaultProps = {
  ChallengeProof: undefined,
  rootCommentId: 0,
  uid: '',
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  rootCommentId: state.daoServer.ProposalDaoDetails.data.commentId,
});

export default connect(
  mapStateToProps,
  {
    getDaoProposalDetailsActions: getDaoProposalDetails,
    showHideAlert,
  }
)(CommentThread);
