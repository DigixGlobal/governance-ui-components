import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TxVisualisation from 'spectrum-lightsuite/src/libs/material-ui/components/common/tx_visualisation';

const { object, oneOfType, string } = PropTypes;

export default class LockDgdTx extends Component {
  static propTypes = {
    address: object.isRequired,
    network: oneOfType([object, string]).isRequired,
    txData: object.isRequired,
    ui: object.isRequired,
  };

  render() {
    const {
      address,
      network,
      txData,
      ui: { dgd },
    } = this.props;
    return (
      <TxVisualisation
        items={[
          {
            identicon: address.address,
            header: 'User',
            data: address.address,
            dataLink: `${network.explorerAddressPrefix}${address.address}`,
          },
          {
            color: 'orange',
            header: `DGD`,
            icon: 'edit',
            data: `DGDs to Lock ${dgd}`,
          },
          {
            identicon: txData.to,
            header: 'Contract',
            data: txData.to,
            dataLink: `${network.explorerAddressPrefix}${txData.to}`,
          },
        ]}
      />
    );
  }
}
