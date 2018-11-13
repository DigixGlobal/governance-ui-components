import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TxVisualisation from 'spectrum-lightsuite/src/libs/material-ui/components/common/tx_visualisation';

export default class TxVisualization extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    txData: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  };
  render() {
    const {
      address,
      network,
      txData,
      ui: { header, value, color, icon, caption },
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
            color: color || 'orange',
            header: header || `DGD`,
            icon,
            data: caption && value ? `${caption} ${value}` : caption,
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
