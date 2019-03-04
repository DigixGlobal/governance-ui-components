import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Select } from '@digix/gov-ui/components/common/elements/index';
import {
  Title,
  CommentFilter,
  CommentList,
  ThreadedComments,
} from '@digix/gov-ui/pages/proposals/comment/style';

import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import ParentThread from '@digix/gov-ui/pages/proposals/comment/thread';

import { CommentsApi } from '@digix/gov-ui/api/comments';
import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { getDaoProposalDetails } from '@digix/gov-ui/reducers/dao-server/actions';
import { initializePayload } from '@digix/gov-ui/api';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { UsersApi } from '@digix/gov-ui/api/users';

class CommentThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSeenId: 0,
      sortBy: 'latest',
      threads: null,
      userAddresses: [],
      userPoints: {},
    };

    this.FILTERS = [
      {
        text: 'Latest',
        value: 'latest',
      },
      {
        text: 'Oldest',
        value: 'oldest',
      },
    ];
  }

  componentDidMount() {
    const { ChallengeProof, getDaoProposalDetailsActions, proposalId } = this.props;
    if (!ChallengeProof.data) {
      return;
    }

    const { sortBy } = this.state;
    const payload = initializePayload(ChallengeProof);
    getDaoProposalDetailsActions({ proposalId, ...payload })
      .then(() => {
        this.fetchThreads({ sort_by: sortBy }, true);
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
    const sortBy = e.target.value;
    this.fetchThreads({ sort_by: sortBy }, true);
    this.setState({ sortBy });
  };

  addThread = body => {
    let threads = { ...this.state.threads };
    const { ChallengeProof, rootCommentId } = this.props;

    if (!ChallengeProof || !rootCommentId.data) {
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

  fetchThreads = (fetchParams, reset = false) => {
    const { ChallengeProof, rootCommentId } = this.props;
    if (!ChallengeProof.data || !rootCommentId.data) {
      return;
    }

    const payload = initializePayload(ChallengeProof);
    CommentsApi.getThread(rootCommentId.data.commentId, fetchParams, payload)
      .then(newThreads => {
        let { threads } = this.state;
        const newComments = newThreads.data;
        const lastSeenId =
          newThreads && newComments.length > 0
            ? newComments[newComments.length - 1].id
            : this.state.lastSeenId;

        if (reset || !threads) {
          threads = newThreads;
        } else {
          threads = {
            ...threads,
            hasMore: newThreads.hasMore,
            data: threads.data.concat(newComments),
          };
        }

        this.setState({ lastSeenId, threads });
      })
      .then(() => {
        this.fetchUserPoints();
      })
      .catch(() => {
        this.setError(CommentsApi.ERROR_MESSAGES.fetch);
      });
  };

  fetchUserPoints = () => {
    const { threads, userAddresses } = this.state;
    const { ChallengeProof, getAddressDetailsAction, uid } = this.props;

    // reputation points for first-time commenters
    // are not available in the previous endpoint
    getAddressDetailsAction(uid);

    if (!ChallengeProof.data) {
      return;
    }

    const previousUniqueAddressesCount = userAddresses.length;
    const newUniqueAddresses = CommentsApi.getUniqueUsers(userAddresses, threads);
    if (threads.length && previousUniqueAddressesCount === newUniqueAddresses.length) {
      return;
    }

    this.setState({ userAddresses: newUniqueAddresses });
    const payload = initializePayload(ChallengeProof);

    UsersApi.getPoints(newUniqueAddresses, payload)
      .then(userPoints => {
        const { addressDetails } = this.props;
        userPoints[uid] = {
          reputation: addressDetails.reputationPoint,
          quarterPoints: addressDetails.quarterPoint,
        };

        this.setState({ userPoints });
      })
      .catch(() => {
        this.setError(UsersApi.ERROR_MESSAGES.getPoints);
      });
  };

  loadMoreComments = () => {
    const { lastSeenId, sortBy } = this.state;
    this.fetchThreads({
      last_seen_id: lastSeenId,
      sort_by: sortBy,
    });
  };

  renderThreads = threads => {
    const { uid } = this.props;
    const { sortBy, userPoints } = this.state;

    return threads.data.map(thread => (
      <ParentThread
        key={thread.id}
        fetchUserPoints={this.fetchUserPoints}
        setError={this.setError}
        sortBy={sortBy}
        thread={thread}
        uid={uid}
        userPoints={userPoints}
      />
    ));
  };

  render() {
    const { rootCommentId } = this.props;
    const { threads } = this.state;
    const noComments = !rootCommentId || !threads || threads.data.length === 0;

    return (
      <ThreadedComments>
        <Title>Discussions</Title>
        <CommentTextEditor addComment={this.addThread} />
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
          </div>
        )}
        {threads && threads.hasMore && (
          <Button kind="text" xsmall onClick={() => this.loadMoreComments()}>
            Load more comments...
          </Button>
        )}
      </ThreadedComments>
    );
  }
}

const { func, object, string } = PropTypes;

CommentThread.propTypes = {
  addressDetails: object,
  ChallengeProof: object,
  getAddressDetailsAction: func.isRequired,
  getDaoProposalDetailsActions: func.isRequired,
  proposalId: string.isRequired,
  rootCommentId: object,
  showHideAlert: func.isRequired,
  uid: string,
};

CommentThread.defaultProps = {
  addressDetails: {
    reputationPoint: 0,
    quarterPoint: 0,
  },
  ChallengeProof: undefined,
  rootCommentId: undefined,
  uid: '',
};

const mapStateToProps = ({ daoServer, infoServer }) => ({
  addressDetails: infoServer.AddressDetails.data,
  ChallengeProof: daoServer.ChallengeProof,
  rootCommentId: daoServer.ProposalDaoDetails,
});

export default connect(
  mapStateToProps,
  {
    getAddressDetailsAction: getAddressDetails,
    getDaoProposalDetailsActions: getDaoProposalDetails,
    showHideAlert,
  }
)(CommentThread);
