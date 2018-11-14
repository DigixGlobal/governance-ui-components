import React from 'react';

import { HorizontalBar } from '../../../components/common/elements/index';

import { Section, Title, Content, Heading, DataContent } from './style';

export default class Overview extends React.Component {
  render() {
    return (
      <Section>
        <Title>Milestone</Title>
        <Content>
          <Heading>Reward Expected</Heading>
          <DataContent>1.123 ETH</DataContent>
          <HorizontalBar />
          <Heading>Milestone 1: Funds Required for This Milestone</Heading>
          <DataContent>2 ETH</DataContent>
          <Heading>Milestone 1: Details</Heading>
          <DataContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper metus ante, a
              rutrum mauris tempor a. Nullam sapien lacus, vulputate in pretium ac, commodo nec
              diam. Nam lacinia augue mi, ut sodales metus rhoncus a. Sed est ex, lacinia a maximus
              a, condimentum quis lorem. Quisque auctor dolor ac sapien pulvinar tempus fermentum et
              turpis. In sit amet nisl laoreet, aliquam libero sed, vestibulum elit. Integer
              ultricies ullamcorper ornare. Quisque eu suscipit ligula. Suspendisse viverra erat id
              quam lobortis gravida. Sed eleifend efficitur ultrices.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper metus ante, a
              rutrum mauris tempor a. Nullam sapien lacus, vulputate in pretium ac, commodo nec
              diam. Nam lacinia augue mi, ut sodales metus rhoncus a. Sed est ex, lacinia a maximus
              a, condimentum quis lorem. Quisque auctor dolor ac sapien pulvinar tempus fermentum et
              turpis. In sit amet nisl laoreet, aliquam libero sed, vestibulum elit. Integer
              ultricies ullamcorper ornare. Quisque eu suscipit ligula. Suspendisse viverra erat id
              quam lobortis gravida. Sed eleifend efficitur ultrices.
            </p>
          </DataContent>
          <HorizontalBar />
          <Heading>Milestone 2: Funds Required for This Milestone</Heading>
          <DataContent>2 ETH</DataContent>
          <Heading>Milestone 2: Details</Heading>
          <DataContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper metus ante, a
              rutrum mauris tempor a. Nullam sapien lacus, vulputate in pretium ac, commodo nec
              diam. Nam lacinia augue mi, ut sodales metus rhoncus a. Sed est ex, lacinia a maximus
              a, condimentum quis lorem. Quisque auctor dolor ac sapien pulvinar tempus fermentum et
              turpis. In sit amet nisl laoreet, aliquam libero sed, vestibulum elit. Integer
              ultricies ullamcorper ornare. Quisque eu suscipit ligula. Suspendisse viverra erat id
              quam lobortis gravida. Sed eleifend efficitur ultrices.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper metus ante, a
              rutrum mauris tempor a. Nullam sapien lacus, vulputate in pretium ac, commodo nec
              diam. Nam lacinia augue mi, ut sodales metus rhoncus a. Sed est ex, lacinia a maximus
              a, condimentum quis lorem. Quisque auctor dolor ac sapien pulvinar tempus fermentum et
              turpis. In sit amet nisl laoreet, aliquam libero sed, vestibulum elit. Integer
              ultricies ullamcorper ornare. Quisque eu suscipit ligula. Suspendisse viverra erat id
              quam lobortis gravida. Sed eleifend efficitur ultrices.
            </p>
          </DataContent>
        </Content>
      </Section>
    );
  }
}
