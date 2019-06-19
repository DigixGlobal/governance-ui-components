/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

export function browserDetection() {
  const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  const isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === '[object SafariRemoteNotification]';})(!window.safari || (typeof safari !== 'undefined' && safari.pushNotification));

    let blocklist = [];

    if (isOpera) {
        blocklist = ['TREZOR', 'METAMASK'];
        return blocklist;
    } else if (isFirefox) {
        blocklist = ['LEDGER'];
    } else if (isSafari) {
        blocklist = ['TREZOR', 'METAMASK', 'LEDGER'];
    } else if (isChrome) {
        blocklist = [];
        return blocklist;
    }

    return blocklist;
}
