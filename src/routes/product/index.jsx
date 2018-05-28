import React from 'react'
import { connect } from 'dva'
import { Table, Button, Modal, Form, Input, message, Row, Col, Select, Popconfirm } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option

const mapStateProps = (state) => {
  return {
    ...state
  }
}

const ProductForm = connect(mapStateProps)(Form.create()(
  class extends React.Component {
    handleSubmit(e) {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if(!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
    handleManagerChange(v) {
      console.info(v)
    }
    render() {
      const { getFieldDecorator } = this.props.form
      const { formLayout } = this.props.dcad
      const { managerList } = this.props.manager
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
                  rules: [{ required: true, message: '请输入产品经理！' }]
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择产品经理"
                    optionFilterProp="children"
                    onChange={this.handleManagerChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      managerList.map((i, index) => (
                        <Option key={index} >{i.managerName}</Option>
                      ))
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12} >
              <FormItem label="风险等级" {...formLayout} >
                {getFieldDecorator('risk', {
                  rules: [{ required: true, message: '请输入风险等级！' }]
                })(
                  <Input placeholder="风险等级" />
                )}
              </FormItem>
            </Col>
            <Col span={12} >
              <FormItem label="发行日期" {...formLayout} >
                {getFieldDecorator('valueDate', {
                  rules: [{ required: true, message: '请输入发行日期！' }]
                })(
                  <Input placeholder="发行日期" />
                )}
              </FormItem>
            </Col>
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
            <Button type="primary" htmlType="submit" className={styles["sign-in"]}>确认</Button>
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
        title: '运行状态',
        dataIndex: 'state'
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'handle',
        render: (text, record) => (
          <div>
            <Button>修改</Button>
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
    }
  }
  add() {
    this.setState({
      visible: true
    })
  }
  delete(record) {
    message.success(record.fundName)
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.props.getProductList()
  }
  render() {
    let { columns, visible } = this.state
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
          rowKey="id"
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
          width="650px"
        >
          <ProductForm />
        </Modal>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList() {
      dispatch({ type: 'product/getProductList' })
    }
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Product)