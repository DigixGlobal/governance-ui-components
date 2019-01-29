import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class DigixTable extends React.Component {
  render() {
    return <ReactTable {...this.props} />;
  }
}

const { array, object, oneOfType } = PropTypes;

DigixTable.propTypes = {
  data: oneOfType([array, object]).isRequired,
  columns: oneOfType([array, object]).isRequired,
};
