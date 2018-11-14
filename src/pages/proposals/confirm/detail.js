import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Section, Title, Content, Heading, DataContent } from './style';

export default class ProjectDetail extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Section>
        <Title>Project Detail</Title>
        <Content>
          <Heading>Project Information</Heading>
          <DataContent>
            <ReactMarkdown source={form.details} escapeHtml={false} />
          </DataContent>
        </Content>
      </Section>
    );
  }
}

ProjectDetail.propTypes = {
  form: PropTypes.object.isRequired,
};
