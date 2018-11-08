import multihash from '@digix/multi-hash';

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
