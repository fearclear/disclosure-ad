import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getUserList() {
  return request(api.user.getUserList)
}

function addUser(data) {
  return request(api.user.addUser, {
    method: 'post',
    nullRes: true,
    data
  })
}

function updateUser(data) {
  return request(api.user.updateUser, {
    method: 'put',
    nullRes: true,
    data
  })
}

function deleteUser(data) {
  return request(api.user.deleteUser, {
    method: 'delete',
    nullRes: true,
    data
  })
}

function addProduct(data) {
  return request(api.user.addProduct, {
    method: 'post',
    nullRes: true,
    data
  })
}

function deleteProduct(data) {
  return request(api.user.deleteProduct, {
    method: 'delete',
    nullRes: true,
    data
  })
}

function getProduct(data) {
  return request(api.user.getProduct, {
    data
  })
}

export default {
  getUserList,
  addUser,
  updateUser,
  deleteUser,
  getProduct,
  deleteProduct,
  addProduct
}