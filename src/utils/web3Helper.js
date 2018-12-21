import sanitizeData from 'spectrum-lightsuite/src/helpers/txUtils';

export const executeContractFunction = payload => {
  const {
    address,
    contract,
    func,
    params,
    onSuccess,
    onFailure,
    onFinally,
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
        if (typeof onSuccess === 'function') {
          onSuccess(txHash);
        }

        if (typeof onFinally === 'function') {
          onFinally(txHash);
        }
      })
      .catch(error => {
        onFailure(error);
        if (typeof onFinally === 'function') {
          const txHash = Object.keys(error.data)[0];
          onFinally(txHash);
        }
      });
  }

  return func
    .sendTransaction(...params, {
      from: address.address,
      ui,
      ...web3Params,
    })
    .then(txHash => {
      if (typeof onSuccess === 'function') {
        onSuccess(txHash);
      }

      if (typeof onFinally === 'function') {
        onFinally(txHash);
      }
    })
    .catch(error => {
      onFailure(error);
      if (typeof onFinally === 'function') {
        const data = error.data ? Object.keys(error.data) : undefined;
        const txHash = data ? data[0] : undefined;
        onFinally(txHash);
      }
    });
};
