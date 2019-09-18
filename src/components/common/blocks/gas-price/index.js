import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import web3Utils from 'web3-utils';

import lightTheme from '@digix/gov-ui/theme/light';

import Slider from '@digix/gov-ui/components/common/elements/slider';

import { ETH_GAS_STATION_API } from '@digix/gov-ui/constants';

import {
  AdvancedOption,
  CardText,
  DefaultOption,
  EstimateText,
  GasPriceOption,
  GasPriceSelect,
  HeaderText,
  SliderCard,
  TimeText,
  Title,
  TransactionFeeText,
  ValueText,
} from '@digix/gov-ui/components/common/blocks/gas-price/style';

const MIN_GWEI = 1;
const MAX_GWEI = 100;

const FASTEST = 'fastest';
const FAST = 'fast';
const AVERAGE = 'average';
const SAFE_LOW = 'safeLow';

const formatTime = totalMinutes => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return `${minutes * 60} seconds`;
};

class GasPrice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gasOption: '',
      showAdvanced: false,
      value: 10,
    };
  }

  componentDidMount() {
    fetch(ETH_GAS_STATION_API)
      .then(res => res.json())
      .then(
        result => {
          const gasData = _.pick(result, [
            AVERAGE,
            'avgWait',
            FAST,
            'fastWait',
            FASTEST,
            'fastestWait',
            SAFE_LOW,
            'safeLowWait',
          ]);
          const value = gasData[FAST] / 10;
          this.setState(
            {
              gasOption: FAST,
              showAdvanced: true,
              value,
              ...gasData,
            },
            () => {
              this.props.onGasPriceChange(value);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  _onSliderChange = value => {
    this.setState({ gasOption: '', value }, () => this.props.onGasPriceChange(value));
  };

  _onSelectOption = gasOption => {
    const value = this.state[gasOption] / 10;
    this.setState({ gasOption, value }, () => this.props.onGasPriceChange(value));
  };

  _toggleAdvanced = () => {
    this.setState({ showAdvanced: !this.state.showAdvanced });
  };

  render() {
    const { gas, theme } = this.props;
    const { gasOption, showAdvanced, value } = this.state;
    const transactionFee = web3Utils.fromWei(
      web3Utils.toWei(String(value * web3Utils.hexToNumber(gas)), 'gwei'),
      'ether'
    );

    return (
      <React.Fragment>
        <EstimateText>
          <HeaderText>Estimated Processing Times</HeaderText>

          <span>Select how fast you'd like to send this transaction</span>
          <TransactionFeeText>
            Transaction Fee: <ValueText>{transactionFee} ETH</ValueText>
          </TransactionFeeText>
        </EstimateText>

        {showAdvanced && (
          <GasPriceSelect>
            <GasPriceOption
              theme={theme}
              isActive={gasOption === FASTEST}
              onClick={() => this._onSelectOption(FASTEST)}
            >
              <Title>Fastest</Title>
              <ValueText>
                <span>{this.state[FASTEST] / 10}</span> GWEI
              </ValueText>
              <TimeText>{formatTime(this.state.fastestWait)}</TimeText>
            </GasPriceOption>

            <GasPriceOption
              theme={theme}
              isActive={gasOption === FAST}
              onClick={() => this._onSelectOption(FAST)}
            >
              <Title>Fast</Title>
              <ValueText>
                <span>{this.state[FAST] / 10}</span> GWEI
              </ValueText>
              <TimeText>{formatTime(this.state.fastWait)}</TimeText>
            </GasPriceOption>

            <GasPriceOption
              theme={theme}
              isActive={gasOption === AVERAGE}
              onClick={() => this._onSelectOption(AVERAGE)}
            >
              <Title>Average</Title>
              <ValueText>
                <span>{this.state[AVERAGE] / 10}</span> GWEI
              </ValueText>
              <TimeText>{formatTime(this.state.avgWait)}</TimeText>
            </GasPriceOption>

            <GasPriceOption
              theme={theme}
              isActive={gasOption === SAFE_LOW}
              onClick={() => this._onSelectOption(SAFE_LOW)}
            >
              <Title>Safe Low</Title>
              <ValueText>
                <span>{this.state[SAFE_LOW] / 10}</span> GWEI
              </ValueText>
              <TimeText>{formatTime(this.state.safeLowWait)}</TimeText>
            </GasPriceOption>

            <GasPriceOption theme={theme}>
              <AdvancedOption theme={theme} onClick={this._toggleAdvanced}>
                Advanced Options
              </AdvancedOption>
            </GasPriceOption>
          </GasPriceSelect>
        )}

        {!showAdvanced && (
          <SliderCard theme={theme}>
            <CardText>
              <ValueText>{value} GWEI</ValueText> (Gas Price)
              {this.state[FAST] && (
                <DefaultOption theme={theme} onClick={this._toggleAdvanced}>
                  Default Options
                </DefaultOption>
              )}
            </CardText>

            <Slider min={MIN_GWEI} max={MAX_GWEI} value={value} onChange={this._onSliderChange} />
          </SliderCard>
        )}
      </React.Fragment>
    );
  }
}

const { func, object, string } = PropTypes;

GasPrice.propTypes = {
  gas: string.isRequired,
  onGasPriceChange: func.isRequired,
  theme: object,
};

GasPrice.defaultProps = {
  theme: lightTheme,
};

export default GasPrice;
