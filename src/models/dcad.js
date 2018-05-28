
import { config } from '../utils'// eslint-disable-line

export default {

  namespace: 'dcad',

  state: {
    formLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    },
    menuIndex: 'product'
  },

  subscriptions: {

  },

  effects: {
    *changeMenuIndex({ payload }, { put, call }) {
      yield put({ type: 'menuIndex', payload })
    }
  },

  reducers: {
    menuIndex(state, { payload }) {
      return {
        ...state,
        menuIndex: payload
      }
    },
  },

}
