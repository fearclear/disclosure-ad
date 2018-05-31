import { request } from '../utils'
import { config } from '../utils'

const { api } = config

function getNoticeList() {
  return request(api.notice.getNoticeList)
}

function addNotice(data) {
  return request(api.notice.addNotice, {
    method: 'post',
    nullRes: true,
    data
  })
}

function updateNotice(data) {
  return request(api.notice.updateNotice, {
    method: 'put',
    nullRes: true,
    data
  })
}

function deleteNotice(data) {
  return request(api.notice.deleteNotice, {
    method: 'delete',
    nullRes: true,
    data
  })
}

export default {
  getNoticeList,
  addNotice,
  updateNotice,
  deleteNotice
}