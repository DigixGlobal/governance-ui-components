import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, DataContent } from './style';

export default class Milestones extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Section>
        <Title>Milestone</Title>
        <Content>
          <Heading>Reward Expected</Heading>
          <DataContent>{form ? form.finalReward : 0} ETH</DataContent>

          {form &&
            form.milestones &&
            form.milestones.map((ms, i) => (
              <div key={`ms-${i + 1}`}>
                <HorizontalBar />
                <Heading>{`Milestone ${i + 1}`}</Heading>
                <DataContent>{ms.fund} ETH</DataContent>
                <Heading>Milestone {i + 1}: Details</Heading>
                <DataContent>{ms.description}</DataContent>
              </div>
            ))}
        </Content>
      </Section>
    );
  }
}

Milestones.propTypes = {
  form: PropTypes.object.isRequired,
};
