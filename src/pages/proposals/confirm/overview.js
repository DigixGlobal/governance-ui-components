import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, DataContent } from './style';

export default class Overview extends React.Component {
  render() {
    const {
      form,
      translations: { project },
    } = this.props;
    if (!form) return null;
    return (
      <Section>
        <Title>{project.overview}</Title>
        <Content>
          <Heading>{project.title}</Heading>
          <DataContent>{form.title}</DataContent>
          <HorizontalBar />
          <Heading>{project.shortDescription}</Heading>
          <DataContent>{form.description}</DataContent>
        </Content>
      </Section>
    );
  }
}

Overview.propTypes = {
  form: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
};
