import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { Table, Button, Modal, Form, message, Row, Col, Select, Popconfirm, DatePicker, InputNumber } from 'antd'
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
    getNetvalueList(payload) {
      payload = payload || {
        fundId: this.netvalue.fundId
      }
      dispatch({ type: 'netvalue/getNetvalueList', payload })
    },
    addNetvalue(data) {
      dispatch({ type: 'netvalue/addNetvalue', payload: data })
        .then(this.getNetvalueList.bind(this))
    },
    updateNetvalue(data) {
      dispatch({ type: 'netvalue/updateNetvalue', payload: data })
        .then(this.getNetvalueList.bind(this))
    },
    deleteNetvalue(record) {
      dispatch({ type: 'netvalue/deleteNetvalue', payload: record })
        .then(this.getNetvalueList.bind(this))
    },
    changeNetvalueForm(payload) {
      dispatch({ type: 'netvalue/changeNetvalueForm', payload })
    },
    getProductList() {
      dispatch({ type: 'product/getProductList' })
    },
    changeFundId(payload) {
      dispatch({ type: 'netvalue/changeFundId', payload })
    },
  }
}

const NetvalueForm = connect(mapStateProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.changeNetvalueForm(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let i in props.netvalue.netvalueForm) {
      fields[i] = Form.createFormField({
        ...props.netvalue.netvalueForm[i]
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
          values.valueDate = moment(values.valueDate).format('YYYY-MM-DD')
          if(!this.props.netvalue.fundId){
            message.error('请选择产品')
            return
          }
          values.fundId = this.props.netvalue.fundId
          if(!this.props.formData.netvalueId) {
            this.props.addNetvalue(values)
            message.success('添加成功')
          } else {
            values.netvalueId = this.props.formData.netvalueId
            this.props.updateNetvalue(values)
            message.success('修改成功')
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
      let loading = models.netvalue
      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="common-form" >
          <Row>
            <Col >
              <FormItem label="基金单位净值" {...formLayout} >
                {getFieldDecorator('assetNetValue', {
                  rules: [{ required: true, message: '请输入基金单位净值！' }]
                })(
                  <InputNumber style={{ width: 200 }} placeholder="基金单位净值" />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem label="基金累计单位净值" {...formLayout} >
                {getFieldDecorator('accumulationNetValue', {
                  rules: [{ required: true, message: '请输入基金累计单位净值！' }]
                })(
                  <InputNumber style={{ width: 200 }} placeholder="基金累计单位净值" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="净值日期" {...formLayout}>
                {getFieldDecorator('valueDate', {
                  rules: [{ required: true, message: '请输入净值日期！' }]
                })(
                  <DatePicker style={{ width: 200 }} placeholder="净值日期" />
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

class netvalue extends React.Component {
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
        title: '日期',
        dataIndex: 'valueDate',
        render: text => text
      },
      {
        title: '基金单位净值',
        dataIndex: 'assetNetValue'
      },
      {
        title: '基金累计单位净值',
        dataIndex: 'accumulationNetValue'
      },
      {
        title: '操作',
        align: 'center',
        width: '200px',
        dataIndex: 'handle',
        render: (text, record) => (
          <div>
            <Button onClick={this.update.bind(this, record)} >修改</Button>
            <Popconfirm title="确认删除该净值吗" onConfirm={this.delete.bind(this, record)}>
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
    this.props.changeNetvalueForm({
      fundId: {},
      valueDate: {},
      title: {},
      netvalueUrl: {}
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
    this.props.changeNetvalueForm(data)
  }
  delete(record) {
    this.props.deleteNetvalue(record)
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.props.getNetvalueList()
    this.props.getProductList()
    this.initForm()
  }
  search(fundId) {
    this.props.getNetvalueList({
      fundId
    })
    this.props.changeFundId(fundId)
  }
  render() {
    console.log(this.props.netvalue)
    let { columns, visible, formData } = this.state
    const { netvalueList, fundId } = this.props.netvalue
    const { productList } = this.props.product
    const { models } = this.props.loading
    let loading = models.netvalue
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
          <Select
            showSearch
            style={{ width: 200, marginLeft: '20px' }}
            placeholder="请选择产品"
            value={fundId}
            optionFilterProp="children"
            onChange={this.search.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              productList.map((i, index) => (
                <Option key={i.fundId} >{i.fundName}</Option>
              ))
            }
          </Select>
        </div>
        <Table
          dataSource={netvalueList}
          columns={columns}
          loading={loading}
          bordered
          rowKey="netvalueId"
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
        >
          <NetvalueForm cancel={this.hideModal.bind(this)} formData={formData} fundId={fundId} />
        </Modal>
      </div>
    )
  }
}


export default connect(mapStateProps, mapDispatchToProps)(netvalue)