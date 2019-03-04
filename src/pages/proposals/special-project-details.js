import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Details, SubTitle } from './style';

const SpecialProjectDetails = props => (
  <DetailsContainer>
    <SubTitle>Configuration Details</SubTitle>
    <Details>
      {Object.keys(props.uintConfigs).map(key => (
        <div>
          <span>
            <strong>{key}: </strong>
          </span>
          <span>{props.uintConfigs[key]}</span>
        </div>
      ))}
    </Details>
  </DetailsContainer>
);

SpecialProjectDetails.propTypes = {
  uintConfigs: PropTypes.object.isRequired,
};
export default SpecialProjectDetails;
