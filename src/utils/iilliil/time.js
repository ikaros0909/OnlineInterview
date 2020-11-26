import moment from 'moment';

export const currentTime = () => {
  return moment().format('YYYY-MM-DD[T]HH:mm:ss');
};

export const convertTime_Full = (time) => {
  if (!time || time < 0) return false;
  return moment(time).format('YYYY-MM-DD[T]HH:mm:ss');
};

export const convertTime_YYMMDD = (time) => {
  if (!time || time < 0) return false;
  return moment(time).format('YYMMDD');
};

export const convertTime_mmss = (time, zeroVisible) => {
  let R = false;
  if (!time || time < 0) {
    if (zeroVisible) R = moment().startOf('day').seconds(0).format('mm:ss');
  } else {
    R = moment().startOf('day').seconds(time).format('mm:ss');
  }
  return R;
};

/**
 * @param date - 타입: new DATE()
 */
export const getDatetime = (date) => {
  const year = date.getFullYear(); // yyyy
  let month = date.getMonth() + 1; // M
  month = month >= 10 ? month : '0' + month; // month 두자리로 저장
  let day = date.getDate(); // d
  day = day >= 10 ? day : '0' + day; // day 두자리로 저장

  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return {
    year,
    month,
    day,
    hour,
    minute,
    seconds,
    milliseconds,
  };
};

// 현재시간 '2020-08-04 09:02:57'
export const getNowDateTime = () => {
  const date = new Date();
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(
    -2,
  )} ${date.toLocaleTimeString()}.${date.getMilliseconds()}`;
};

/**
 * @param secondsTime - 타입: Integer
 */
export const transSeconds_DateTime = (secondsTime) => {
  let days = parseInt(secondsTime / (60 * 60 * 24), 10);
  let hours = parseInt(secondsTime / (60 * 60), 10) % 24;
  let minutes = parseInt(secondsTime / 60, 10) % 60;
  let seconds = secondsTime % 60;
  days = `${days}`;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

/**
 * @param inputText - 처리할 인자 inputText: 2020-03-10 18:02:54
 */
export const transString_Datetime = (inputText) => {
  const _inputText = String(inputText) || '';
  const inputDate = _inputText.replace(/-/g, '/');
  const regiTime = Date.parse(inputDate);
  return regiTime;
};
