import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getProductList() {
  return request(api.product.getProductList)
}

export default {
  getProductList
}