import PropTypes from 'prop-types';
import { Button } from '@digix/gov-ui/components/common/elements';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { withTranslation } from 'react-i18next';
import React from 'react';

const {
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
    this.state = {};
  }

  render() {
    const { t } = this.props;

    return (
      <Container>
        <Title>{t('Burn.title')}</Title>
        <Content>
          <Currency>
            <CurrencyValue>435.234</CurrencyValue>
            <CurrencyLabel>DGD</CurrencyLabel>
          </Currency>
          <Currency>
            <CurrencyValue>84.000</CurrencyValue>
            <CurrencyLabel>ETH</CurrencyLabel>
          </Currency>
        </Content>
        <Button secondary>{t('Burn.button')}</Button>
      </Container>
    );
  }
}

const { func } = PropTypes;
BurnStep.propTypes = {
  t: func.isRequired,
};

export default withTranslation('Dissolution')(BurnStep);
