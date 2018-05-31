const url = 'http://192.168.0.188:9444/disclosure'
// const url = './disclosure'
const imgUrl = 'http://192.168.0.188:8088'
export default {
  api: {
    sign: {
      login: `${url}/login` // 登录
    },
    product: {
      getProductList: `${url}/fund/findList`,  // 产品列表
      addProduct: `${url}/fund/create`, // 新建产品
      updateProduct: `${url}/fund/update`, // 更新产品
      deleteProduct: `${url}/fund/delete` // 删除产品
    },
    manager: {
      getManagerList: `${url}/fundManager/findList`, // 查询产品经理
      addManager: `${url}/fundManager/create`, // 增加产品经理
      updateManager: `${url}/fundManager/update`, // 更新产品经理
      deleteManager: `${url}/fundManager/delete`, // 删除产品经理
      avatarImport: `${url}/import`, // 头像
    },
    notice: {
      getNoticeList: `${url}/fundNotice/findList`,  // 产品公告列表
      addNotice: `${url}/fundNotice/create`, // 新建产品公告
      updateNotice: `${url}/fundNotice/update`, // 更新产品公告
      deleteNotice: `${url}/fundNotice/delete` // 删除产品公告
    },
    share: {
      getShareList: `${url}/share/findList`,  // 产品分红列表
      addShare: `${url}/share/create`, // 新建产品分红
      updateShare: `${url}/share/update`, // 更新产品分红
      deleteShare: `${url}/share/delete` // 删除产品分红
    },
    netvalue: {
      getNetvalueList: `${url}/netvalue/findList`,  // 产品净值列表
      addNetvalue: `${url}/netvalue/create`, // 新建产品净值
      updateNetvalue: `${url}/netvalue/update`, // 更新产品净值
      deleteNetvalue: `${url}/netvalue/delete` // 删除产品净值
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