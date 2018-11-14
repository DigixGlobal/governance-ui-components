import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, DataContent } from './style';

export default class Overview extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Section>
        <Title>Overview</Title>
        <Content>
          <Heading>Project Title</Heading>
          <DataContent>{form.title}</DataContent>
          <HorizontalBar />
          <Heading>Short Description</Heading>
          <DataContent>{form.description}</DataContent>
        </Content>
      </Section>
    );
  }
}

Overview.propTypes = {
  form: PropTypes.object.isRequired,
};
