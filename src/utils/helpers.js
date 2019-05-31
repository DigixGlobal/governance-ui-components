import React from 'react';
import Markdown from 'react-markdown';
import multihash from '@digix/multi-hash';
import util from 'ethereumjs-util';

import { fetchUserQuery } from '@digix/gov-ui/api/graphql-queries/users';
import { KycStatus, UserStatus } from '@digix/gov-ui/constants';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { renderToString } from 'react-dom/server';

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

export const getUserStatus = (addressDetails, translation) => {
  if (!addressDetails) {
    return UserStatus.guest;
  }

  if (addressDetails.isModerator) {
    return (translation && translation.moderator) || UserStatus.moderator;
  }

  if (addressDetails.isParticipant) {
    return (translation && translation.participant) || UserStatus.participant;
  }

  if (addressDetails.lastParticipatedQuarter > 0) {
    return (translation && translation.pastParticipant) || UserStatus.pastParticipant;
  }

  return (translation && translation.guest) || UserStatus.guest;
};

export const isKycApproved = apolloClient =>
  apolloClient.query({ query: fetchUserQuery }).then(response => {
    const { kyc } = response.data.currentUser;
    return kyc && kyc.status === KycStatus.approved;
  });

export const inLockingPhase = DaoDetails => {
  const currentTime = Date.now() / 1000;
  return currentTime < Number(DaoDetails.startOfMainphase);
};

// checks general conditions that should be met when doing any proposal action
export const getUnmetProposalRequirements = (apolloClient, DaoDetails, translations) => {
  const errors = [];

  const {
    common: { proposalErrors },
  } = translations;

  return isKycApproved(apolloClient).then(kycApproved => {
    if (!kycApproved) {
      errors.push(proposalErrors.invalidKyc);
    }

    if (inLockingPhase(DaoDetails)) {
      errors.push(proposalErrors.inLockingPhase);
    }

    return errors;
  });
};

export const injectTranslation = (translation, toInject, setDataDigix, dataDigixPrefix) => {
  if (!translation || !toInject) {
    return null;
  }

  const keys = Object.keys(toInject);
  let injected = translation;

  if (setDataDigix) {
    const prefix = dataDigixPrefix || 'Digix';
    injected = <Markdown source={injected} escapeHtml={false} />;
    injected = renderToString(injected);

    keys.forEach(key => {
      injected = injected.replace(
        `{{${key}}}`,
        `<span data-digix="${prefix}-${key}">${toInject[key]}</span>`
      );
    });

    return <Markdown source={injected} escapeHtml={false} />;
  }

  keys.forEach(key => {
    injected = injected.replace(`{{${key}}}`, toInject[key]);
  });

  return <Markdown source={injected} escapeHtml={false} />;
};

export const getHash = toHash => util.sha256(toHash.toString()).toString('hex');

export const hasInvalidLink = text => {
  const EMPTY_HTML = /^((<p>)((<br>)*|(\s*)|)*(<\/p>))*$/;
  if (!text || text === '' || EMPTY_HTML.test(text)) {
    return false;
  }

  const links = text.split('a href="');
  if (links.length < 2) {
    return false;
  }

  for (let i = 1; i < links.length; i += 1) {
    const link = links[i];
    const isHttp = link.startsWith('http://');
    const isHttps = link.startsWith('https://');
    const isEmail = link.startsWith('mailto:');

    if (!isHttp && !isHttps && !isEmail) {
      return true;
    }
  }

  return false;
};
