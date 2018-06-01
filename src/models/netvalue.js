import { netvalue } from '../services'
import { message } from 'antd'

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
      let data = yield call(netvalue.addNetvalue, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *updateNetvalue({ payload }, { call }) {
      let data = yield call(netvalue.updateNetvalue, payload)
      if(data.ok) {
        message.success('修改成功')
      }
    },
    *changeNetvalueForm({ payload }, { put }) {
      yield put({ type: 'netvalueForm', payload })
    },
    *deleteNetvalue({ payload }, { call }) {
      let data = yield call(netvalue.deleteNetvalue, payload)
      if(data.ok) {
        message.success('删除成功')
      }
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
      return {
        ...state,
        fundId: payload
      }
    }
  },

}
