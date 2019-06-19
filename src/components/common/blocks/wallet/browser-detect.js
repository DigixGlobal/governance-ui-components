/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

export function browserDetection() {
  const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === '[object SafariRemoteNotification]';})(!window.safari || (typeof safari !== 'undefined' && safari.pushNotification));
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  if (isOpera) {
    return ['TREZOR', 'METAMASK'];
  } else if (isFirefox) {
    return ['LEDGER'];
  } else if (isSafari) {
    return ['TREZOR', 'METAMASK', 'LEDGER'];
  } else if (isChrome) {
    return [];
  }

  return [];
}
