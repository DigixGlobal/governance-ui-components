import React from 'react';
import PropTypes from 'prop-types';

import { dijix } from '@digix/gov-ui/utils/dijix';
import ImageViewer from '@digix/gov-ui/components/common/ipfs-viewer';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import { HorizontalBar } from '@digix/gov-ui/components/common/elements/index';

import Modal from 'react-responsive-modal';

import { Section, Title, Content, Heading, Media, LeftCol, RightCol, ImageHolder } from './style';

export default class MediaAssets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
    const images = proofs.map((img, i) => (
      <div key={`img-${i + 1}`}>
        <Media>
          <LeftCol>
            <Heading>{`Image ${i + 1}`}</Heading>
          </LeftCol>
          <RightCol>
            <ImageHolder>
              {/* eslint-disable */}
              <img
                key={`img-${i + 1}`}
                alt=""
                onClick={this.showHideImage}
                src={
                  preview
                    ? img.thumbnail
                    : `${dijix.config.httpEndpoint}/${img.thumbnail}?q=${Date.now()}`
                }
              />
              {/* eslint-enable */}
            </ImageHolder>
          </RightCol>
        </Media>
        <HorizontalBar />
        <Modal open={this.state.open} onClose={this.showHideImage}>
          <div>
            <img
              key={`img-${i + 1}`}
              style={{ width: '100%' }}
              alt=""
              src={preview ? img.src : `${dijix.config.httpEndpoint}/${img.src}?q=${Date.now()}`}
            />
            <Button kind="round" small onClick={this.showHideImage}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    ));
    return images;
  };

  render() {
    const { form } = this.props;
    if (!form) return null;
    // const images = form.proofs || form.images;
    return (
      <Section>
        <Title>Multimedia</Title>
        <Content>
          {form.proofs &&
            form.proofs.map((img, i) => (
              <div key={`img-${i + 1}`}>
                <Media>
                  <LeftCol>
                    <Heading>{`Image ${i + 1}`}</Heading>
                  </LeftCol>
                  <RightCol>
                    <ImageHolder>
                      <img src={img.src} alt="" />
                    </ImageHolder>
                  </RightCol>
                </Media>
                <HorizontalBar />
              </div>
            ))}
          {form.images && (
            <ImageViewer
              thumbnailSize="512"
              hashes={form.images}
              renderLoading={null}
              renderResolved={thumbnails => this.renderDocuments(thumbnails)}
            />
          )}
        </Content>
      </Section>
    );
  }
}

MediaAssets.propTypes = {
  form: PropTypes.object.isRequired,
};
