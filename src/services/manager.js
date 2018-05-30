import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getManagerList() {
  return request(api.manager.getManagerList)
}

function deleteManager(data) {
  return request(api.manager.deleteManager, {
    method: 'delete',
    nullRes: true,
    data
  })
}

function addManager(data) {
  return request(api.manager.addManager, {
    method: 'post',
    nullRes: true,
    data
  })
}

export default {
  getManagerList,
  addManager,
  deleteManager
}