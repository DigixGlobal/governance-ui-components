import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { Modal } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { showHideWalletOverlay } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withTranslation } from 'react-i18next';
import React, { Fragment } from 'react';

const {
  Container,
  Title,
  Paragraph,
  Button,
} = Modal;

class DissolutionModal extends React.Component {
  openLoadWalletPanel = () => {
    LogLoadWallet.initiate();
    this.props.showHideWalletOverlay(true);
    this.props.closeModal();
  };

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <Container>
          <Title>{t('Modal.title')}</Title>
          <Paragraph>{t('Modal.content')}</Paragraph>
          <Paragraph>
            <ReactMarkdown
              escapeHtml={false}
              renderers={{ paragraph: 'span' }}
              source={t('Modal.ethRecommendation')}
            />
          </Paragraph>
          <Button
            onClick={this.openLoadWalletPanel}
            primary
          >
            {t('Modal.button')}
          </Button>
        </Container>
      </Fragment>
    );
  }
}

const { func } = PropTypes;
DissolutionModal.propTypes = {
  closeModal: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  t: func.isRequired,
};

const mapStateToProps = () => ({
});

export default withTranslation('Dissolution')(
  connect(mapStateToProps, {
    showHideWalletOverlay
  })(DissolutionModal)
);
