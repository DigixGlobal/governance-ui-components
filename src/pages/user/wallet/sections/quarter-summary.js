import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ParticipationReward from '@digix/gov-ui/pages/user/wallet/sections/participation-reward';
import VotingStake from '@digix/gov-ui/pages/user/wallet/sections/voting-stake';
import { QtrSummary } from '@digix/gov-ui/pages/user/wallet/style';

class QuarterSummary extends React.Component {
  render() {
    const { txnTranslations } = this.props;
    const t = this.props.translations;

    return (
      <QtrSummary>
        <VotingStake translations={t.LockedDgd} txnTranslations={txnTranslations} />
        <ParticipationReward
          translations={t.ParticipationReward}
          txnTranslations={txnTranslations}
        />
      </QtrSummary>
    );
  }
}

const { object } = PropTypes;
QuarterSummary.propTypes = {
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

const mapStateToProps = state => ({
  txnTranslations: state.daoServer.Translations.data.signTransaction,
});

export default connect(mapStateToProps)(QuarterSummary);
