import { notice } from '../services'
import moment from 'moment'
import { message } from 'antd'

export default {

  namespace: 'notice',

  state: {
    noticeList: [],
    productForm: {
      fundId: {},
      valueDate: {
        value: moment()
      },
      title: {},
      noticeUrl: {}
    },
    fileList: []
  },

  subscriptions: {
  },

  effects: {
    *getNoticeList({ dispatch }, { put, call }) {
      let list = yield call(notice.getNoticeList) || []
      yield put({ type: 'noticeList', payload: list })
    },
    *addNotice({ payload }, { call }) {
      let data = yield call(notice.addNotice, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *updateNotice({ payload }, { call }) {
      let data = yield call(notice.updateNotice, payload)
      if(data.ok) {
        message.success('修改成功')
      }
    },
    *deleteNotice({ payload }, { call }) {
      let data = yield call(notice.deleteNotice, payload)
      if(data.ok) {
        message.success('删除成功')
      }
    },
    *changeNoticeForm({ payload }, { put }) {
      yield put({ type: 'noticeForm', payload })
    },
    *changeFileList({ payload }, { put }) {
      yield put({ type: 'fileList', payload })
    }

  },

  reducers: {
    noticeList(state, { payload }) {
      return {
        ...state,
        noticeList: payload.list
      }
    },
    noticeForm(state, { payload }) {
      return {
        ...state,
        noticeForm: {
          ...state.noticeForm,
          ...payload
        }
      }
    },
    fileList(state, { payload }) {
      return {
        ...state,
        fileList: payload
      }
    }
  }
}
