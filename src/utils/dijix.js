import Dijix from 'dijix';
import DijixImage from 'dijix-image';
import DijixPDF from 'dijix-pdf';
import DijixAttestation from 'dijix-attestation';
import { IPFS_GATEWAY, IPFS_IPFS_ENDPOINT } from 'spectrum-lightsuite/src/helpers/constants';
import { encodeHash, decodeHash, dgxHashToIPFSHash } from './helpers';

export const JSON_BACKUP_VERSION = '0.0.1';

export const dijix = new Dijix({
  ipfsEndpoint: IPFS_IPFS_ENDPOINT,
  httpEndpoint: IPFS_GATEWAY,
  types: [new DijixAttestation(), new DijixImage(), new DijixPDF()],
});

export const dijixImageConfig = new DijixImage({
  quality: 0.5,
  maxWidth: 2000,
  format: 'jpeg', // or 'png' - leave blank to inherit
  // watermark: () => // TODO
  thumbnails: {
    // optional thumbnail configs
    quality: 0.7, // default
    32: {
      quality: 0.2,
      square: true, // TODO
    },
    64: {
      quality: 0.6,
    },
    256: true,
    512: true,
  },
});

export const dijixPdfConfig = new DijixPDF({
  // watermark: () => // TODO
  thumbnails: {
    // optional thumbnail configs
    quality: 0.7, // default
    32: {
      quality: 0.2,
      square: true, // TODO
    },
    64: { quality: 0.6 },
    256: true,
    512: true,
  },
});

export function fetchFromDijix(id, hash, ipfsHash) {
  if (hash === null || ipfsHash === null) return;
  const decodedHash =
    (ipfsHash && dgxHashToIPFSHash(ipfsHash)) || dgxHashToIPFSHash(decodeHash(hash));
  return dijix.fetch(decodedHash).catch(() => null);
}

export function fetchFromDijixWithTimeout(hash, ipfsHash) {
  let didTimeout = false;
  const ipfsTimeout = 5000;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      didTimeout = true;
      reject(new Error('Request timed out'));
    }, ipfsTimeout);

    fetchFromDijix(0, hash, ipfsHash)
      .then(response => {
        clearTimeout(timeout);
        if (!didTimeout) {
          resolve(response);
        }
      })
      .catch(err => {
        if (didTimeout) return;
        reject(err);
      });
  });
}

export function uploadProofsToIpfs(proofs) {
  if (!proofs) return undefined;
  return dijix
    .create('attestation', {
      proofs: [...proofs],
    })
    .then(({ ipfsHash }) => ipfsHash);
}

export function createAttestation(attestation) {
  if (!attestation) return undefined;

  return dijix.create('attestation', attestation).then(({ ipfsHash }) => {
    // console.log('ipfsHash', ipfsHash);
    const hex = encodeHash(ipfsHash);
    return hex;
  });
}

export function createAttestationIpfsHash(attestation) {
  if (!attestation) return undefined;

  return dijix.create('attestation', attestation).then(({ ipfsHash }) => ipfsHash);
}
