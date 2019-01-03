import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-responsive-modal';

import Icon from '@digix/gov-ui/components/common/elements/icons';
import ImageViewer from '@digix/gov-ui/components/common/ipfs-viewer';
import { dijix } from '../../utils/dijix';

import {
  DetailsContainer,
  ShortDescription,
  // TrackActivity,
  Details,
  SubTitle,
  ImageHolder,
  CloseButton,
} from './style';

export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  showHideImage = () => {
    this.setState({ open: !this.state.open });
  };

  renderDocuments(documents) {
    if (!documents) return null;

    return this.renderImages(documents);
  }

  renderImages = (proofs, preview) => {
    if (!proofs) return null;
    const images = proofs.map((img, i) =>
      img.src ? (
        <Fragment>
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
    return (
      <DetailsContainer>
        <SubTitle>Short Description</SubTitle>
        <ShortDescription>
          {project.description
            ? project.description
            : 'No short description content has been created yet.'}
        </ShortDescription>
        {/* <TrackActivity>
          <input type="checkbox" />
          Track change from previous version
        </TrackActivity> */}
        <Details>
          <SubTitle>Project Details</SubTitle>
          <ReactMarkdown source={project.details} escapeHtml={false} />
          {hasImages && (
            <div>
              <ImageViewer
                thumbnailSize="512"
                hashes={project.images || project.proofs}
                renderLoading={null}
                renderResolved={thumbnails => this.renderDocuments(thumbnails)}
              />
            </div>
          )}
          {preview && this.renderImages(project.proofs || project.images, preview)}
        </Details>
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
