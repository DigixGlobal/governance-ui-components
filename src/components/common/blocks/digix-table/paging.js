import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Input, Select, Icon } from '@digix/gov-ui/components/common/elements/index';

import { Container, Next, Previous, Text } from './style';

const rows = [
  {
    value: 10,
    text: '10 rows per page',
  },
  {
    value: 20,
    text: '20 rows per page',
  },
  {
    value: 50,
    text: '50 rows per page',
  },
  {
    value: 75,
    text: '75 rows per page',
  },
  {
    value: 100,
    text: '100 rows per page',
  },
];

class Paging extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: this.props.defaultPageSize,
      selectedPage: 1,
      useSelectedPage: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyDown);
  }

  onRowsChange = e => {
    const { fetchData, handleLoading, currentPage } = this.props;
    const { value } = e.target;
    handleLoading(false, fetchData, Number(currentPage), Number(value));
  };
  onPageChange = e => {
    const { value } = e.target;

    this.setState({
      selectedPage: value,
      useSelectedPage: true,
    });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter' || e.which === 13 || e.keyCode === 13) {
      const { selectedPage, rowsPerPage } = this.state;
      if (Number(selectedPage) > 0) {
        const { fetchData, handleLoading } = this.props;
        handleLoading(false, fetchData, Number(selectedPage), Number(rowsPerPage));
      }
    }
  };

  handleNextPage = () => {
    const { fetchData, handleLoading, currentPage } = this.props;
    const { rowsPerPage } = this.state;
    const value = Number(currentPage) + 1;
    handleLoading(false, fetchData, Number(value), Number(rowsPerPage));
  };

  handlePreviousPage = () => {
    const { fetchData, handleLoading, currentPage } = this.props;
    const { rowsPerPage } = this.state;
    const value = Number(currentPage) - 1;
    handleLoading(false, fetchData, Number(value), Number(rowsPerPage));
  };

  render() {
    const { selectedPage, useSelectedPage } = this.state;
    const { currentPage, pages } = this.props;
    const { rowsPerPage } = this.state;

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= pages;

    return (
      <Fragment>
        <Container>
          <Previous
            disabled={isFirstPage}
            onClick={this.handlePreviousPage}
            data-digix="PREVIOUS-PAGE"
          >
            <Icon kind="arrow" />
          </Previous>
          <Text>Page </Text>
          <Input
            type="number"
            value={useSelectedPage ? selectedPage : currentPage}
            data-digix="PAGE-NUMBER"
            small
            width="100px"
            onChange={e => this.onPageChange(e, this.props)}
          />
          <Text>of {pages}</Text>
          <Select
            id="rowsPerPage"
            data-digix="ROWS-PER-PAGE"
            onChange={e => this.onRowsChange(e)}
            value={rowsPerPage}
            width="200px"
            items={rows}
          />
          <Next disabled={isLastPage} onClick={this.handleNextPage} data-digix="NEXT-PAGE">
            <Icon kind="arrow" />
          </Next>
        </Container>
      </Fragment>
    );
  }
}

const { number, func } = PropTypes;
Paging.propTypes = {
  pages: number.isRequired,
  fetchData: func.isRequired,
  defaultPageSize: number.isRequired,
  handleLoading: func.isRequired,
  currentPage: number.isRequired,
};
export default Paging;
