import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { Table, Button, Modal, Form, Input, Row, Col, Select, Popconfirm, DatePicker } from 'antd'
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
    getProductList() {
      dispatch({ type: 'product/getProductList' })
    },
    addProduct(data) {
      dispatch({ type: 'product/addProduct', payload: data })
        .then(this.getProductList)
    },
    updateProduct(data) {
      dispatch({ type: 'product/updateProduct', payload: data })
        .then(this.getProductList)
    },
    deleteProduct(record) {
      dispatch({ type: 'product/deleteProduct', payload: record })
        .then(this.getProductList)
    },
    changeProductForm(payload) {
      dispatch({ type: 'product/changeProductForm', payload})
    },
    getManagerList() {
      dispatch({ type: 'manager/getManagerList' })
    }
  }
}

const ProductForm = connect(mapStateProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.changeProductForm(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let i in props.product.productForm) {
      fields[i] = Form.createFormField({
        ...props.product.productForm[i]
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
      this.props.getManagerList()
    }
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.props.form.validateFields((err, values) => {
        if(!err) {
          values.valueDate = values.valueDate.format('YYYY-MM-DD')
          if(!this.props.formData.fundId) {
            this.props.addProduct(values)
          } else {
            values.fundId = this.props.formData.fundId
            this.props.updateProduct(values)
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
      const { managerList } = this.props.manager
      const { models } = this.props.loading
      let loading = models.product
      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="common-form" >
          <Row>
            <Col span={12} >
              <FormItem label="产品名称" {...formLayout} >
                {getFieldDecorator('fundName', {
                  rules: [{ required: true, message: '请输入产品名称！' }]
                })(
                  <Input placeholder="产品名称" />
                )}
              </FormItem>
            </Col>
            <Col span={12} >
              <FormItem label="产品类型" {...formLayout} >
                {getFieldDecorator('fundType', {
                  rules: [{ required: true, message: '请输入产品类型！' }]
                })(
                  <Input placeholder="产品类型" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <FormItem label="管理人" {...formLayout} >
                {getFieldDecorator('administrator', {
                  rules: [{ required: true, message: '请输入管理人！' }]
                })(
                  <Input placeholder="管理人" />
                )}
              </FormItem>
            </Col>
            <Col span={12} >
              <FormItem label="产品经理" {...formLayout} >
                {getFieldDecorator('managerId', {
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择产品经理"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      managerList?managerList.map((i, index) => (
                        <Option key={i.managerId} >{i.managerName}</Option>
                      )):''
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <FormItem label="风险等级" {...formLayout} >
                {getFieldDecorator('risk', {
                  rules: [{ required: true, message: '请输入风险等级！' }]
                })(
                  <Input placeholder="风险等级" />
                )}
              </FormItem>
            </Col>
            <Col span={12}  >
              <FormItem label="发行日期" {...formLayout}>
                {getFieldDecorator('valueDate', {
                  rules: [{ required: true, message: '请输入发行日期！' }]
                })(
                  <DatePicker placeholder="发行日期" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <FormItem label="储存期限" {...formLayout} >
                {getFieldDecorator('term', {
                  rules: [{ required: true, message: '请输入储存期限！' }]
                })(
                  <Input placeholder="储存期限" />
                )}
              </FormItem>
            </Col>
            <Col span={12} >
              <FormItem label="开放频率" {...formLayout} >
                {getFieldDecorator('open', {
                  rules: [{ required: true, message: '请输入开放频率！' }]
                })(
                  <Input placeholder="开放频率" />
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

class Product extends React.Component {
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
        title: '产品名称',
        dataIndex: 'fundName'
      },
      {
        title: '产品类型',
        dataIndex: 'fundType',
        render: text => text
      },
      {
        title: '管理人',
        dataIndex: 'administrator'
      },
      {
        title: '产品经理',
        dataIndex: 'managerName'
      },
      {
        title: '风险等级',
        dataIndex: 'risk'
      },
      {
        title: '发行日期',
        dataIndex: 'valueDate',
        render: text => (moment(text).format('YYYY-MM-DD'))
      },
      {
        title: '开放频率',
        dataIndex: 'term'
      },
      {
        title: '运行状态',
        dataIndex: 'state'
      },
      {
        title: '操作',
        align: 'center',
        width: '200px',
        dataIndex: 'handle',
        render: (text, record) => (
          <div>
            <Button onClick={this.update.bind(this, record)} >修改</Button>
            <Popconfirm title="确认删除该产品吗" onConfirm={this.delete.bind(this, record)}>
              <Button className='common-next-btn' type="danger">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    this.state = {
      columns,
      visible: false,
      formData: {}
    }
  }
  initForm() {
    this.props.changeProductForm({
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
    data.valueDate.value = moment(data.valueDate.value)
    this.props.changeProductForm(data)
  }
  delete(record) {
    this.props.deleteProduct(record)
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.props.getProductList()
    this.initForm() 
  }
  render() {
    let { columns, visible, formData } = this.state
    const { productList } = this.props.product
    const { models } = this.props.loading
    let loading = models.product
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
        </div>
        <Table
          dataSource={productList}
          columns={columns}
          loading={loading}
          bordered
          rowKey="fundId"
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
          width="650px"
        >
          <ProductForm cancel={this.hideModal.bind(this)} formData={formData} />
        </Modal>

      </div>
    )
  }
}


export default connect(mapStateProps, mapDispatchToProps)(Product)