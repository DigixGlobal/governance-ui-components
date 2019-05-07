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
    const { ProposalsCount, translations } = this.props;

    const {
      data: {
        common: { projectStatus },
      },
    } = translations;

    return (
      <Category stage={stage}>
        <CategoryItem
          data-digix="Filter-All-Tab"
          onClick={() => this.handleClick('all')}
          active={stage.toLowerCase() === 'all'}
        >
          {projectStatus.all}{' '}
          <span data-digix="Filter-All-Count">{ProposalsCount.data.all || '0'}</span>
        </CategoryItem>
        <CategoryItem
          data-digix="Filter-Idea-Tab"
          onClick={() => this.handleClick('idea')}
          active={stage.toLowerCase() === 'idea'}
        >
          {projectStatus.idea}{' '}
          <span data-digix="Filter-Idea-Count">{ProposalsCount.data.IDEA || '0'}</span>
        </CategoryItem>
        <CategoryItem
          data-digix="Filter-Draft-Tab"
          onClick={() => this.handleClick('draft')}
          active={stage.toLowerCase() === 'draft'}
        >
          {projectStatus.draft}{' '}
          <span data-digix="Filter-Draft-Count">{ProposalsCount.data.DRAFT || '0'}</span>
        </CategoryItem>
        <CategoryItem
          data-digix="Filter-Proposal-Tab"
          onClick={() => this.handleClick('proposal')}
          active={stage.toLowerCase() === 'proposal'}
        >
          {projectStatus.proposal}{' '}
          <span data-digix="Filter-Proposal-Count">{ProposalsCount.data.PROPOSAL || '0'}</span>
        </CategoryItem>
        <CategoryItem
          data-digix="Filter-OnGoing-Tab"
          onClick={() => this.handleClick('ongoing')}
          active={stage.toLowerCase() === 'ongoing'}
        >
          {projectStatus.ongoing}{' '}
          <span data-digix="Filter-OnGoing-Count">{ProposalsCount.data.ONGOING || '0'}</span>
        </CategoryItem>
        <CategoryItem
          data-digix="Filter-Review-Tab"
          onClick={() => this.handleClick('review')}
          active={stage.toLowerCase() === 'review'}
        >
          {projectStatus.review}{' '}
          <span data-digix="Filter-Review-Count">{ProposalsCount.data.REVIEW || 0}</span>
        </CategoryItem>
        <CategoryItem
          data-digix="Filter-Archived-Tab"
          onClick={() => this.handleClick('archived')}
          active={stage.toLowerCase() === 'archived'}
        >
          {projectStatus.archived}{' '}
          <span data-digix="Filter-Archived-Count">{ProposalsCount.data.ARCHIVED || '0'}</span>
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
  translations: object.isRequired,
};

export default connect(
  ({ infoServer: { ProposalsCount } }) => ({ ProposalsCount }),
  {
    getProposalsCountAction: getProposalsCount,
  }
)(CategoryGroup);
