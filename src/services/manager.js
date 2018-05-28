import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getManagerList() {
  return request(api.manager.getManagerList)
}

export default {
  getManagerList
}