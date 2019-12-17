import 'whatwg-fetch';
import isObject from 'is-object';
import { api } from 'Src/config/endpoints';

const isDevelopment = process.env.NODE_ENV === 'development';

export default (route, data = null, file = false, endpoint = api) => {
  isDevelopment &&
    console.log(
      `Fetch: %c ${route} %c ${endpoint}`,
      'color: #66CC66',
      'color: #66FFFF'
    );

  isDevelopment && console.log(data);

  return fetch(endpoint + route, {
    method: data ? 'POST' : 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(file ? {} : { 'Content-Type': 'application/json; charset=utf-8' })
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    ...(isObject(data) && { body: file ? data : JSON.stringify(data) })
  })
    .then(res => res.json())
    .then(data => {
      isDevelopment && console.table(data);
      if (data.success === undefined) data.success = false;
      return data;
    })
    .catch(err => {
      console.log(`%c Error: %c ${err}`, 'color: #FF8888', 'color: #FFFFFF');
      return { success: false };
    });
};
