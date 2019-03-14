import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Content, SubTitle } from './style';

const SpecialProjectDetails = props => (
  <DetailsContainer>
    <Content>
      <SubTitle>Configuration Details</SubTitle>
      {Object.keys(props.uintConfigs).map(key => (
        <div>
          <span>
            <strong>{key}: </strong>
          </span>
          <span>{props.uintConfigs[key]}</span>
        </div>
      ))}
    </Content>
  </DetailsContainer>
);

SpecialProjectDetails.propTypes = {
  uintConfigs: PropTypes.object.isRequired,
};
export default SpecialProjectDetails;
