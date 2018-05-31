import { product } from '../services'
import moment from 'moment'

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
      yield call(product.addProduct, payload)
    },
    *updateProduct({ payload }, { call }) {
      yield call(product.updateProduct, payload)
    },
    *deleteProduct({ payload }, { call }) {
      yield call(product.deleteProduct, payload)
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
