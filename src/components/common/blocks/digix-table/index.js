import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import Paging from './paging';

import './react-table.css';

export default class DigixTable extends React.Component {
  render() {
    const { showPagination } = this.props;
    return (
      <ReactTable
        {...this.props}
        showPagination={showPagination}
        PaginationComponent={showPagination ? Paging : undefined}
        loadingText="Loading..."
      />
    );
  }
}

const { array, object, bool, oneOfType } = PropTypes;

DigixTable.propTypes = {
  data: oneOfType([array, object]).isRequired,
  columns: oneOfType([array, object]).isRequired,
  showPagination: bool,
};

DigixTable.defaultProps = {
  showPagination: true,
};
