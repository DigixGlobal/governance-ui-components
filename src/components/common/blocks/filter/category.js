import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Category, CategoryItem } from './style';

import { getProposalsCount } from '../../../../reducers/info-server/actions';

export class CategoryGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'all',
    };
  }

  componentDidMount = () => {
    this.props.getProposalsCountAction();
  };

  handleClick(param) {
    const { onStageChange, getProposalsCountAction } = this.props;
    if (onStageChange) {
      this.setState({ stage: param });
      onStageChange(param);
      getProposalsCountAction();
    }
  }

  render() {
    const { stage } = this.state;
    const { ProposalsCount } = this.props;

    return (
      <Category stage={stage}>
        <CategoryItem
          onClick={() => this.handleClick('all')}
          active={stage.toLowerCase() === 'all'}
        >
          All <span>{ProposalsCount.data.all || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('idea')}
          active={stage.toLowerCase() === 'idea'}
        >
          Idea <span>{ProposalsCount.data.idea || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('draft')}
          active={stage.toLowerCase() === 'draft'}
        >
          Draft <span>{ProposalsCount.data.draft || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('proposal')}
          active={stage.toLowerCase() === 'proposal'}
        >
          Proposal <span>{ProposalsCount.data.proposal || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('ongoing')}
          active={stage.toLowerCase() === 'ongoing'}
        >
          Ongoing <span>{ProposalsCount.data.ongoing || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('review')}
          active={stage.toLowerCase() === 'review'}
        >
          Review <span>{ProposalsCount.data.review || 0}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('archived')}
          active={stage.toLowerCase() === 'archived'}
        >
          Archived <span>{ProposalsCount.data.archived || '0'}</span>
        </CategoryItem>
      </Category>
    );
  }
}

const { func, object } = PropTypes;

CategoryGroup.propTypes = {
  ProposalsCount: object.isRequired,
  onStageChange: func.isRequired,
  getProposalsCountAction: func.isRequired,
};

export default connect(
  ({ infoServer: { ProposalsCount } }) => ({ ProposalsCount }),
  {
    getProposalsCountAction: getProposalsCount,
  }
)(CategoryGroup);
