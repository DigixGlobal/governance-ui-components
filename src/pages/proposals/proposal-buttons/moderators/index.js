import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import EndorseButton from '../endorse';
import ApproveButton from '../approve';

class ModeratorButtons extends React.Component {
  render() {
    const {
      addressDetails,
      proposal: { data },
      history,
    } = this.props;
    return (
      <Fragment>
        <EndorseButton
          stage={data.stage}
          isModerator={addressDetails.data.isModerator}
          endorser={data.endorser}
          proposalId={data.proposalId}
          history={history}
        />
        <ApproveButton
          history={history}
          isModerator={addressDetails.data.isModerator}
          proposal={data}
          proposalId={data.proposalId}
        />
      </Fragment>
    );
  }
}
const { object } = PropTypes;

ModeratorButtons.propTypes = {
  proposal: object.isRequired,
  addressDetails: object.isRequired,
  history: object.isRequired,
};
export default ModeratorButtons;
