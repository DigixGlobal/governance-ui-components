import React from 'react';
import PropTypes from 'prop-types';

import { dijix } from '@digix/gov-ui/utils/dijix';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';

import Modal from 'react-responsive-modal';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';

import { Section, Title, Content, Heading, ImageItem, ImageHolder } from './style';

export default class MediaAssets extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: undefined,
    };
  }

  componentDidMount = () => {
    const { images } = this.props.form;
    if (images) fetchImages(images).then(files => this.setState({ files }));
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  renderDocuments(documents) {
    if (!documents) return null;

    return this.renderImages(documents);
  }

  renderImages = (proofs, lastIndex) => {
    if (!proofs) return null;
    const images = proofs.map((img, i) => {
      let source = img.src;

      if (img.type === 'pdf' && img.base64) {
        source = img.base64;
      } else if (img.type === 'pdf' && img.src) {
        source = `${dijix.config.httpEndpoint}/${img.src}`;
      }

      if (img.type === 'image' && img.thumbnail) {
        source = `${dijix.config.httpEndpoint}/${img.thumbnail}`;
      }

      return (
        <ImageItem
          key={`img-${lastIndex ? lastIndex + i : i + 1}`}
          onClick={this.showHideImage({ src: source, type: img.type })}
        >
          <Heading>{`Image ${lastIndex ? lastIndex + i : i + 1}`}</Heading>
          {/* eslint-disable */}
              {
                img.type === 'pdf' ?
                <PDFViewer file={source} /> :
                <img
                  alt=""
                  src={source}
                />
              }
              {/* eslint-enable */}
        </ImageItem>
      );
    });
    return images;
  };

  render() {
    const {
      form,
      translations: { project, sidebar },
    } = this.props;
    const { selectedImage } = this.state;
    if (!form) return null;
    return (
      <Section>
        <Title>{project.multimedia}</Title>
        <Content>
          <ImageHolder>
            {form.proofs && this.renderImages(form.proofs)}

            {form.images &&
              this.renderImages(this.state.files, form.proofs ? form.proofs.length + 1 : 0)}
          </ImageHolder>
        </Content>
        <Modal
          open={this.state.open}
          onClose={this.showHideImage()}
          showCloseIcon={selectedImage && selectedImage.type !== 'pdf'}
        >
          <div>
            {selectedImage && selectedImage.type === 'image' && (
              <img style={{ width: '100%' }} alt="" src={selectedImage.src} />
            )}
            {selectedImage && selectedImage.type === 'pdf' && (
              <PDFViewer file={selectedImage.src} />
            )}
            <Button kind="round" small onClick={this.showHideImage()}>
              {sidebar.close}
            </Button>
          </div>
        </Modal>
      </Section>
    );
  }
}

MediaAssets.propTypes = {
  form: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
};
