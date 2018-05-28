import { product } from '../services'

export default {

  namespace: 'product',

  state: {
    productList: []
  },

  subscriptions: {
  },

  effects: {
    *getProductList({dispatch}, {put, call}) {
      let list = yield call(product.getProductList)
      yield put({ type: 'productList', payload: list })
    }
  },

  reducers: {
    productList(state, { payload }) {
      return {
        ...state,
        productList: payload.listData
      }
    }
  },

}
