/* eslint-disable */

import sanitizeData from 'spectrum-lightsuite/src/helpers/txUtils';

export const executeContractFunction = payload => {
  const {
    address,
    contract,
    func,
    params,
    // onSuccess,
    onFailure,
    onFinally,
    network,
    web3Params,
    ui,
    showTxSigningModal,
    logTxn,
    translations,
  } = payload;
  const {
    keystore: {
      type: { id: keystoreType },
    },
  } = address;
  if (keystoreType === 'metamask' || keystoreType === 'imtoken') {
    const data = params ? func.getData(...params) : func.getData();
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
      logTxn,
      translations,
    })
      .then(txHash => {
        if (logTxn) {
          logTxn.completeTransaction(true);
        }

        // if (typeof onSuccess === 'function') {
        //   onSuccess(txHash);
        // }

        if (typeof onFinally === 'function') {
          onFinally(txHash);
        }
      })
      .catch(error => {
        onFailure(error);
        if (logTxn) {
          logTxn.completeTransaction(false, error);
        }

        if (typeof onFinally === 'function' && error.data) {
          const txHash = Object.keys(error.data)[0];
          onFinally(txHash);
        }
      });
  }

  if (params)
    return func
      .sendTransaction(...params, {
        from: address.address,
        ui,
        logTxn,
        translations,
        ...web3Params,
      })
      .then(txHash => {
        if (logTxn) {
          logTxn.completeTransaction(true);
        }

        // if (typeof onSuccess === 'function') {
        //   onSuccess(txHash);
        // }

        if (typeof onFinally === 'function') {
          onFinally(txHash);
        }
      })
      .catch(error => {
        onFailure(error);
        if (logTxn) {
          logTxn.completeTransaction(false, error);
        }

        if (typeof onFinally === 'function') {
          const data = error.data ? Object.keys(error.data) : undefined;
          const txHash = data ? data[0] : undefined;
          onFinally(txHash);
        }
      });

  return func
    .sendTransaction({
      from: address.address,
      ui,
      logTxn,
      translations,
      ...web3Params,
    })
    .then(txHash => {
      if (logTxn) {
        logTxn.completeTransaction(true);
      }

      // if (typeof onSuccess === 'function') {
      //   onSuccess(txHash);
      // }

      if (typeof onFinally === 'function') {
        onFinally(txHash);
      }
    })
    .catch(error => {
      onFailure(error);
      if (logTxn) {
        logTxn.completeTransaction(false, error);
      }

      if (typeof onFinally === 'function') {
        const data = error.data ? Object.keys(error.data) : undefined;
        const txHash = data ? data[0] : undefined;
        onFinally(txHash);
      }
    });
};
