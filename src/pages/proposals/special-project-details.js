import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Content, SubTitle } from './style';

const SpecialProjectDetails = props => (
  <DetailsContainer>
    <Content>
      {/*
      <SubTitle>
        {props.translations.project.configurationDetails || 'Configuration Details'}
      </SubTitle>
    */}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      {/* TODO: re-instate this later once special proposals need to be displayed */}
      {/* <SubTitle>Configuration Details</SubTitle>
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
      })} */}
    </Content>
  </DetailsContainer>
);

const { object } = PropTypes;
SpecialProjectDetails.propTypes = {
  // translations: object.isRequired,
  // uintConfigs: PropTypes.object.isRequired,
};
export default SpecialProjectDetails;
