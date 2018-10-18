import React from 'react';
import PropTypes from 'prop-types';

import { Category, CategoryItem } from './style';

export default class CategoryGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'all',
    };
  }
  handleClick = param => {
    const { onStageChange } = this.props;
    if (onStageChange) {
      this.setState({ stage: param });
      onStageChange(param);
    }
  };
  render() {
    const { stage } = this.state;

    return (
      <Category stage={stage}>
        <CategoryItem
          onClick={() => this.handleClick('all')}
          active={stage.toLowerCase() === 'all'}
        >
          All <span>16</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('idea')}
          active={stage.toLowerCase() === 'idea'}
        >
          Idea <span>4</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('draft')}
          active={stage.toLowerCase() === 'draft'}
        >
          Draft <span>4</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('proposal')}
          active={stage.toLowerCase() === 'proposal'}
        >
          Proposal <span>4</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('ongoing')}
          active={stage.toLowerCase() === 'ongoing'}
        >
          Ongoing <span>4</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('review')}
          active={stage.toLowerCase() === 'review'}
        >
          Review <span>4</span>
        </CategoryItem>
        <CategoryItem
          onClick={() => this.handleClick('archived')}
          active={stage.toLowerCase() === 'archived'}
        >
          Archived <span>4</span>
        </CategoryItem>
      </Category>
    );
  }
}

const { func } = PropTypes;

CategoryGroup.propTypes = {
  onStageChange: func.isRequired,
};
