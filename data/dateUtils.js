import moment from 'moment-timezone';

export const getDisplayDate = timestamp => {
  const string = moment(timestamp, 'YYYYMMDDHHmmss').add(8, 'h')  
  return string.fromNow();
};
