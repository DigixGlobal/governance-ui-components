import multihash from '@digix/multi-hash';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

export function encodeHash(hash) {
  // eslint-disable-line import/prefer-default-export
  if (!hash) return null;
  return `0x${multihash.decode(hash).toString('hex')}`;
}

export function decodeHash(hexHash) {
  if (!hexHash) return null;
  const parsedHash = hexHash.indexOf('0x') === 0 ? hexHash.substr(2) : hexHash;
  if (parsedHash === '') return null;
  return multihash.encode(parsedHash);
}

export function capitalizeFirstLetterAndChangeToNormalForm(string) {
  const capitalFirstLetter = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalFirstLetter.replace(/([a-z](?=[A-Z]))/g, '$1 ');
}

export function dgxHashToIPFSHash(string) {
  if (string.slice(0, 2) === 'Dg') return `Qm${string.slice(2)}`;
  return string;
}

export const buffer2Hex = buffer =>
  Array.prototype.map.call(new Uint8Array(buffer), x => `00${x.toString(16)}`.slice(-2)).join('');

export const truncateNumber = number => {
  let truncatedNumber = parseBigNumber(number, 0, false);
  if (truncatedNumber % 1 !== 0) {
    truncatedNumber = Math.floor(truncatedNumber * 1000) / 1000;
  }

  return truncatedNumber;
};

export const formatPercentage = num => {
  if (!num) {
    return 0;
  }

  const formatted = num * 100;
  if (formatted % 1 !== 0) {
    return formatted.toFixed(2);
  }

  return formatted;
};
