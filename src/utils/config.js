const url = 'http://192.168.0.188:9444/disclosure'
// const url = './disclosure'
const imgUrl = 'http://192.168.0.188:8088/'
export default {
  api: {
    sign: {
      login: `${url}/login` // 登录
    },
    product: {
      getProductList: `${url}/fund/findList`,  // 产品产品列表
      addProduct: `${url}/fund/create`, // 新建产品
      updateProduct: `${url}/fund/update`, // 新建产品
      deleteProduct: `${url}/fund/delete` // 删除产品
    },
    manager: {
      getManagerList: `${url}/fundManager/findList`, // 查询产品经理
      addManager: `${url}/fundManager/create`, // 增加产品经理
      deleteManager: `${url}/fundManager/delete`, // 删除产品经理
      avatarImport: `${url}/import`, // 头像
    },
  },
  key: {
    version: 'VERSION',
    managerList: 'MANAGERLIST'
  },
  url,
  imgUrl,
  fav: '/favicon.ico',
  logo: '/assets/logo.png',
  userIcon: '/assets/user-icon.png'
}