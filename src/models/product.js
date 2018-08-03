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
    },
    params: {
      risk: [
        {id: 1, name: '低风险等级'},
        {id: 2, name: '中低风险等级'},
        {id: 3, name: '中等风险等级'},
        {id: 4, name: '中高风险等级'},
        {id: 5, name: '高风险等级'}
      ],
      fundType: [
        {id: 1, name: '混合型基金'},
        {id: 2, name: '债券型基金'},
        {id: 3, name: '股票型基金'},
        {id: 4, name: '货币型基金'}
      ],
      open: [
        {id: 1, name: '本基金不开放'},
        {id: 2, name: '每日开放'},
        {id: 3, name: '每月度开放一次'},
        {id: 4, name: '每季度开放一次'},
        {id: 5, name: '每年度开放一次'}
      ],
      state: [
        {id: 1, name: '正常'}
      ]
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
