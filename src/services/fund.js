import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getProductList() {
  return request(api.getProductList)
}

export default {
  getProductList
}