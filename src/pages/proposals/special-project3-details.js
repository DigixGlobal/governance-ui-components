import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Content, Title } from './style';

const SpecialProject3Details = props => (
  <DetailsContainer>
    <Content special>
      <Title>
        <span>Remove QP for Proposers | Increase RP for voting</span>
      </Title>
      <p>This special project proposes the following DigixDAO configuration changes:</p>
      <ol>
        <li>
          <b>Remove the Quarter Point reward for proposers</b>
          <p>
            The Quarter Point reward for proposers is at the moment proportional to the Ether
            funding they claim in their milestone. This special project proposes to set that Quarter
            Point reward to 0
          </p>
        </li>
        <li>
          <b>
            Increase the Reputation Point per additional Quarter Point from 1:1 to 5:1 (for
            Participants)
          </b>
          <p>
            DigixDAO participants who accumulate more than 2 Quarter Point in a DigixDAO quarter,
            are rewarded with 1:1 reputation for the additional Quarter Point they have above the
            minimum threshold. This special proposal proposes to set the Reputation Point per
            additional Quarter Point to 5, instead of 1
          </p>
        </li>
      </ol>
      <p>
        In the DigixDAO configs here <a href="https://info.digix.global/daoConfigs">https://info.digix.global/daoConfigs</a>, these fields are:
      </p>
      <ol>
        <li>CONFIG_REPUTATION_PER_EXTRA_QP_NUM</li>
        <li>CONFIG_QUARTER_POINT_MILESTONE_COMPLETION_PER_10000ETH</li>
      </ol>
      <p>respectively.</p>
    </Content>
  </DetailsContainer>
);

const { object } = PropTypes;
SpecialProject3Details.propTypes = {
  // translations: object.isRequired,
  // uintConfigs: PropTypes.object.isRequired,
};
export default SpecialProject3Details;
