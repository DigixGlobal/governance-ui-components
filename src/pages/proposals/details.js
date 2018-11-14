import React from 'react';
import PropTypes from 'prop-types';

import { dijix } from '../../utils/dijix';

import { DetailsContainer, ShortDescription, TrackActivity, Details, SubTitle } from './style';

import ImageViewer from '../../components/common/ipfs-viewer';

export default class ProjectDetails extends React.Component {
  renderImages = imgObj =>
    imgObj.map(({ src }) => <img key={src} src={`${dijix.config.httpEndpoint}/${src}`} alt="" />);
  renderDocuments(documents) {
    if (!documents) return null;
    return this.renderImages(documents);
  }

  render() {
    const { project } = this.props;
    const imageHashes = project.images || project.proofs;
    return (
      <DetailsContainer>
        <ShortDescription>{project.description}</ShortDescription>
        <TrackActivity>
          <input type="checkbox" />
          Track change from previous version
        </TrackActivity>
        <Details>
          <SubTitle>Project Details</SubTitle>
          {project.details}
          <ImageViewer
            thumbnailSize="512"
            hashes={[imageHashes]}
            renderLoading={null}
            renderResolved={thumbnails => this.renderDocuments(thumbnails)}
          />
        </Details>
      </DetailsContainer>
    );
  }
}

ProjectDetails.propTypes = {
  project: PropTypes.object.isRequired,
};
