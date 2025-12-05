const LOCALE = 'en-US';

const longDate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const shortDate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const monthYear: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
};

const toDate = (input: Date | string) => (input instanceof Date ? input : new Date(input));

export const formatDateLong = (input: Date | string) =>
  toDate(input).toLocaleDateString(LOCALE, longDate);

export const formatDateShort = (input: Date | string) =>
  toDate(input).toLocaleDateString(LOCALE, shortDate);

export const formatMonthYear = (input: Date | string) =>
  toDate(input).toLocaleDateString(LOCALE, monthYear);
