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
    getShareList() {
      dispatch({ type: 'share/getShareList' })
    },
    addShare(data) {
      dispatch({ type: 'share/addShare', payload: data })
        .then(this.getShareList)
    },
    updateShare(data) {
      dispatch({ type: 'share/updateShare', payload: data })
        .then(this.getShareList)
    },
    deleteShare(record) {
      dispatch({ type: 'share/deleteShare', payload: record })
        .then(this.getShareList)
    },
    changeShareForm(payload) {
      dispatch({ type: 'share/changeShareForm', payload })
    },
    getProductList() {
      dispatch({ type: 'product/getProductList' })
    },
  }
}

const ShareForm = connect(mapStateProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.changeShareForm(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let i in props.share.shareForm) {
      fields[i] = Form.createFormField({
        ...props.share.shareForm[i]
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
          if(!this.props.formData.shareId) {
            this.props.addShare(values)
            message.success('添加成功')
          } else {
            values.shareId = this.props.formData.shareId
            this.props.updateShare(values)
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
      const { productList } = this.props.product
      const { models } = this.props.loading
      let loading = models.share
      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="common-form" >
          <Row>
            <Col>
              <FormItem label="产品名称" {...formLayout} >
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
                      productList.map((i, index) => (
                        <Option key={i.fundId} >{i.fundName}</Option>
                      ))
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="分红额" {...formLayout} >
                {getFieldDecorator('shareValue', {
                  rules: [{ required: true, message: '请输入分红额！' }]
                })(
                  <InputNumber style={{ width: 200 }} placeholder="分红额" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="分红时间" {...formLayout}>
                {getFieldDecorator('valueDate', {
                  rules: [{ required: true, message: '请输入分红时间！' }]
                })(
                  <DatePicker style={{ width: 200 }} placeholder="分红时间" />
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

class share extends React.Component {
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
        title: '分红日期',
        dataIndex: 'valueDate',
        render: text => text
      },
      {
        title: '分红额',
        dataIndex: 'shareValue'
      },
      {
        title: '操作',
        align: 'center',
        width: '200px',
        dataIndex: 'handle',
        render: (text, record) => (
          <div>
            <Button onClick={this.update.bind(this, record)} >修改</Button>
            <Popconfirm title="确认删除该分红吗" onConfirm={this.delete.bind(this, record)}>
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
    this.props.changeShareForm({
      fundId: {},
      valueDate: {},
      title: {},
      shareUrl: {}
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
    this.props.changeShareForm(data)
  }
  delete(record) {
    this.props.deleteShare(record)
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.props.getShareList()
    this.initForm()
  }
  render() {
    let { columns, visible, formData } = this.state
    const { shareList } = this.props.share
    const { models } = this.props.loading
    let loading = models.share
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
        </div>
        <Table
          dataSource={shareList}
          columns={columns}
          loading={loading}
          bordered
          rowKey="shareId"
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
        >
          <ShareForm cancel={this.hideModal.bind(this)} formData={formData} />
        </Modal>

      </div>
    )
  }
}


export default connect(mapStateProps, mapDispatchToProps)(share)