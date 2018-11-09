import { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchFromDijix } from '../../../utils/dijix';

const initialState = {
  data: {},
  loading: true,
  thumbnails: [],
};

export default class MultipleResolver extends Component {
  static propTypes = {
    thumbnailSize: PropTypes.string.isRequired,
    hashes: PropTypes.array,
    renderResolved: PropTypes.func.isRequired,
    renderLoading: PropTypes.object,
  };
  static defaultProps = {
    hashes: undefined,
    renderLoading: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentWillMount() {
    const { hashes, thumbnailSize } = this.props;

    Promise.all(
      hashes.map(hash =>
        fetchFromDijix(0, undefined, hash).then(({ data: { thumbnails } }) => thumbnails)
      )
    ).then(images => {
      const thumbs = images.map(image => ({ src: image[thumbnailSize] }));
      this.setState({ thumbnails: thumbs, loading: false });
    });
  }

  getTypeSrc(item) {
    const { thumbnailSize } = this.props;

    // If item is not an object(meaning it is not an image/pdf)
    if (typeof item !== 'object') {
      return Promise.resolve(item);
    }

    const { type, data } = item;

    if (type === 'image') {
      return new Promise(resolve =>
        resolve([{ src: data.src, thumbnail: data.thumbnails[thumbnailSize] }])
      );
    }

    if (type === 'attestation') {
      return Promise.resolve(data.attestation);
    }

    // PDF type handling
    return Promise.all(
      data.pages.map(pdfPageHash => fetchFromDijix(0, undefined, pdfPageHash))
    ).then(pdfPagesHashes =>
      pdfPagesHashes.map(pdf => ({
        src: pdf.data.src,
        thumbnail: pdf.data.thumbnails[thumbnailSize],
      }))
    );
  }

  render() {
    const { loading, thumbnails } = this.state;
    if (loading) {
      return this.props.renderLoading || null;
    }
    return this.props.renderResolved(thumbnails);
  }
}
