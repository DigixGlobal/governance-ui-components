import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Content, Title } from './style';

const SpecialProject4Details = props => (
  <DetailsContainer>
    <Content special>
      <Title>
        <span>THIS IS DUMMY</span>
      </Title>
      <p>THIS IS DUMMY:</p>
      <ol>
        <li>
          <b>THIS IS DUMMY</b>
          <p>
            THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY.
          </p>
        </li>
        <li>
          <b>
            THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY.
          </b>
          <p>
            THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY.
          </p>
        </li>
      </ol>
      <p>
        THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY. THIS IS DUMMY.
      </p>
      <ol>
        <li>THIS IS DUMMY</li>
        <li>THIS IS DUMMY</li>
      </ol>
    </Content>
  </DetailsContainer>
);

const { object } = PropTypes;
SpecialProject4Details.propTypes = {
  // translations: object.isRequired,
  // uintConfigs: PropTypes.object.isRequired,
};
export default SpecialProject4Details;
