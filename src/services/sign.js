import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function login() {
  return request(api.sign.login, {
    method: 'post',
    data: {
      loginName: '17666666666',
      password: 'C56D0E9A7CCEC67B4EA131655038D604'
    }
  })
}

export default {
  login
}