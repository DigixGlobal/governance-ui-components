import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@digix/gov-ui/components/common/elements/index';

import { ProposalStages, EMPTY_HASH_LONG } from '@digix/gov-ui/constants';

class AddDocumentsButton extends React.PureComponent {
  redirectToAddDocuments = () => {
    const {
      history,
      match: {
        params: { id },
      },
    } = this.props;
    history.push(`/proposals/add-documents/${id}`);
  };

  render() {
    const {
      stage,
      isProposer,
      proposal,
      translations: {
        common: { buttons },
      },
    } = this.props;

    if (
      stage !== ProposalStages.archived &&
      isProposer &&
      proposal.finalVersionIpfsDoc !== EMPTY_HASH_LONG
    ) {
      return (
        <div>
          <Button data-digix="ADD-UPDATES" onClick={this.redirectToAddDocuments}>
            {buttons.addUpdates || 'Add Updates'}
          </Button>
        </div>
      );
    }
    return null;
  }
}

const { object, bool, string } = PropTypes;

AddDocumentsButton.propTypes = {
  stage: string.isRequired,
  translations: object.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  isProposer: bool.isRequired,
  proposal: object.isRequired,
};

export default AddDocumentsButton;
