import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { dijix } from '../../utils/dijix';

import {
  DetailsContainer,
  ShortDescription,
  TrackActivity,
  Details,
  SubTitle,
  ImageHolder,
} from './style';

import ImageViewer from '../../components/common/ipfs-viewer';

export default class ProjectDetails extends React.Component {
  renderDocuments(documents) {
    if (!documents) return null;

    return this.renderImages(documents);
  }

  renderImages = (proofs, preview) => {
    if (!proofs) return null;
    const images = proofs.map((img, i) => (
      <img
        key={`img-${i + 1}`}
        alt=""
        src={preview ? img.src : `${dijix.config.httpEndpoint}/${img.src}?q=${Date.now()}`}
      />
    ));
    return <ImageHolder>{images}</ImageHolder>;
  };

  render() {
    const { project, preview } = this.props;
    const hasImages = project.images && project.images.length > 0;
    return (
      <DetailsContainer>
        <ShortDescription>
          {project.description
            ? project.description
            : 'No short description content has been created yet.'}
        </ShortDescription>
        <TrackActivity>
          <input type="checkbox" />
          Track change from previous version
        </TrackActivity>
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
