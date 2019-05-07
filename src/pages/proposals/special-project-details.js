import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Content, SubTitle } from './style';

const SpecialProjectDetails = props => (
  <DetailsContainer>
    <Content>
      <SubTitle>
        {props.translations.project.configurationDetails || 'Configuration Details'}
      </SubTitle>
      {Object.keys(props.uintConfigs).map(key => {
        if (key === '__typename') return null;
        return (
          <div key={key}>
            <span>
              <strong>{key}: </strong>
            </span>
            <span>{props.uintConfigs[key]}</span>
          </div>
        );
      })}
    </Content>
  </DetailsContainer>
);

const { object } = PropTypes;
SpecialProjectDetails.propTypes = {
  uintConfigs: object.isRequired,
  translations: object.isRequired,
};
export default SpecialProjectDetails;
