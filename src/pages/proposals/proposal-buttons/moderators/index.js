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
      translations: {
        common: { buttons },
        project,
        snackbar: { snackbars },
      },
    } = this.props;

    const txnTranslations = this.props.translations.signTransaction;
    const buttonTranslations = { buttons, project, snackbars };

    return (
      <Fragment>
        <EndorseButton
          stage={data.stage}
          isModerator={addressDetails.data.isModerator}
          endorser={data.endorser}
          proposalId={data.proposalId}
          history={history}
          translations={buttonTranslations}
          txnTranslations={txnTranslations}
        />
        <ApproveButton
          history={history}
          isModerator={addressDetails.data.isModerator}
          proposal={data}
          proposalId={data.proposalId}
          translations={buttonTranslations}
          txnTranslations={txnTranslations}
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
  translations: object.isRequired,
};
export default ModeratorButtons;
