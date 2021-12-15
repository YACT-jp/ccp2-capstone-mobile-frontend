import moment from 'moment';

export const getDisplayDate = timestamp => {
  return moment(timestamp, 'YYYYMMDDHHmmss').fromNow();
};
