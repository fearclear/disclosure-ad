import React from 'react'
import { connect } from 'dva'
import { Table, Button, Modal, Input, Form, Row, Col, Select, Popconfirm, Icon } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option

const mapStateProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList() {
      dispatch({ type: 'user/getUserList' })
    },
    addUser(data) {
      dispatch({ type: 'user/addUser', payload: data })
        .then(this.getUserList)
    },
    updateUser(data) {
      dispatch({ type: 'user/updateUser', payload: data })
        .then(this.getUserList)
    },
    deleteUser(record) {
      dispatch({ type: 'user/deleteUser', payload: record })
        .then(this.getUserList)
    },
    changeUserForm(payload) {
      dispatch({ type: 'user/changeUserForm', payload })
    },
    getProductList() {
      dispatch({ type: 'product/getProductList' })
    },
    getUserProductList(payload) {
      payload = {
        fundUserId: this.user.fundUserId
      }
      dispatch({ type: 'user/getProductList', payload })
    },
    addUserProduct(payload) {
      dispatch({ type: 'user/addProduct', payload })
    },
    changeFundUserId(payload) {
      dispatch({ type: 'user/changeFundUserId', payload })
    }
  }
}

const UserForm = connect(mapStateProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.changeUserForm(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let i in props.user.userForm) {
      fields[i] = Form.createFormField({
        ...props.user.userForm[i]
      })
    }
    return fields
  },
  onValuesChange(_, values) {
    // console.log(values)
  }
})(
  class extends React.Component {
    componentDidMount() {
      this.props.getProductList()
    }
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.props.form.validateFields((err, values) => {
        if(!err) {
          if(!this.props.formData.userId) {
            this.props.addUser(values)
          } else {
            values.sysUserId = this.props.formData.userId
            this.props.updateUser(values)
          }
          self.cancel()
          self.props.form.resetFields()
        }
      })
    }
    cancel() {
      this.props.cancel()
    }

    render() {
      const { getFieldDecorator } = this.props.form
      const { formLayout } = this.props.dcad
      const { models } = this.props.loading
      let loading = models.user
      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="common-form" >
          <Row>
            <Col>
              <FormItem label="用户名" {...formLayout} >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名！' }]
                })(
                  <Input style={{ width: 200 }} placeholder="用户名" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="登录名" {...formLayout} >
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: '请输入登录名！' }]
                })(
                  <Input style={{ width: 200 }} placeholder="登录名" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="身份证号" {...formLayout}>
                {getFieldDecorator('userCard', {
                  rules: [{ required: true, message: '请输入身份证号！' }]
                })(
                  <Input style={{ width: 200 }} placeholder="身份证号" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="等级认定" {...formLayout}>
                {getFieldDecorator('riskResult', {
                  rules: [{ required: true, message: '请输入等级认定！' }]
                })(
                  <Input style={{ width: 200 }} placeholder="等级认定" />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem className={styles['btn-group']} >
            <Button type="primary" loading={loading} htmlType="submit" className={styles["sign-in"]}>确认</Button>
            <Button className={styles.cancel} onClick={this.cancel.bind(this)}>取消</Button>
          </FormItem>
        </Form>
      )
    }
  }
))

const ProductForm = connect(mapStateProps, mapDispatchToProps)(Form.create()(
  class extends React.Component {
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.props.form.validateFields((err, values) => {
        console.log(values)
        if(!err) {
          this.props.addUserProduct(values)
          self.props.form.resetFields()
        }
      })
    }
    render() {
      const { productList } = this.props.product
      const { getFieldDecorator } = this.props.form
      return (
        <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
          <FormItem >
            {getFieldDecorator('fundId', {
              rules: [{ required: true, message: '请选择产品！' }]
            })(

              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择产品"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  productList ? productList.map((i, index) => (
                    <Option key={i.fundId} >{i.fundName}</Option>
                  )) : ''
                }
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              <Icon type="plus" />
            </Button>
          </FormItem>
        </Form>
      )
    }
  }
))

class user extends React.Component {
  constructor() {
    super()
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        render: (text, record, index) => index + 1
      },
      {
        title: '用户名称',
        dataIndex: 'userName'
      },
      {
        title: '登录名',
        dataIndex: 'loginName'
      },
      {
        title: '身份证号',
        dataIndex: 'userCard'
      },
      {
        title: '评定等级',
        dataIndex: 'riskResult'
      },
      {
        title: '关联产品',
        dataIndex: 'product',
        align: 'center',
        render: (text, record) => (<a href="javascript:void(0);" onClick={this.showProduct.bind(this, record)} >查看</a>)
      },
      {
        title: '操作',
        align: 'center',
        width: '200px',
        dataIndex: 'handle',
        render: (text, record) => (
          <div>
            <Button onClick={this.update.bind(this, record)} >修改</Button>
            <Popconfirm title="确认删除该用户吗" onConfirm={this.delete.bind(this, record)}>
              <Button className='common-next-btn' type="danger">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    const userProductColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        render: (text, record, index) => index + 1
      },
      {
        title: '产品名称',
        dataIndex: 'fundName',
        align: 'center'
      }
    ]
    this.state = {
      columns,
      userProductColumns,
      visible: false,
      formData: {}
    }
  }
  initForm() {
    this.props.changeUserForm({
      fundId: {},
      valueDate: {},
      title: {},
      userUrl: {},
      showProduct: false,
    })
  }
  add() {
    this.setState({
      visible: true,
      formData: {}
    })
    this.initForm()
  }
  update(record) {
    this.setState({
      visible: true,
      formData: record
    })
    let data = {}
    for(let i in record) {
      data[i] = {}
      data[i].value = record[i]
    }
    this.props.changeUserForm(data)
  }
  showProduct(record) {
    this.setState({
      showProduct: true
    })
    this.props.changeFundUserId(record)
    this.props.getProductList()
  }
  delete(record) {
    record.delUserId = record.userId
    this.props.deleteUser(record)
  }
  hideModal() {
    this.setState({
      visible: false,
      showProduct: false
    })
  }
  componentDidMount() {
    this.props.getUserList()
    this.initForm()
  }
  render() {
    let { columns, visible, formData, showProduct, userProductColumns } = this.state
    const { userList, userProductList } = this.props.user
    console.log(userProductList)
    const { models } = this.props.loading
    let loading = models.user
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
        </div>
        <Table
          dataSource={userList}
          columns={columns}
          loading={loading}
          bordered
          rowKey="userId"
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
        >
          <UserForm cancel={this.hideModal.bind(this)} formData={formData} />
        </Modal>
        <Modal
          visible={showProduct}
          onCancel={this.hideModal.bind(this)}
          footer={null}
        >
          <Table
            style={{ marginTop: '20px' }}
            dataSource={userProductList}
            columns={userProductColumns}
            loading={loading}
            rowKey="userId"
          />
          <ProductForm />
        </Modal>
      </div>
    )
  }
}


export default connect(mapStateProps, mapDispatchToProps)(user)