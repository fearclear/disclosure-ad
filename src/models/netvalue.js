import { netvalue } from '../services'

export default {

  namespace: 'netvalue',

  state: {
    netvalueList: [],
    fundId:'',
    imageUrl: null,
    netvalueForm: {
      valueDate: {},
      accumulationNetValue: {},
      netvalueValue: {}
    }
  },

  subscriptions: {
  },

  effects: {
    *getNetvalueList({ payload }, { put, call }) {
      let data = yield call(netvalue.getNetvalueList, payload)
      yield put({ type: 'netvalueList', payload: data })
    },
    *addNetvalue({ payload }, { call }) {
      yield call(netvalue.addNetvalue, payload)
    },
    *updateNetvalue({ payload }, { call }) {
      yield call(netvalue.updateNetvalue, payload)
    },
    *changeNetvalueForm({ payload }, { put }) {
      yield put({ type: 'netvalueForm', payload })
    },
    *deleteNetvalue({ payload }, { call }) {
      yield call(netvalue.deleteNetvalue, payload)
    },
    *updateImageUrl({ payload }, { put }) {
      yield put({ type: 'imageUrl', payload })
    },
    *changeFundId({ payload }, { put }) {
      yield put({ type: 'fundId', payload })
    }
  },

  reducers: {
    netvalueList(state, { payload }) {
      return {
        ...state,
        netvalueList: payload.list
      }
    },
    netvalueForm(state, { payload }) {
      return {
        ...state,
        netvalueForm: {
          ...state.netvalueForm,
          ...payload
        }
      }
    },
    fundId(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        fundId: payload
      }
    }
  },

}
