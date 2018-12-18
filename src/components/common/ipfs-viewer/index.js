import { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchFromDijix } from '../../../utils/dijix';

const initialState = {
  // data: {},
  loading: true,
  thumbnails: [],
};

// eslint-disable
export default class IpfsViewer extends Component {
  static propTypes = {
    renderResolved: PropTypes.func.isRequired,
    renderLoading: PropTypes.object,
    hashes: PropTypes.array,
  };
  static defaultProps = {
    renderLoading: undefined,
    hashes: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentWillMount() {
    const { hashes } = this.props;
    if (hashes && hashes.length > 0) this.fetchImages(this.props);
  }

  componentWillReceiveProps = nextProps => {
    this.fetchImages(nextProps);
  };

  componentWillUnmount = () => {
    this.setState({ loading: false, thumbnails: undefined });
  };

  fetchImages = props => {
    const { hashes, thumbnailSize } = props;
    Promise.all(
      hashes.map(hash => {
        if (hash === null) return undefined;

        return fetchFromDijix(0, undefined, hash).then(({ data: { thumbnails } }) => thumbnails);
      })
    ).then(images => {
      if (!images[0]) return undefined;
      const thumbs = images.map(image => ({ src: image[thumbnailSize] }));
      this.setState({ thumbnails: thumbs, loading: false });
    });
  };

  render() {
    const { loading, thumbnails } = this.state;
    if (loading) {
      return this.props.renderLoading || null;
    }
    return this.props.renderResolved(thumbnails);
  }
}
