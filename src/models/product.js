import { product } from '../services'
import moment from 'moment'
import { message } from 'antd'

export default {

  namespace: 'product',

  state: {
    productList: [],
    productForm: {
      fundName: {},
      fundType: {},
      administrator: {},
      managerId: {},
      risk: {},
      valueDate: {
        value: moment()
      },
      term: {},
      open: {}
    }
  },

  subscriptions: {
  },

  effects: {
    *getProductList({ dispatch }, { put, call }) {
      let list = yield call(product.getProductList) || []
      yield put({ type: 'productList', payload: list })
    },
    *addProduct({ payload }, { call }) {
      let data = yield call(product.addProduct, payload)
      if(data.ok) {
        message.success('添加成功')
      }
    },
    *updateProduct({ payload }, { call }) {
      let data = yield call(product.updateProduct, payload)
      if(data.ok) {
        message.success('修改成功')
      }
    },
    *deleteProduct({ payload }, { call }) {
      let data = yield call(product.deleteProduct, payload)
      if(data.ok) {
        message.success('删除成功')
      }
    },
    *changeProductForm({ payload }, { put }) {
      yield put({ type: 'productForm', payload })
    }

  },

  reducers: {
    productList(state, { payload }) {
      return {
        ...state,
        productList: payload.listData
      }
    },
    productForm(state, { payload }) {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          ...payload
        }
      }
    }
  },

}
