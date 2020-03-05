import PropTypes from 'prop-types';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withTranslation } from 'react-i18next';
import React from 'react';
import { Button, Icon } from '@digix/gov-ui/components/common/elements';

const {
  Arrow,
  Content,
  Container,
  Currency,
  CurrencyLabel,
  CurrencyValue,
  Title,
} = Step;
class BurnStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dgd: 435.234,
      eth: 84.000,
    };
  }

  burnDgd() {
    // [TODO]
    this.setState({ dgd: 0, eth: 0 }, () => {
      this.props.goToNext();
    });
  }

  render() {
    const { dgd, eth } = this.state;
    const { t } = this.props;

    const isButtonEnabled = dgd > 0;
    const buttonLabel = isButtonEnabled
      ? t('Dissolution:Burn.button')
      : <Icon kind="check" />;

    return (
      <Container>
        <Title>{t('Dissolution:Burn.title')}</Title>
        <Content>
          <Currency>
            <CurrencyValue>{dgd}</CurrencyValue>
            <CurrencyLabel>DGD</CurrencyLabel>
          </Currency>
          <Arrow kind="arrow" />
          <Currency>
            <CurrencyValue>{eth}</CurrencyValue>
            <CurrencyLabel>ETH</CurrencyLabel>
          </Currency>
        </Content>
        <Button
          disabled={!isButtonEnabled}
          onClick={() => this.burnDgd()}
          secondary
        >
          {buttonLabel}
        </Button>
      </Container>
    );
  }
}

const {
  array,
  func,
  object,
} = PropTypes;

BurnStep.propTypes = {
  addresses: array,
  goToNext: func.isRequired,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  t: func.isRequired,
  web3Redux: object.isRequired,
};

BurnStep.defaultProps = {
  addresses: [],
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
});

export default withTranslation(['Snackbar', 'Dissolution'])(
  web3Connect(connect(mapStateToProps, {
    showHideAlert,
    showTxSigningModal,
  })(BurnStep))
);
