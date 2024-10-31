import { isWeekdayBusinessHours } from './date-utils';

describe('isWeekdayBusinessHours', () => {
  it('should return true for a weekday within business hours', () => {
    const date = new Date('2023-10-04T14:00:00Z'); // Wednesday 10:00 AM EDT
    expect(isWeekdayBusinessHours(date)).toBe(true);
  });

  it('should return false for a weekday before business hours', () => {
    const date = new Date('2023-10-04T12:00:00Z'); // Wednesday 8:00 AM EDT
    expect(isWeekdayBusinessHours(date)).toBe(false);
  });

  it('should return false for a weekday after business hours', () => {
    const date = new Date('2023-10-04T21:00:00Z'); // Wednesday 5:00 PM EDT
    expect(isWeekdayBusinessHours(date)).toBe(false);
  });

  it('should return false for a weekend within business hours', () => {
    const date = new Date('2023-10-07T14:00:00Z'); // Saturday 10:00 AM EDT
    expect(isWeekdayBusinessHours(date)).toBe(false);
  });

  it('should return false for a weekend outside business hours', () => {
    const date = new Date('2023-10-07T21:00:00Z'); // Saturday 5:00 PM EDT
    expect(isWeekdayBusinessHours(date)).toBe(false);
  });

  it('should return false for a weekday exactly at the end of business hours', () => {
    const date = new Date('2023-10-04T20:00:00Z'); // Wednesday 4:00 PM EDT
    expect(isWeekdayBusinessHours(date)).toBe(false);
  });
});
