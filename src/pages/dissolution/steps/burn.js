import { Button } from '@digix/gov-ui/components/common/elements';
import PropTypes from 'prop-types';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
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
    const { translations } = this.props;
    const t = translations.dissolution;

    return (
      <Container>
        <Title>{t.Burn.title}</Title>
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
        <Button secondary>{t.Burn.title}</Button>
      </Container>
    );
  }
}

const { object } = PropTypes;

BurnStep.propTypes = {
  translations: object.isRequired,
};

BurnStep.defaultProps = {};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data,
});

export default connect(mapStateToProps, {})(BurnStep);
