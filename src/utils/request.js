import fetch from 'dva/fetch'
import { message } from 'antd'
import qs from 'querystring'

let status = {}

function parseJSON(nullRes, response) {
  status.status = response.status
  status.ok = response.ok
  if(!nullRes || status.status>300){
    return response.json()
  } else {
    return response.text()
  }
}

function checkStatus(response) {
  if(status.status>300) {
    message.error(response.text)
  }
  return response
}

let headers = new Headers()
headers.append('x-disclosure-terminal', 'PC')
headers.append('x-disclosure-version', '1')
headers.append('x-disclosure-token', '')

export function changeToken(token) {
  headers.set('x-disclosure-token', token)
}

export function getHeaders() {
  return headers
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
  } else {
    url += `?${qs.stringify(options.data)}`
  }
  if(/login$/.test(url)){
    headers.delete('x-disclosure-token')
  }
  options = {
    ...options,
    headers,
  }
  let nullRes = options.nullRes
  return fetch(url, options)
    .then(parseJSON.bind(this, nullRes))
    .then(checkStatus)
    .then(data => {
      if(data instanceof Array) {
        data = {
          list: data,
        }
      }
      return { ...data, ...status }
    })
    .catch(err => {
      return {err}
    })
}
