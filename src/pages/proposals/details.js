import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-responsive-modal';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { HR } from '@digix/gov-ui/components/common/common-styles';
import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';
import { dijix } from '@digix/gov-ui/utils/dijix';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';

import {
  DetailsContainer,
  Content,
  SubTitle,
  ImageHolder,
  ImageItem,
  ModalCta,
} from '@digix/gov-ui/pages/proposals/style';

import { Enlarge } from '@digix/gov-ui/pages/proposals/forms/style';

export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, selectedImage: undefined };
  }

  componentDidMount = () => {
    const { images } = this.props.project;
    try {
      if (images) fetchImages(images).then(files => this.setState({ files }));
    } catch (error) {
      // do nothing
    }
  };

  componentWillReceiveProps = nextProps => {
    const { images } = nextProps.project;
    try {
      fetchImages(images).then(files => this.setState({ files }));
    } catch (error) {
      // do nothing
    }
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  renderImages = (proofs, preview) => {
    if (!proofs || proofs === null) return null;
    const images = proofs.map((img, i) => {
      if (!img.src) return null;

      let source = !preview && img.thumbnail ? `${dijix.config.httpEndpoint}/${img.src}` : img.src;

      if (img.type === 'pdf') {
        source = !preview ? `${dijix.config.httpEndpoint}/${img.src}` : img.base64;
      }
      return (
        <ImageItem
          review
          key={`img-${i + 1}`}
          onClick={this.showHideImage({ src: source, type: img.type })}
          style={{ cursor: 'pointer' }}
        >
          <Enlarge kind="text" onClick={this.showHideImage({ src: source, type: img.type })}>
            <Icon kind="magnifier" />
          </Enlarge>
          {img.type === 'pdf' && <PDFViewer file={source} showNav={false} />}
          {img.type === 'image' && <img alt="" src={source} />}
        </ImageItem>
      );
    });
    return <ImageHolder>{images}</ImageHolder>;
  };

  render() {
    const {
      project,
      preview,
      translations: { project: trans, sidebar },
    } = this.props;
    const { selectedImage } = this.state;

    const hasImages = project.images && project.images.length > 0;
    const description = project.description || project.noShortDescription;

    return (
      <DetailsContainer>
        <Content>
          <SubTitle>{trans.shortDescription}</SubTitle>
          <div data-digix="Proposal-Short-Desc">
            <ReactMarkdown source={description} escapeHtml={false} />
          </div>
          <HR />
        </Content>

        <Content data-digix="Details-Desc">
          <SubTitle>{trans.details}</SubTitle>
          <ReactMarkdown source={project.details} escapeHtml={false} />
          {preview && this.renderImages(project.proofs, preview)}
          {hasImages && this.renderImages(this.state.files, false)}
          <HR />
        </Content>

        <Modal
          open={this.state.open}
          showCloseIcon={false}
          onClose={this.showHideImage()}
          center
          styles={{
            modal: { maxWidth: '45%', width: '100%' },
          }}
        >
          <ImageItem preview>
            {selectedImage && selectedImage.type === 'image' && (
              <img alt="" style={{ width: '100%' }} src={selectedImage.src} />
            )}
            {selectedImage && selectedImage.type === 'pdf' && (
              <PDFViewer file={selectedImage.src} />
            )}
          </ImageItem>
          <ModalCta>
            <Button primary invert onClick={this.showHideImage()}>
              {sidebar.close}
            </Button>
          </ModalCta>
        </Modal>
      </DetailsContainer>
    );
  }
}

ProjectDetails.propTypes = {
  project: PropTypes.object.isRequired,
  preview: PropTypes.bool,
  translations: PropTypes.object.isRequired,
};

ProjectDetails.defaultProps = {
  preview: false,
};
