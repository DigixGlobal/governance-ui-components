import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { Modal } from '@digix/gov-ui/pages/dissolution/style';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { showHideWalletOverlay } from '@digix/gov-ui/reducers/gov-ui/actions';

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
    const { translations } = this.props;
    const t = translations.dissolution;

    return (
      <Fragment>
        <Container>
          <Title>{t.Modal.title}</Title>
          <Paragraph>{t.Modal.content}</Paragraph>
          <Paragraph>
            <ReactMarkdown
              escapeHtml={false}
              renderers={{ paragraph: 'span' }}
              source={t.Modal.ethRecommendation}
            />
          </Paragraph>
          <Button
            onClick={this.openLoadWalletPanel}
            primary
          >
            {t.Modal.button}
          </Button>
        </Container>
      </Fragment>
    );
  }
}

const { func, object } = PropTypes;
DissolutionModal.propTypes = {
  closeModal: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data,
});

export default connect(mapStateToProps, { showHideWalletOverlay })(DissolutionModal);
