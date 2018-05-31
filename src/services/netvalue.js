import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getNetvalueList(data) {
  return request(api.netvalue.getNetvalueList, {
    data
  })
}

function addNetvalue(data) {
  return request(api.netvalue.addNetvalue, {
    method: 'post',
    nullRes: true,
    data
  })
}

function updateNetvalue(data) {
  return request(api.netvalue.updateNetvalue, {
    method: 'put',
    nullRes: true,
    data
  })
}

function deleteNetvalue(data) {
  return request(api.netvalue.deleteNetvalue, {
    method: 'delete',
    nullRes: true,
    data
  })
}

export default {
  getNetvalueList,
  addNetvalue,
  updateNetvalue,
  deleteNetvalue
}