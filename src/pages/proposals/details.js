/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-responsive-modal';

import Icon from '@digix/gov-ui/components/common/elements/icons';
import { HR } from '@digix/gov-ui/components/common/common-styles';

import { dijix, fetchFromDijix } from '@digix/gov-ui/utils/dijix';

import { DetailsContainer, Content, SubTitle, ImageHolder, CloseButton } from './style';

export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  componentWillReceiveProps = nextProps => {
    this.fetchImages(nextProps.project.images);
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  fetchImages = proofs => {
    const thumbnailSize = 512;
    Promise.all(
      proofs.map(hash => {
        if (hash === null || !hash) return undefined;
        return fetchFromDijix(0, undefined, hash).then(data => data);
      })
    ).then(images => {
      if (!images[0]) return undefined;
      const files = images.map(image => ({
        thumbnail: image ? image.data.thumbnails[thumbnailSize] : undefined,
        src: image ? image.data.src : undefined,
      }));
      this.setState({ files });
    });
  };

  renderImages = (proofs, preview) => {
    if (!proofs) return null;
    const images = proofs.map((img, i) => {
      const source =
        !preview && img.thumbnail ? `${dijix.config.httpEndpoint}/${img.thumbnail}` : img.src;

      return img.src ? (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <img
          key={`img-${i + 1}`}
          alt=""
          onClick={this.showHideImage(source)}
          src={source}
          style={{ cursor: 'pointer' }}
        />
      ) : null;
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
          <div>
            {project.description
              ? project.description
              : 'No short description content has been created yet.'}
          </div>
          <HR />
        </Content>

        <Content>
          <SubTitle>Project Details</SubTitle>
          <ReactMarkdown source={project.details} escapeHtml={false} />
          {hasImages && this.renderImages(this.state.files, false)}
          {this.renderImages(project.proofs ? project.proofs : project.images, preview)}
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
