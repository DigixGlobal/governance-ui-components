import moment from 'moment';

export function updateMomentLocale(lang) {
  if (lang) {
    switch (lang) {
      case 'cn': {
        moment.updateLocale('zh-cn', {
          relativeTime: {
            past: '%s 前',
          },
        });
        break;
      }
      case 'en': {
        moment.updateLocale('en', {
          relativeTime: {
            past: '%s ago',
          },
        });
        break;
      }
      default:
        break;
    }
  }
}

export function getElapsedTime(date) {
  const timeElapsed = moment(date);

  return timeElapsed.fromNow();
}
