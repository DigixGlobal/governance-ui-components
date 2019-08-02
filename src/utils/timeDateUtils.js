import moment from 'moment';

export function getElapsedTime(date) {
  const timeElapsed = moment(date);

  return timeElapsed.fromNow();
}
