import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';

import { Icon } from '@digix/gov-ui/components/common/elements/index';
import { Next, Previous, Enlarge } from '@digix/gov-ui/pages/proposals/forms/style';

export default class PdfViewer extends React.PureComponent {
  static propTypes = {
    file: PropTypes.string.isRequired,
    showNav: PropTypes.bool,
  };

  static defaultProps = {
    showNav: true,
  };

  constructor(props) {
    super(props);

    this.state = { page: 1, pages: 0 };
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
        <Previous disabled={page === 1} onClick={this.handlePrevious}>
          <Icon kind="arrow" />
        </Previous>
        <Next disabled={page === pages} onClick={this.handleNext}>
          <Icon kind="arrow" />
        </Next>
      </Fragment>
    );
  };

  render() {
    const { showNav } = this.props;

    const { file } = this.props;
    if (!file || !file.startsWith('data:application/pdf')) {
      return null;
    }

    return (
      <Fragment>
        <PDF
          file={this.props.file}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
          fillWidth={1024}
        />
        {showNav && this.renderPagination()}
      </Fragment>
    );
  }
}
