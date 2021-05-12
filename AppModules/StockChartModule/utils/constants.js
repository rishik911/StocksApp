export const STOCKS_CONSTANTS = {
  API_KEY: 'ON0D4A39FGI1VJ3O',
  DAILY_DATA: 'TIME_SERIES_DAILY',
  STOCK_NAME: 'IBM',
  MONTHLY_DATA: 'TIME_SERIES_MONTHLY',
  OPEN: 'open',
  HIGH: 'high',
  LOW: 'low',
  CLOSE: 'close',
  VOLUME: 'volume',
  SHOW_FULL: 'full',
};

export const STOCK_TYPES = {
  OPEN: '1. open',
  HIGH: '2. high',
  LOW: '3. low',
  CLOSE: '4. close',
  VOLUME: '5. volume',
};

export const RANGE_SELECTOR_BUTTONS = [
  {
    type: 'day',
    count: 1,
    text: 'Daily',
  },
  {
    type: 'week',
    count: 1,
    text: 'Weekly',
  },
  {
    type: 'month',
    count: 1,
    text: 'Monthly',
  },

  {
    type: 'year',
    count: 1,
    text: 'Yearly',
  },
  {
    type: 'all',
    text: 'All',
  },
];
