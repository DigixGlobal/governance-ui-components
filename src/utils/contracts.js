import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { DEFAULT_NETWORKS } from 'spectrum-lightsuite/src/helpers/constants';

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
