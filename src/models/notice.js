import { notice } from '../services'
import moment from 'moment'

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
      yield call(notice.addNotice, payload)
    },
    *updateNotice({ payload }, { call }) {
      yield call(notice.updateNotice, payload)
    },
    *deleteNotice({ payload }, { call }) {
      yield call(notice.deleteNotice, payload)
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
