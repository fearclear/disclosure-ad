// const url = 'http://192.168.0.188:9444/disclosure'
const url = './disclosure'
export default {
  api: {
    sign: {
      login: `${url}/login`
    },
    product: {
      getProductList: `${url}/fund/findList`  // 产品产品列表
    },
    manager: {
      getManagerList: `${url}/fundManager/findList` // 查询产品经理
    },
  },
  key: {
    version: 'VERSION',
    managerList: 'MANAGERLIST'
  },
  fav: '/favicon.ico',
  logo: '/assets/logo.png',
  userIcon: '/assets/user-icon.png'
}