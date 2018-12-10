import sanitizeData from 'spectrum-lightsuite/src/helpers/txUtils';

export const executeContractFunction = payload => {
  const {
    address,
    contract,
    func,
    params,
    onSuccess,
    onFailure,
    network,
    web3Params,
    ui,
    showTxSigningModal,
  } = payload;
  const {
    keystore: {
      type: { id: keystoreType },
    },
  } = address;
  console.log(params);
  if (keystoreType === 'metamask' || keystoreType === 'imtoken') {
    const data = func.getData(...params);
    return showTxSigningModal({
      address,
      network,
      txData: sanitizeData(
        {
          ...web3Params,
          from: address.address,
          data,
          to: contract.address,
        },
        network
      ),
      ui,
    })
      .then(txHash => {
        onSuccess(txHash);
      })
      .catch(error => onFailure(error));
  }

  return func
    .sendTransaction(...params, {
      from: address.address,
      ui,
      ...web3Params,
    })
    .then(txHash => {
      onSuccess(txHash);
    })
    .catch(error => onFailure(error));
};
