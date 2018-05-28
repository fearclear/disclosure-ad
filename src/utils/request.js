import fetch from 'dva/fetch'
import qs from 'querystring'

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

let headers = new Headers()
headers.append('x-disclosure-terminal', 'PC')
headers.append('x-disclosure-version', '1')
headers.append('x-disclosure-token', '')

export function changeToken(token) {
  headers.set('x-disclosure-token', token)
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options = options || {}
  if(options.method === 'put' || options.method === 'post') {
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    options.body = qs.stringify(options.data)
  }
  if(/login$/.test(url)){
    headers.delete('x-disclosure-token')
  }
  options = {
    ...options,
    headers,
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if(data instanceof Array) {
        data = {
          list: data,
        }
      }
      return { ...data }
    })
    .catch(err => ({ err }))
}