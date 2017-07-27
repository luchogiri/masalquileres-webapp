import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

function globalObj(){
  const isNode = typeof process === 'object' && process.versions && !!process.versions.node;

  return isNode ? global : window;
}

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

function toQueryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export function callApi(endpoint, method = 'get', body, params, headers = {}) {
  const queryParams = params ? '?'+toQueryParams(params) : '';
  return fetch(`${API_URL}/${endpoint}` + queryParams, {
    headers: {
      'content-type': 'application/json',
      Authorization: sessionStorage.getItem('jwtToken'),
      ...headers
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => {
    if(response.status === 401) {
      return { json: { msg: 'Unauthorized' }, response };
    } else {
      return response.json().then(json => ({ json, response }));
    }
  })
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject({ ...json, error: response.status });
    }
    return json;
  });
}

export function callApiMultipart(endpoint, method = 'get', body, params, headers = {}) {
  const queryParams = params ? '?'+toQueryParams(params) : '';
  return fetch(`${API_URL}/${endpoint}` + queryParams, {
    headers: {
      Authorization: sessionStorage.getItem('jwtToken'),
      ...headers
    },
    method,
    body: body,
  })
    .then(response => {
      if(response.status === 401) {
        return { json: { msg: 'Unauthorized' }, response };
      } else {
        return response.json().then(json => ({ json, response }));
      }
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({ ...json, error: response.status });
      }
      return json;
    });
}
