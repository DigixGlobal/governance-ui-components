import React from 'react';
import PropTypes from 'prop-types';

import { dijix } from '../../../utils/dijix';
import ImageViewer from '../../../components/common/ipfs-viewer';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, Media, LeftCol, RightCol, ImageHolder } from './style';

export default class MediaAssets extends React.Component {
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
              <img
                key={`img-${i + 1}`}
                alt=""
                src={preview ? img.src : `${dijix.config.httpEndpoint}/${img.src}?q=${Date.now()}`}
              />
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
