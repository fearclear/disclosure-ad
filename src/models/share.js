import { share } from '../services'
import { message } from 'antd'

export default {

  namespace: 'share',

  state: {
    shareList: [],
    shareForm: {
      fundId: {},
      shareValue: {},
      valueDate: {}
    }
  },

  subscriptions: {
  },

  effects: {
    *getShareList({ payload }, { put, call }) {
      let data = yield call(share.getShareList)
      yield put({ type: 'shareList', payload: data })
    },
    *addShare({ payload }, { call }) {
      let data = yield call(share.addShare, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *updateShare({ payload }, { call }) {
      let data = yield call(share.updateShare, payload)
      if(data.ok) {
        message.success('修改成功')
      }
    },
    *changeShareForm({ payload }, { put }) {
      yield put({ type: 'shareForm', payload })
    },
    *deleteShare({ payload }, { call }) {
      let data = yield call(share.deleteShare, payload)
      if(data.ok) {
        message.success('删除成功')
      }
    },
  },

  reducers: {
    shareList(state, { payload }) {
      return {
        ...state,
        shareList: payload.list
      }
    },
    shareForm(state, { payload }) {
      return {
        ...state,
        shareForm: {
          ...state.shareForm,
          ...payload
        }
      }
    },
  },

}
