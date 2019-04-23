import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';

import { HorizontalBar } from '@digix/gov-ui/components/common/elements';
import {
  Content,
  DataContent,
  Heading,
  Section,
  Title,
} from '@digix/gov-ui/pages/proposals/confirm/style';

export default class Milestones extends React.Component {
  render() {
    const {
      form,
      translations: { project, signTransaction },
    } = this.props;
    return (
      <Section>
        <Title>{project.milestone}</Title>
        <Content>
          <Heading>{project.rewardExpected}</Heading>
          <DataContent>{form ? form.finalReward : 0} ETH</DataContent>

          {form &&
            form.milestones &&
            form.milestones.map((ms, i) => (
              <div key={`ms-${i + 1}`}>
                <HorizontalBar />
                <Heading>{`${project.milestone} ${i + 1}`}</Heading>
                <DataContent>{ms.fund} ETH</DataContent>
                <Heading>
                  {project.milestone} {i + 1}: {signTransaction.common.details}
                </Heading>
                <DataContent>
                  <Markdown source={ms.description} escapeHtml={false} />
                </DataContent>
              </div>
            ))}
        </Content>
      </Section>
    );
  }
}

Milestones.propTypes = {
  form: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
};
