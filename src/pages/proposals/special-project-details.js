import React from 'react';
import PropTypes from 'prop-types';

import DigixDAOConfigChange02 from '@digix/gov-ui/assets/images/DigixDAOConfigchange-02-web.png';
import DigixDAOConfigChange01 from '@digix/gov-ui/assets/images/DigixDAOConfigchange-01-web.png';
import { DetailsContainer, Content, Title, SubTitle } from './style';

const SpecialProjectDetails = props => (
  <DetailsContainer>
    <Content special>
      <Title>
        Title: <span>Configuration change - Shortening Voting Durations for voting rounds</span>
      </Title>
      <SubTitle>Preamble</SubTitle>
      <p>
        We have decided to submit a project to change certain configurations of the DigixDAO
        platform to improve efficiency of the governance process and encourage more participation.
      </p>
      <p>
        In short, we are proposing to shorten the durations for the different types of voting that
        can occur on the platform.
      </p>
      <p>
        This would allow for faster rejection / approval of projects, which could help the proposer
        better plan and allocate his time / resources to their projects.
      </p>
      <p>
        Please note that there is no funding called for this project. The project has only to do
        with changing certain voting round durations to improve the efficiency of future project
        funding.
      </p>
      <SubTitle>Description</SubTitle>
      <p>The current configuration of the voting durations is as such:</p>
      <ul>
        <li>A Moderator voting round takes 10 days</li>
        <li>A Participant voting round takes 14 days of Commit phase and 7 days of Reveal phase</li>
        <li>
          A Special Project’s voting round takes 28 days of Commit phase and 7 days of Reveal phase
        </li>
        <li>
          There needs to be a buffer of at least 10 days from the end of the voting rounds to the
          end of the quarter, for the proposer to claim the result of the voting.
        </li>
      </ul>
      <p>
        With this current configuration, as has been raised by some in the community, the voting
        rounds are seemingly longer than needed, which lead to some concerns:
      </p>
      <ul>
        <li>
          It delays the funding for projects that would pass. Even if a project receives a huge
          amount of support from the community, it will still have to wait at least 31 days to get
          its funding.
        </li>
        <li>
          There is a situation where projects have to finalise before day 49 in the quarter, to be
          funded in the same quarter (due to long voting periods). This is because there needs to be
          a minimum of 41 days left in the quarter for all the voting to complete. These 41 days
          consist of 10 days of Moderator voting round, 21 days of Participant voting round and 10
          days buffer for claiming voting result.
        </li>
      </ul>

      <p>
        As such, we are proposing to shorten the voting periods for the following voting rounds:
      </p>
      <ul>
        <li>
          Participant voting round: from 14 days of Commit phase + 7 days of Reveal phase to 10 days
          of Commit phase + 5 days of Reveal phase.
        </li>
        <li>
          Special Project voting round: from 28 days of Commit phase + 7 days of Reveal phase to 14
          days of Commit phase + 7 days of Reveal phase
        </li>
        <li>Buffer for claiming voting results: from 10 days to 7 days</li>
      </ul>
      <p>
        With these changes in place, proposers can expect to receive their funding 25 days (instead
        of 31 days) after they finalise their project, and they will have until day 58 to finalise
        their project to be able to receive funding in the same quarter. We believe that these new
        durations are more reasonable and would make the project filtering process more efficient in
        DigixDAO.
      </p>
      <p>
        If approved, the changes proposed by this Special Project will only take effects in Quarter
        2. Hence, voting durations in Quarter 1 will still remain the same regardless.
      </p>
      <p>
        As for the voting process for this Special Project, it follows a Commit and Reveal scheme
        that is similar to a Participant voting round. If you have any problems or questions, do
        contact us via the Help button below or raise the issue in room dgdao-help in our discord
        channel.
      </p>
      <p>
        <img
          src={DigixDAOConfigChange02}
          alt="Participant Voting - Special Project"
          width="800px"
        />
      </p>
      <p>
        <img
          src={DigixDAOConfigChange01}
          alt="Participant Voting - Normal Project"
          width="1200px"
        />
      </p>
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
