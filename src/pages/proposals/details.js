import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-responsive-modal';

import Icon from '@digix/gov-ui/components/common/elements/icons';
import { HR } from '@digix/gov-ui/components/common/common-styles';

import { dijix } from '@digix/gov-ui/utils/dijix';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';

import { DetailsContainer, Content, SubTitle, ImageHolder, CloseButton } from './style';

export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, selectedImage: undefined };
  }

  componentDidMount = () => {
    const { images } = this.props.project;
    if (images) fetchImages(images).then(files => this.setState({ files }));
  };

  componentWillReceiveProps = nextProps => {
    const { images } = nextProps.project;
    fetchImages(images).then(files => this.setState({ files }));
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  renderImages = (proofs, preview) => {
    if (!proofs || proofs === null) return null;
    const images = proofs.map((img, i) => {
      if (!img.src) return null;

      const source =
        !preview && img.thumbnail ? `${dijix.config.httpEndpoint}/${img.thumbnail}` : img.src;

      /* eslint-disable */
      return (
        <img
          key={`img-${i + 1}`}
          alt=""
          onClick={this.showHideImage(source)}
          src={source}
          style={{ cursor: 'pointer' }}
        />
      );
      /* eslint-enable */
    });
    return <ImageHolder>{images}</ImageHolder>;
  };

  render() {
    const { project, preview } = this.props;
    const { selectedImage } = this.state;
    const hasImages = project.images && project.images.length > 0;
    return (
      <DetailsContainer>
        <Content>
          <SubTitle>Short Description</SubTitle>
          <div data-digix="Details-Short-Desc">
            {project.description
              ? project.description
              : 'No short description content has been created yet.'}
          </div>
          <HR />
        </Content>

        <Content data-digix="Details-Desc">
          <SubTitle>Project Details</SubTitle>
          <ReactMarkdown source={project.details} escapeHtml={false} />
          {preview && this.renderImages(project.proofs, preview)}
          {hasImages && this.renderImages(this.state.files, false)}
          <HR />
        </Content>
        <Modal open={this.state.open} showCloseIcon={false} onClose={this.showHideImage()} center>
          <div>
            <img alt="" style={{ width: '100%' }} src={selectedImage} />
            <CloseButton onClick={this.showHideImage()} style={{ boxShadow: 'none' }}>
              <Icon kind="close" style={{ marginRight: 0 }} />
            </CloseButton>
          </div>
        </Modal>
      </DetailsContainer>
    );
  }
}

ProjectDetails.propTypes = {
  project: PropTypes.object.isRequired,
  preview: PropTypes.bool,
};

ProjectDetails.defaultProps = {
  preview: false,
};
