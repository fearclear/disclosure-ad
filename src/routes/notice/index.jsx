import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { config } from '../../utils'
import { getHeaders } from '../../utils/request'
import { Table, Button, Modal, Form, Input, message, Row, Col, Select, Popconfirm, DatePicker, Upload, Icon } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
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
    getNoticeList() {
      dispatch({ type: 'notice/getNoticeList' })
    },
    addNotice(data) {
      dispatch({ type: 'notice/addNotice', payload: data })
        .then(this.getNoticeList)
    },
    updateNotice(data) {
      dispatch({ type: 'notice/updateNotice', payload: data })
        .then(this.getNoticeList)
    },
    deleteNotice(record) {
      dispatch({ type: 'notice/deleteNotice', payload: record })
        .then(this.getNoticeList)
    },
    changeNoticeForm(payload) {
      dispatch({ type: 'notice/changeNoticeForm', payload })
    },
    changeFileList(payload) {
      dispatch({ type: 'notice/changeFileList', payload })
    },
    getProductList() {
      dispatch({ type: 'product/getProductList' })
    },
  }
}

const NoticeForm = connect(mapStateProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.changeNoticeForm(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let i in props.notice.noticeForm) {
      fields[i] = Form.createFormField({
        ...props.notice.noticeForm[i]
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
          values.noticeUrl = this.props.notice.fileList.length?this.props.notice.fileList[0].url:''
          values.valueDate = moment(values.valueDate).format('YYYY-MM-DD')
          if(!this.props.formData.noticeId) {
            this.props.addNotice(values)
            message.success('添加成功')
          } else {
            values.noticeId = this.props.formData.noticeId
            this.props.updateNotice(values)
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

    handleChange = (info) => {
      let fileList = info.fileList

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1)

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if(file.response) {
          // Component will show file.url as link
          file.url = `${config.imgUrl}/${file.response.picUrl}`
        }
        return file
      })

      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter((file) => {
        if(file.response) {
          return file.status === 'done'
        }
        return true
      })
      if(info.file.status === 'done') {
        message.success(`${info.file.name}文件上传成功！`)
      } else if(info.file.status === 'error') {
        message.error(`${info.file.name}文件上传失败！`)
      }
      this.props.changeFileList(fileList)
    }

    render() {
      const { getFieldDecorator } = this.props.form
      const { formLayout } = this.props.dcad
      const { productList } = this.props.product
      const { models } = this.props.loading
      const { fileList } = this.props.notice
      let loading = models.notice
      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="common-form" >
          <Row>
            <Col >
              <FormItem label="公告名称" {...formLayout} >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入公告名称！' }]
                })(
                  <Input style={{ width: 200 }} placeholder="公告名称" />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem label="所属产品" {...formLayout} >
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
              <FormItem label="发布时间" {...formLayout}>
                {getFieldDecorator('valueDate', {
                  rules: [{ required: true, message: '请输入发布时间！' }]
                })(
                  <DatePicker style={{ width: 200 }} placeholder="发布时间" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="附件" {...formLayout} >
                {getFieldDecorator('noticeUrl', {
                  rules: [{ required: true, message: '请选择文件！' }]
                })(
                  <Upload
                    action={`${config.url}/import`}
                    data={{ type: 'notice' }}
                    headers={headers}
                    fileList={fileList}
                    onChange={this.handleChange.bind(this)}
                  >
                    <Button>
                      <Icon type="upload" />点击上传
                    </Button>
                  </Upload>
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

class notice extends React.Component {
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
        title: '公告名称',
        dataIndex: 'title'
      },
      {
        title: '所属产品',
        dataIndex: 'fundName',
        render: text => text
      },
      {
        title: '发布时间',
        dataIndex: 'valueDate'
      },
      {
        title: '附件',
        dataIndex: 'noticeUrl',
        align: 'center',
        render: text => {
          if(text) {
            return (<a href={text} target="_blank" >附件</a>)
          } else {
            return '暂无附件'
          }
        }
      },
      {
        title: '操作',
        align: 'center',
        width: '200px',
        dataIndex: 'handle',
        render: (text, record) => (
          <div>
            <Button onClick={this.update.bind(this, record)} >修改</Button>
            <Popconfirm title="确认删除该公告吗" onConfirm={this.delete.bind(this, record)}>
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
    this.props.changeNoticeForm({
      fundId: {},
      valueDate: {},
      title: {},
      noticeUrl: {}
    })
  }
  add() {
    this.setState({
      visible: true,
      formData: {}
    })
    this.initForm()
    this.props.changeFileList([])
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
    this.props.changeNoticeForm(data)
    let fileList = []
    if(record.noticeUrl){
      fileList = [{
        uid: 0,
        name: '附件',
        status: 'done',
        url: record.noticeUrl
      }]
    }
    this.props.changeFileList(fileList)
  }
  delete(record) {
    this.props.deleteNotice(record)
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.props.getNoticeList()
    this.initForm()
  }
  render() {
    let { columns, visible, formData } = this.state
    const { noticeList } = this.props.notice
    const { models } = this.props.loading
    let loading = models.notice
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
        </div>
        <Table
          dataSource={noticeList}
          columns={columns}
          loading={loading}
          bordered
          rowKey="noticeId"
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
        >
          <NoticeForm cancel={this.hideModal.bind(this)} formData={formData} />
        </Modal>

      </div>
    )
  }
}


export default connect(mapStateProps, mapDispatchToProps)(notice)