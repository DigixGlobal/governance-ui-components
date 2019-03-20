import React from 'react';
import PropTypes from 'prop-types';

import { dijix } from '@digix/gov-ui/utils/dijix';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import { HorizontalBar } from '@digix/gov-ui/components/common/elements/index';

import Modal from 'react-responsive-modal';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';

import { Section, Title, Content, Heading, Media, LeftCol, RightCol, ImageHolder } from './style';

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
    fetchImages(images).then(files => this.setState({ files }));
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
    const images = proofs.map((img, i) => (
      <div key={`img-${lastIndex ? lastIndex + i : i + 1}`}>
        <Media>
          <LeftCol>
            <Heading>{`Image ${lastIndex ? lastIndex + i : i + 1}`}</Heading>
          </LeftCol>
          <RightCol>
            <ImageHolder>
              {/* eslint-disable */}
              <img
                alt=""
                onClick={this.showHideImage}
                src={
                  img.thumbnail
                    ? `${dijix.config.httpEndpoint}/${img.thumbnail}?q=${Date.now()}`
                    : img.src
                }
              />
              {/* eslint-enable */}
            </ImageHolder>
          </RightCol>
        </Media>
        <HorizontalBar />
      </div>
    ));
    return images;
  };

  render() {
    const { form } = this.props;
    const { selectedImage } = this.state;
    if (!form) return null;
    return (
      <Section>
        <Title>Multimedia</Title>
        <Content>
          {form.proofs && this.renderImages(form.proofs)}
          {form.images &&
            this.renderImages(this.state.files, form.proofs ? form.proofs.length + 1 : 0)}
        </Content>
        <Modal open={this.state.open} onClose={this.showHideImage}>
          <div>
            <img style={{ width: '100%' }} alt="" src={selectedImage} />
            <Button kind="round" small onClick={this.showHideImage()}>
              Close
            </Button>
          </div>
        </Modal>
      </Section>
    );
  }
}

MediaAssets.propTypes = {
  form: PropTypes.object.isRequired,
};
