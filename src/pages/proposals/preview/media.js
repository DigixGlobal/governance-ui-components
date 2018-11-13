import React from 'react';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, Media, LeftCol, RightCol, ImageHolder } from './style';

export default class MediaAssets extends React.Component {
  render() {
    return (
      <Section>
        <Title>Multimedia</Title>
        <Content>
          <Media>
            <LeftCol>
              <Heading>Image 1</Heading>
            </LeftCol>
            <RightCol>
              <ImageHolder>&nbsp;</ImageHolder>
            </RightCol>
          </Media>
          <HorizontalBar />
          <Media>
            <LeftCol>
              <Heading>Image 2</Heading>
            </LeftCol>
            <RightCol>
              <ImageHolder>&nbsp;</ImageHolder>
            </RightCol>
          </Media>
        </Content>
      </Section>
    );
  }
}
