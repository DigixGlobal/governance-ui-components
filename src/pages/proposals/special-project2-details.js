import React from 'react';
import PropTypes from 'prop-types';

import { DetailsContainer, Content, Title } from './style';

const SpecialProject2Details = props => (
  <DetailsContainer>
    <Content special>
      <Title>
        <span>Reduction in the Quarter Points granted to proposers</span>
      </Title>
      <p>
        In DigixDAO we use a parameter that distributes Quarter points to proposers, proportional to
        the Ether funds they withdraw. This factor is called the
        CONFIG_QUARTER_POINT_MILESTONE_COMPLETION_PER_10000ETH, which can be checked from here:
        <a href="https://info.digix.global/daoConfigs">https://info.digix.global/daoConfigs</a>
      </p>
      <p>
        At the moment, 2 Quarter points are awarded per Ether withdrawn. So a proposer withdrawing
        100 Ethers from DigixDAO for their proposal would receive 200 Quarter Points. Since DigixDAO
        quarter points have 9 decimal places, this number is set to 20000000000000 (note that its
        per 10000 ETH)
      </p>
      <p>
        We wish to modify this factor to 1/4th of its current value. This means, we would like to
        set it to 5000000000000. This would grant 0.5 Quarter points to proposers per Ether
        withdrawn. So a proposer withdrawing 100 Ethers from DigixDAO would receive 50 quarter
        points.
      </p>
      <p>
        Making this change reduces the quarter points granted per ether of funding, but retaining
        the incentive structure for DigixDAO proposers.
      </p>
      <p>
        This Special project would also follow a commit and reveal voting scheme. The commit phase
        would last for 14 days, and reveal phase for 7 days.
      </p>
    </Content>
  </DetailsContainer>
);

const { object } = PropTypes;
SpecialProject2Details.propTypes = {
  // translations: object.isRequired,
  // uintConfigs: PropTypes.object.isRequired,
};
export default SpecialProject2Details;
