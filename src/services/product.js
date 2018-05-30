import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getProductList() {
  return request(api.product.getProductList)
}

function addProduct(data) {
  return request(api.product.addProduct, {
    method: 'post',
    nullRes: true,
    data
  })
}

function updateProduct(data) {
  return request(api.product.updateProduct, {
    method: 'put',
    nullRes: true,
    data
  })
}

function deleteProduct(data) {
  return request(api.product.deleteProduct, {
    method: 'delete',
    nullRes: true,
    data
  })
}

export default {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct
}