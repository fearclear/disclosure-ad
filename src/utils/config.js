const url = 'http://120.27.159.30:9444/disclosure'
// const url = './disclosure'
const imgUrl = 'http://120.27.159.30:8077'
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
    user: {
      getUserList: `${url}/findAllUser`,  // 用户列表
      addUser: `${url}/addUser`, // 新建用户
      updateUser: `${url}/updateUser`, // 更新用户
      deleteUser: `${url}/delUser`, // 删除用户
      getProduct: `${url}/fund/fundUserList`, // 查询持有产品
      addProduct: `${url}/fund/fundUserCreate`, // 新增产品分配
      deleteProduct: `${url}/fund/fundUserDelete`, // 删除产品分配
    },
    netvalue: {
      getNetvalueList: `${url}/netvalue/findList`,  // 产品净值列表
      addNetvalue: `${url}/netvalue/create`, // 新建产品净值
      updateNetvalue: `${url}/netvalue/update`, // 更新产品净值
      deleteNetvalue: `${url}/netvalue/delete`, // 删除产品净值
      import: `${url}/netvalue/import` // 删除产品净值
    },
  },
  key: {
    version: 'VERSION',
    managerList: 'MANAGERLIST'
  },
  url,
  imgUrl,
  fav: 'http://192.168.1.188/disclosure/favicon.ico',
  logo: 'http://192.168.1.188/disclosure/assets/logo.png',
  userIcon: 'http://192.168.1.188/disclosure/assets/user-icon.png'
}