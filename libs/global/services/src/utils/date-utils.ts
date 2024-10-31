import { isAfter, isBefore, setHours, setMinutes, setSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const isWeekdayBusinessHours = (date: Date): boolean => {
  const timeZone = 'America/New_York';
  const zonedDate = toZonedTime(date, timeZone);

  const startOfBusinessHours = setSeconds(setMinutes(setHours(zonedDate, 9), 30), 0);
  const endOfBusinessHours = setSeconds(setMinutes(setHours(zonedDate, 16), 0), 0);

  const day = zonedDate.getDay();
  const isWeekday = day >= 1 && day <= 5;

  return isWeekday && isAfter(zonedDate, startOfBusinessHours) && isBefore(zonedDate, endOfBusinessHours);
};

export { isWeekdayBusinessHours };
