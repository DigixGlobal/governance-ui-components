/* eslint-disable react/jsx-no-bind */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import EndorseButton from '@digix/gov-ui/pages/proposals/proposal-buttons/endorse';
import ErrorMessageOverlay from '@digix/gov-ui/components/common/blocks/overlay/error-message';
import ApproveButton from '@digix/gov-ui/pages/proposals/proposal-buttons/approve';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getUnmetProposalRequirements } from '@digix/gov-ui/utils/helpers';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

class ModeratorButtons extends React.Component {
  checkUnmetRequirements(proposalAction, customErrors) {
    const { client, DaoDetails, translations } = this.props;

    getUnmetProposalRequirements(client, DaoDetails, translations, true).then(errors => {
      let totalErrors = errors;
      if (customErrors) {
        totalErrors = errors.concat(customErrors);
      }

      if (totalErrors.length) {
        this.showErrorOverlay(totalErrors);
      } else {
        proposalAction();
      }
    });
  }

  showErrorOverlay(errors) {
    const {
      translations: {
        common: { proposalErrors },
      },
    } = this.props;

    this.props.showRightPanel({
      component: <ErrorMessageOverlay errors={errors} location={proposalErrors.returnToProject} />,
      show: true,
    });
  }

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
    const checkProposalRequirements = this.checkUnmetRequirements.bind(this);

    return (
      <Fragment>
        <EndorseButton
          stage={data.stage}
          isModerator={addressDetails.data.isModerator}
          endorser={data.endorser}
          proposalId={data.proposalId}
          history={history}
          checkProposalRequirements={checkProposalRequirements}
          translations={buttonTranslations}
          txnTranslations={txnTranslations}
        />
        <ApproveButton
          history={history}
          isModerator={addressDetails.data.isModerator}
          proposal={data}
          proposalId={data.proposalId}
          checkProposalRequirements={checkProposalRequirements}
          translations={buttonTranslations}
          txnTranslations={txnTranslations}
        />
      </Fragment>
    );
  }
}
const { func, object } = PropTypes;

ModeratorButtons.propTypes = {
  addressDetails: object.isRequired,
  client: object.isRequired,
  DaoDetails: object.isRequired,
  history: object.isRequired,
  proposal: object.isRequired,
  showRightPanel: func.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoDetails: infoServer.DaoDetails.data,
});

export default withApollo(
  web3Connect(
    connect(
      mapStateToProps,
      {
        showRightPanel,
      }
    )(ModeratorButtons)
  )
);
