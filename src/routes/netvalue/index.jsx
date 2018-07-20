import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { config } from '../../utils'
import { getHeaders } from '../../utils/request'
import { Table, Button, Modal, Form, message, Row, Col, Icon, Select, Upload, Popconfirm, DatePicker, InputNumber } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
const Dragger = Upload.Dragger
const headers = {}
const tempHeaders = getHeaders()
tempHeaders.delete('Content-Type')
for(var pair of tempHeaders.entries()) {
  headers[pair[0]] = pair[1]
}

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
          if(!this.props.netvalue.fundId) {
            message.error('请选择产品')
            return
          }
          values.fundId = this.props.netvalue.fundId
          if(!this.props.formData.netvalueId) {
            this.props.addNetvalue(values)
          } else {
            values.netvalueId = this.props.formData.netvalueId
            this.props.updateNetvalue(values)
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
      importStatus: false,
      formData: {},
      fileList: []
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
  cancelImport() {
    this.setState({
      importStatus: false
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
  import() {
    this.setState({
      importStatus: true
    })
  }
  beforeUpload(file) {
    if(!this.props.netvalue.fundId) {
      message.error('请选择产品后再导入产品信息')
      return false
    }
  }
  handleChange(info) {
    let fileList = info.fileList

    fileList = fileList.slice(-1)

    if(info.file.status === 'done') {
      message.success(`${info.file.name}文件上传成功！`)
      fileList = []
      this.setState({
        importStatus: false
      })
      this.props.getNetvalueList({
        fundId: this.props.netvalue.fundId
      })
    } else if(info.file.status === 'error') {
      message.error(`${info.file.name}文件上传失败！`)
    }
    this.setState({
      fileList
    })
  }
  render() {
    let { columns, visible, formData, importStatus, fileList } = this.state
    const { netvalueList, fundId } = this.props.netvalue
    const { productList } = this.props.product
    const { models } = this.props.loading
    let loading = models.netvalue
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
          <Button className={styles['btn-next']} onClick={this.import.bind(this)} type="primary">导入</Button>
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
              productList?productList.map((i, index) => (
                <Option key={i.fundId} >{i.fundName}</Option>
              )):''
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
        <Modal
          visible={importStatus}
          onCancel={this.cancelImport.bind(this)}
          footer={null}
        >
          <div style={{marginTop: '20px'}} >
            <Dragger
              name='file'
              multiple={false}
              headers={headers}
              fileList={fileList}
              data={{fundId: fundId}}
              action={config.api.netvalue.import}
              beforeUpload={this.beforeUpload.bind(this)}
              onChange={this.handleChange.bind(this)}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或将文件拖入到此区域上传</p>
              <p className="ant-upload-hint">支持xls/xlsx文件</p>
            </Dragger>
          </div>
        </Modal>
      </div >
    )
  }
}


export default connect(mapStateProps, mapDispatchToProps)(netvalue)