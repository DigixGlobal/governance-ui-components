import React from 'react';
import PropTypes, { bool } from 'prop-types';
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
  // renderImages = imgObj =>
  //   imgObj.map(({ src }) => <img key={src} src={`${dijix.config.httpEndpoint}/${src}`} alt="" />);

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
        src={preview ? img.src : `${dijix.config.httpEndpoint}/${img.src}`}
      />
    ));
    return <ImageHolder>{images}</ImageHolder>;
  };

  render() {
    const { project, preview } = this.props;
    const imageHashes = project.images || project.proofs;
    console.log({ images: project.images, proofs: project.proofs });
    return (
      <DetailsContainer>
        <ShortDescription>{project.description}</ShortDescription>
        <TrackActivity>
          <input type="checkbox" />
          Track change from previous version
        </TrackActivity>
        <Details>
          <SubTitle>Project Details</SubTitle>
          <ReactMarkdown source={project.details} escapeHtml={false} />
          {!preview && (
            <ImageViewer
              thumbnailSize="512"
              hashes={imageHashes}
              renderLoading={null}
              renderResolved={thumbnails => this.renderDocuments(thumbnails)}
            />
          )}
          {preview && this.renderImages(project.proofs, preview)}
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
