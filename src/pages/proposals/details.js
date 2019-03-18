import React, { Fragment } from 'react';
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

  showHideImage = () => {
    this.setState({ open: !this.state.open });
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
    const images = proofs.map((img, i) =>
      img.src ? (
        <Fragment key={`frag-${i + 1}`}>
          {/* eslint-disable */}
          <img
            key={`img-${i + 1}`}
            alt=""
            onClick={this.showHideImage}
            src={
              !preview && img.thumbnail
                ? `${dijix.config.httpEndpoint}/${img.thumbnail}`
                : img.src
            }
            style={{ cursor: 'pointer' }}
          />
          <Modal
            open={this.state.open}
            showCloseIcon={false}
            onClose={this.showHideImage}
            center
          >
            <div>
              <img
                key={`img-${i + 1}`}
                alt=""
                style={{ width: '100%' }}
                src={
                  preview
                    ? img.src
                    : `${dijix.config.httpEndpoint}/${img.src}?q=${Date.now()}`
                }
              />

              <CloseButton
                onClick={this.showHideImage}
                style={{ boxShadow: 'none' }}
              >
                <Icon kind="close" style={{ marginRight: 0 }} />
              </CloseButton>
            </div>
          </Modal>
          {/* eslint-enable */}
        </Fragment>
      ) : null
    );
    return <ImageHolder>{images}</ImageHolder>;
  };

  render() {
    const { project, preview } = this.props;
    const hasImages = project.images && project.images.length > 0;

    console.log(project.proofs, project.images);
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
