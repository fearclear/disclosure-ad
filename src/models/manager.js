import { manager } from '../services'
import { message } from 'antd'

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
      let data = yield call(manager.addManager, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *updateManager({ payload }, { call }) {
      let data = yield call(manager.updateManager, payload)
      if(data.ok) {
        message.success('修改成功')
      }
    },
    *changeManagerForm({ payload }, { put }) {
      yield put({ type: 'managerForm', payload })
    },
    *deleteManager({ payload }, { call }) {
      let data = yield call(manager.deleteManager, payload)
      if(data.ok) {
        message.success('删除成功')
      }
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
