import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Section, Title, Content, Heading, DataContent } from './style';

export default class ProjectDetail extends React.Component {
  render() {
    const {
      form,
      translations: { project },
    } = this.props;
    if (!form) return null;
    return (
      <Section>
        <Title>{project.projectDetail}</Title>
        <Content>
          <Heading>{project.projectInformation}</Heading>
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
  translations: PropTypes.object.isRequired,
};
