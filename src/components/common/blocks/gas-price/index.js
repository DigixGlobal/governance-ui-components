import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import web3Utils from 'web3-utils';

import Slider from '@digix/gov-ui/components/common/elements/slider';
import {
  AdvancedOption,
  CardText,
  DefaultOption,
  EstimateText,
  GasPriceOption,
  GasPriceSelect,
  HeaderText,
  SliderCard,
  TransactionFeeText,
  ValueText,
} from '@digix/gov-ui/components/common/blocks/gas-price/style';

const GAS_PRICE_MIN = 1;
const GAS_PRICE_MAX = 50;

const GWEI = 'GWEI';
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
    fetch('https://ethgasstation.info/json/ethgasAPI.json')
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
              this.props.onGasPriceChange(web3Utils.toWei(String(value), 'gwei'));
            }
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  _onSliderChange = value => {
    this.setState({ gasOption: '', value }, () =>
      this.props.onGasPriceChange(web3Utils.toWei(String(value), 'gwei'))
    );
  };

  _onSelectOption = gasOption => {
    const value = this.state[gasOption] / 10;
    this.setState({ gasOption, value }, () =>
      this.props.onGasPriceChange(web3Utils.toWei(String(value), 'gwei'))
    );
  };

  _toggleAdvanced = () => {
    this.setState({ showAdvanced: !this.state.showAdvanced });
  };

  render() {
    const { gas } = this.props;
    const { gasOption, showAdvanced, value } = this.state;
    const transactionFee = web3Utils.fromWei(web3Utils.toWei(String(value * gas), 'gwei'), 'ether');

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
              isActive={gasOption === FASTEST}
              onClick={() => this._onSelectOption(FASTEST)}
            >
              <span>Fastest</span>
              <span>{`${this.state[FASTEST] / 10} ${GWEI}`}</span>
              <span>{formatTime(this.state.fastestWait)}</span>
            </GasPriceOption>

            <GasPriceOption
              isActive={gasOption === FAST}
              onClick={() => this._onSelectOption(FAST)}
            >
              <span>Fast</span>
              <span>{`${this.state[FAST] / 10} ${GWEI}`}</span>
              <span>{formatTime(this.state.fastWait)}</span>
            </GasPriceOption>

            <GasPriceOption
              isActive={gasOption === AVERAGE}
              onClick={() => this._onSelectOption(AVERAGE)}
            >
              <span>Average</span>
              <span>{`${this.state[AVERAGE] / 10} ${GWEI}`}</span>
              <span>{formatTime(this.state.avgWait)}</span>
            </GasPriceOption>

            <GasPriceOption
              isActive={gasOption === SAFE_LOW}
              onClick={() => this._onSelectOption(SAFE_LOW)}
            >
              <span>Safe Low</span>
              <span>{`${this.state[SAFE_LOW] / 10} ${GWEI}`}</span>
              <span>{formatTime(this.state.safeLowWait)}</span>
            </GasPriceOption>

            <GasPriceOption>
              <AdvancedOption onClick={this._toggleAdvanced}>Advanced Options</AdvancedOption>
            </GasPriceOption>
          </GasPriceSelect>
        )}

        {!showAdvanced && (
          <SliderCard>
            <CardText>
              <ValueText>{value} GWEI</ValueText> (Gas Price)
              {this.state[FAST] && (
                <DefaultOption onClick={this._toggleAdvanced}>Default Options</DefaultOption>
              )}
            </CardText>

            <Slider
              min={GAS_PRICE_MIN}
              max={GAS_PRICE_MAX}
              value={value}
              onChange={this._onSliderChange}
            />
          </SliderCard>
        )}
      </React.Fragment>
    );
  }
}

const { func, number } = PropTypes;

GasPrice.propTypes = {
  gas: number.isRequired,
  onGasPriceChange: func.isRequired,
};

export default GasPrice;
