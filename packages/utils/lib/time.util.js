import dayjs from 'dayjs';

// 当前时间是否在某一时间区间内
export function isTimeBetween(time = '', separation = '-') {
  let t;
  if (Array.isArray(time)) {
    t = time;
  } else {
    t = time.trim().split(separation);
  }
  if (t.length !== 2) {
    return new Error('日期格式不正确，示例：[9:00, 11:00]/"9:00-11:00"');
  }
  let start = t[0].split(':');
  let end = t[1].split(':');
  const now = dayjs();
  start = now.set('hour', start[0]).set('minute', start[1]);
  end = now.set('hour', end[0]).set('minute', end[1]);
  return start.unix() <= now.unix() && now.unix() <= end.unix();
}

// 时间是否在某段日期区间内
export function isDateInRange(dateRange = [], date) {
  if (dateRange.length !== 2) {
    return new Error('日期格式不正确，示例：[startTime, endTime]');
  }
  if (!dateRange[0] || !dateRange[1]) {
    return false;
  }
  const now = dayjs(date);
  const start = now.diff(dateRange[0]);
  const end = now.diff(dateRange[1]);
  return start >= 0 && end <= 0;
}

export function timeFormatInChinese(dateTime) {
  if (!dateTime) {
    return '';
  }
  const time = dayjs(dateTime);
  let datetimeFormat = 'YYYY年M月D日H点';
  if (time.second() !== 0) {
    datetimeFormat = 'YYYY年M月D日H点m分s秒';
  } else if (time.minute() !== 0) {
    datetimeFormat = 'YYYY年M月D日H点m分';
  }
  return time.format(datetimeFormat);
}
