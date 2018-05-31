import { manager } from '../services'

export default {

  namespace: 'manager',

  state: {
    managerList: [],
    imageUrl: null,
    managerForm: {
      info: {},
      managerName: {},
      managerPosition: {},
      managerInroduction: {}
    }
  },

  subscriptions: {
  },

  effects: {
    *getManagerList({ payload }, { put, call }) {
      let data = yield call(manager.getManagerList)
      yield put({ type: 'managerList', payload: data })
    },
    *addManager({ payload }, { call }) {
      yield call(manager.addManager, payload)
    },
    *updateManager({ payload }, { call }) {
      yield call(manager.updateManager, payload)
    },
    *changeManagerForm({ payload }, { put }) {
      yield put({ type: 'managerForm', payload })
    },
    *deleteManager({ payload }, { call }) {
      yield call(manager.deleteManager, payload)
    },
    *updateImageUrl({ payload }, { put }) {
      yield put({ type: 'imageUrl', payload })
    }
  },

  reducers: {
    managerList(state, { payload }) {
      return {
        ...state,
        managerList: payload.list
      }
    },
    managerForm(state, { payload }) {
      return {
        ...state,
        managerForm: {
          ...state.managerForm,
          ...payload
        }
      }
    },
    imageUrl(state, { payload }) {
      return {
        ...state,
        imageUrl: payload
      }
    }
  },

}
