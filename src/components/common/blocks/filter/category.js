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
          onClick={() => this.handleClick('all')}
          active={stage.toLowerCase() === 'all'}
        >
          {projectStatus.all} <span>{ProposalsCount.data.all || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('idea')}
          active={stage.toLowerCase() === 'idea'}
        >
          {projectStatus.idea} <span>{ProposalsCount.data.idea || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('draft')}
          active={stage.toLowerCase() === 'draft'}
        >
          {projectStatus.draft} <span>{ProposalsCount.data.draft || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('proposal')}
          active={stage.toLowerCase() === 'proposal'}
        >
          {projectStatus.proposal} <span>{ProposalsCount.data.proposal || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('ongoing')}
          active={stage.toLowerCase() === 'ongoing'}
        >
          {projectStatus.ongoing} <span>{ProposalsCount.data.ongoing || '0'}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('review')}
          active={stage.toLowerCase() === 'review'}
        >
          {projectStatus.review} <span>{ProposalsCount.data.review || 0}</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('archived')}
          active={stage.toLowerCase() === 'archived'}
        >
          {projectStatus.archived} <span>{ProposalsCount.data.archived || '0'}</span>
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
