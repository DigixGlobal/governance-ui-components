import { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchFromDijix } from '../../../utils/dijix';

const initialState = {
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

  componentDidMount() {
    const { hashes } = this.props;
    this._isMounted = true;
    if (this._isMounted) {
      if (hashes && hashes.length > 0) this.fetchImages(this.props);
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  _isMounted = false;

  fetchImages = props => {
    const { hashes, thumbnailSize } = props;
    Promise.all(
      hashes.map(hash => {
        if (hash === null || !hash) return undefined;
        return fetchFromDijix(0, undefined, hash).then(data => data);
      })
    ).then(images => {
      if (!images[0]) return undefined;
      const files = images.map(image => ({
        thumbnail: image ? image.data.thumbnails[thumbnailSize] : undefined,
        src: image ? image.data.src : undefined,
      }));
      this.setState({ files, loading: false });
    });
  };

  render() {
    const { loading, files } = this.state;
    if (loading) {
      return this.props.renderLoading || null;
    }
    return this.props.renderResolved(files);
  }
}
