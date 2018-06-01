import { user } from '../services'
import { message } from 'antd'

export default {

  namespace: 'user',

  state: {
    userList: [],
    userForm: {
      loginName: {},
      userName: {},
      userCard: {},
      riskResult: {}
    },
    userProductList: [],
    fundUserId: ''
  },

  subscriptions: {
  },

  effects: {
    *getUserList({ payload }, { put, call }) {
      let data = yield call(user.getUserList)
      yield put({ type: 'userList', payload: data })
    },
    *addUser({ payload }, { call }) {
      let data = yield call(user.addUser, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *updateUser({ payload }, { call }) {
      let data = yield call(user.updateUser, payload)
      if(data.ok) {
        message.success('修改成功')
      }
    },
    *changeUserForm({ payload }, { put }) {
      yield put({ type: 'userForm', payload })
    },
    *deleteUser({ payload }, { call }) {
      let data = yield call(user.deleteUser, payload)
      if(data.ok) {
        message.success('删除成功')
      }
    },
    *getProductList({ payload }, { put, call }) {
      let data = yield call(user.getProduct, payload)
      yield put({ type: 'userProductList', payload: data })
    },
    *addProduct({ payload }, { put, call, select }) {
      payload.fundUserId = yield select(state => state.user.fundUserId)
      let data = yield call(user.addProduct, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *deleteProduct({ payload }, { call }) {
      let data = yield call(user.deleteProduct, payload)
      if(data.ok) {
        message.success('删除成功')
      }
    },
    *changeFundUserId({ payload }, { put, call, take, select }) {
      yield put({ type: 'fundUserId', payload })
      yield take('fundUserId/@@end')
      const fundUserId = yield select((state) => state.user.fundUserId)
      yield put({ type: 'getProductList', payload: {fundUserId} })
    }
  },

  reducers: {
    userList(state, { payload }) {
      return {
        ...state,
        userList: payload.list
      }
    },
    userProductList(state, { payload }) {
      return {
        ...state,
        userProductList: payload.list
      }
    },
    userForm(state, { payload }) {
      return {
        ...state,
        userForm: {
          ...state.userForm,
          ...payload
        }
      }
    },
    fundUserId(state, { payload }) {
      return {
        ...state,
        fundUserId: payload.userId
      }
    }
  },

}
