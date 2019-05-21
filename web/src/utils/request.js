import 'whatwg-fetch';
import { api } from 'Src/config/endpoints';

export default (route, data = null, endpoint = api) => {
  process.env.NODE_ENV === 'development' &&
    console.log(
      `Fetch: %c ${route} %c ${endpoint}`,
      'color: #66CC66',
      'color: #66FFFF'
    );
  process.env.NODE_ENV === 'development' && console.log(data);
  return fetch(endpoint + route, {
    method: data ? 'POST' : 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    ...(data && { body: JSON.stringify(data) })
  })
    .then(res => res.json())
    .then(data => {
      process.env.NODE_ENV === 'development' && console.table(data);
      if (data.success === undefined) data.success = false;
      return data;
    })
    .catch(err => {
      console.log(`%c Error: %c ${err}`, 'color: #FF8888', 'color: #FFFFFF');
      return { success: false };
    });
};
