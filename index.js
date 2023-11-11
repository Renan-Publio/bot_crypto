const axios = require('axios');
const crypto = require('crypto');

const SYMBOL = 'BTCUSDT';
const BUY_PRICE = 34977;
const SELL_PRICE = 35170;
const QUANTITY = '0.001';
const API_LEY =
  'm2lDx32y8jSR1lIC1A0vjqfYT7uoQ1nZ6xxY47cKyAagRqmpfjSQnKVOYmVl1Kcw';
const SECRET_KEY =
  'Ruz0qGe1fBLEGtwmaRPkDc2ueJbUELc4bUjWESG0kSGMIgp0kMVojZ4jBBZhamMc';

const API_URL = 'https://testnet.binance.vision';

let isOpened = false;

async function start() {
  const { data } = await axios.get(
    API_URL + '/api/v3/klines?limit=21&interval=15m&symbol=' + SYMBOL,
  );
  const candle = data[data.length - 1];
  const price = parseFloat(candle[4]);

  console.clear();
  console.log('Price:' + price);

  const sma = calcSMA(data);
  console.log('SMA now: ' + sma);
  console.log('Is Opened? ' + isOpened);
  if (isOpened) console.log('Sell Price: ' + SELL_PRICE);
  else console.log('Buy Price: ' + BUY_PRICE);

  if (price < BUY_PRICE && !isOpened) {
    console.log('Comprar!');
    newOrder(SYMBOL, QUANTITY, 'BUY');
    isOpened = true;
  } else if (price > SELL_PRICE && isOpened) {
    console.log('Vender!');
    newOrder(SYMBOL, QUANTITY, 'sell');
    isOpened = false;
  }
}

function calcSMA(candles) {
  const closes = candles.map((c) => parseFloat(c[4]));
  const sum = closes.reduce((a, b) => a + b);
  return sum / closes.length;
}

async function newOrder(symbol, quantity, side) {
  const order = { symbol, quantity, side };
  order.type = 'MARKET';
  order.timestamp = Date.now();

  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(new URLSearchParams(order).toString())
    .digest('hex');

  order.signature = signature;

  try {
    const { data } = await axios.post(
      API_URL + '/api/v3/order',
      new URLSearchParams(order).toString(),
      { headers: { 'X-MBX-APIKEY': API_KEY } },
    );

    console.log(data);
  } catch (err) {
    console.error(err.response.data);
  }
}

setInterval(start, 3000);

start();
