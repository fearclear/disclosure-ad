import { manager } from '../services'

export default {

  namespace: 'manager',

  state: {
    managerList: []
  },

  subscriptions: {
  },

  effects: {
    *getManagerList({ payload }, { put, call }) {
      let data = yield call(manager.getManagerList)
      yield put({ type: 'managerList', payload: data })
    }
  },

  reducers: {
    managerList(state, { payload }) {
      return {
        ...state,
        managerList: payload.list
      }
    }
  },

}
