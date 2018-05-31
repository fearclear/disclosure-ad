import { share } from '../services'

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
      yield call(share.addShare, payload)
    },
    *updateShare({ payload }, { call }) {
      yield call(share.updateShare, payload)
    },
    *changeShareForm({ payload }, { put }) {
      yield put({ type: 'shareForm', payload })
    },
    *deleteShare({ payload }, { call }) {
      yield call(share.deleteShare, payload)
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
