import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';

import { CloseButton } from '@digix/gov-ui/pages/proposals/forms/style';

export default class PdfViewer extends React.PureComponent {
  static propTypes = {
    file: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { page: 0, pages: 0 };
  }

  onDocumentComplete = pages => {
    this.setState({ page: 1, pages });
  };

  onPageComplete = page => {
    this.setState({ page });
  };

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  };

  renderPagination = () => {
    const { page, pages } = this.state;
    if (!pages || (pages && pages === 1)) return null;

    return (
      <Fragment>
        <CloseButton disabled={page === 1} kind="text" onClick={this.handlePrevious}>
          Previous
        </CloseButton>
        <CloseButton disabled={page === pages} kind="text" onClick={this.handleNext}>
          Next
        </CloseButton>
      </Fragment>
    );
  };

  render() {
    return (
      <div>
        <PDF
          file={this.props.file}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
          fillWidth={1024}
        />
        {this.renderPagination()}
      </div>
    );
  }
}
