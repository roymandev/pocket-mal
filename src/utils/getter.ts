import { Dayjs } from 'dayjs';

export const getSeason = (date: Dayjs) => {
  const month = date.month();

  switch (true) {
    case [0, 1, 2].includes(month):
      return 'winter';
    case [3, 4, 5].includes(month):
      return 'spring';
    case [6, 7, 8].includes(month):
      return 'summer';
    default:
      return 'fall';
  }
};
