import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, Media, LeftCol, RightCol, ImageHolder } from './style';

export default class MediaAssets extends React.Component {
  render() {
    const { form } = this.props;
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
        </Content>
      </Section>
    );
  }
}

MediaAssets.propTypes = {
  form: PropTypes.object.isRequired,
};
