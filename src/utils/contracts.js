import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import {
  DEFAULT_NETWORKS,
  ERC20_ABI,
  DEFAULT_TOKENS,
} from 'spectrum-lightsuite/src/helpers/constants';

import DgdToken from '@digix/dao-contracts/build/contracts/MockDgd.json';
import DgxToken from '@digix/dao-contracts/build/contracts/MockDgx.json';
import DgdBadgeToken from '@digix/dao-contracts/build/contracts/MockBadge.json';

export default function getContract(contract, network = SpectrumConfig.defaultNetworks[0]) {
  let latestNetwork = Math.max(...Object.keys(contract.networks));
  const selectedNetwork = DEFAULT_NETWORKS.find(n => n.id.toLowerCase() === network.toLowerCase());
  if (selectedNetwork.id.toLowerCase() !== 'testrpc') {
    latestNetwork = selectedNetwork.chainId;
  }
  return {
    abi: contract.abi,
    address: contract.networks[latestNetwork].address,
  };
}

function getToken(token) {
  return DEFAULT_TOKENS.find(t => t.symbol === token);
}

export function getDGDBalanceContract(network) {
  let rpcContract;
  if (process.env.ENVIRONMENT === 'development') {
    rpcContract = getContract(DgdToken, network);
  }
  const abi = (process.env.ENVIRONMENT !== 'production' && ERC20_ABI) || rpcContract.abi;
  const address =
    (process.env.ENVIRONMENT !== 'development' && getToken('DGD').address) || rpcContract.address;

  console.log({ abi, address });
  return { abi, address };
}

export function getDGXBalanceContract(network) {
  let rpcContract;
  if (process.env.ENVIRONMENT === 'development') {
    rpcContract = getContract(DgxToken, network);
  }
  const abi = (process.env.ENVIRONMENT !== 'production' && ERC20_ABI) || rpcContract.abi;
  const address =
    (process.env.ENVIRONMENT !== 'development' && getToken('DGX').address) || rpcContract.address;

  return { abi, address };
}

export function getDGDBadgeBalanceContract(network) {
  let rpcContract;
  if (process.env.ENVIRONMENT === 'development') {
    rpcContract = getContract(DgdBadgeToken, network);
  }
  const abi = (process.env.ENVIRONMENT !== 'production' && ERC20_ABI) || rpcContract.abi;
  const address =
    (process.env.ENVIRONMENT !== 'development' && getToken('DGDb').address) || rpcContract.address;

  return { abi, address };
}
