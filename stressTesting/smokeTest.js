const URL_BASE = 'http://localhost:3030';

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

// options for 1 virtual user looping for 1 minute
// where 99% of requests must return within 1.5 seconds
export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    'http_req_duration': ['p(99)<1500']
  }
};

// actual test??? only does a single test; can't check multiple
export default () => {
  const productsList = http.get(`${URL_BASE}/products`).json();
  check(productsList, {'five products returned': (result) => result.length === 5});

  sleep(1);
};