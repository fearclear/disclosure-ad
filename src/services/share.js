import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getShareList() {
  return request(api.share.getShareList)
}

function addShare(data) {
  return request(api.share.addShare, {
    method: 'post',
    nullRes: true,
    data
  })
}

function updateShare(data) {
  return request(api.share.updateShare, {
    method: 'put',
    nullRes: true,
    data
  })
}

function deleteShare(data) {
  return request(api.share.deleteShare, {
    method: 'delete',
    nullRes: true,
    data
  })
}

export default {
  getShareList,
  addShare,
  updateShare,
  deleteShare
}