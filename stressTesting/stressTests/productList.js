const URL_BASE = 'http://localhost:3030';

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';


export const options = {
  stages: [
    { duration: '2m', target: 250 }, // below normal load
    { duration: '3m', target: 250 },
    { duration: '2m', target: 500 }, // normal load
    { duration: '3m', target: 500 },
    { duration: '2m', target: 1000 }, // around the breaking point
    { duration: '3m', target: 1000 },
    { duration: '2m', target: 1200 }, // beyond the breaking point
    { duration: '3m', target: 1200 },
    { duration: '5m', target: 0 }, // scale down. Recovery stage.
  ]
};

// actual test??? only does a single test; can't check multiple
export default () => {
  const productsList = http.get(`${URL_BASE}/products`).json();
  check(productsList, {'five products returned': (result) => result.length === 5});
};