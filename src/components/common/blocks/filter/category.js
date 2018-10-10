import React from 'react';
import { Category, CategoryItems } from './style';

export default class CategoryGroup extends React.Component {
  render() {
    return (
      <Category>
        <CategoryItems>
          All <span>16</span>
        </CategoryItems>
        <CategoryItems>
          Idea <span>4</span>
        </CategoryItems>
        <CategoryItems>
          Draft <span>4</span>
        </CategoryItems>
        <CategoryItems>
          Proposal <span>4</span>
        </CategoryItems>
        <CategoryItems>
          Ongoing <span>4</span>
        </CategoryItems>
        <CategoryItems>
          Review <span>4</span>
        </CategoryItems>
        <CategoryItems>
          Archived <span>4</span>
        </CategoryItems>
      </Category>
    );
  }
}
