import {isValidElement} from '../../../MyApp/Utils/helpers';

export const constructData = (stockData, dailyDates, type) => {
  let data = [];
  if (isValidElement(stockData) && isValidElement(dailyDates)) {
    dailyDates.forEach((date, index) => {
      data.unshift({
        x: new Date(date).getTime(),
        y: Number(stockData[index][type]),
      });
    });
  }
  return data.slice(1, 300);
};
