import React from 'react'
import { connect } from 'dva'
import { Table, Button, Popconfirm, Row, Col, Form, Input, message, Modal, Upload, Icon, Avatar } from 'antd'
import { config } from '../../utils'
import { getHeaders } from '../../utils/request'
import styles from './index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
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
    getManagerList() {
      dispatch({ type: 'manager/getManagerList' })
    },
    addManager(payload) {
      dispatch({ type: 'manager/addManager', payload })
        .then(this.getManagerList)
    },
    updateManager(payload) {
      dispatch({ type: 'manager/updateManager', payload })
        .then(this.getManagerList)
    },
    changeManagerForm(payload) {
      dispatch({ type: 'manager/changeManagerForm', payload })
    },
    deleteManager(payload) {
      dispatch({ type: 'manager/deleteManager', payload })
        .then(this.getManagerList)
    },
    updateImageUrl(payload) {
      dispatch({ type: 'manager/updateImageUrl', payload })
    }
  }
}


const MessageForm = connect(mapStateProps, mapDispatchToProps)(Form.create({
  onFieldsChange(props, changedFields) {
    props.changeManagerForm(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let i in props.manager.managerForm) {
      fields[i] = Form.createFormField({
        ...props.manager.managerForm[i]
      })
    }
    return fields
  }
})(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false
      }
    }
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.props.form.validateFields((err, values) => {
        if(!err) {
          // values.managerPhoto = values.info.file.response.picUrl
          values.managerPhoto = this.props.manager.imageUrl
          if(!this.props.formData.managerId) {
            this.props.addManager(values)
            message.success('添加成功')
          } else {
            values.managerId = this.props.formData.managerId
            this.props.updateManager(values)
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
      if(info.file.status === 'uploading') {
        this.setState({ loading: true })
        return
      }
      if(info.file.status === 'done') {
        // Get this url from response in real world.
        this.setState({
          loading: false,
        })
        this.props.updateImageUrl(info.file.response.picUrl)
      }
    }

    render() {
      const { imageUrl } = this.props.manager
      const { getFieldDecorator } = this.props.form
      const { formLayout } = this.props.dcad
      const { models } = this.props.loading
      let loading = models.manager

      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      )


      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="common-form" >
          <Row>
            <Col >
              <FormItem label="头像" {...formLayout} >
                {getFieldDecorator('info', {})(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action={`${config.url}/import`}
                    data={{ type: 'photo' }}
                    headers={headers}
                    onChange={this.handleChange.bind(this)}
                  >
                    {imageUrl ? <img style={{ width: '128px' }} src={`${config.imgUrl}/${imageUrl}`} alt="avatar" /> : uploadButton}
                  </Upload>
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="姓名" {...formLayout} >
                {getFieldDecorator('managerName', {
                  rules: [{ required: true, message: '请输入姓名！' }]
                })(
                  <Input placeholder="姓名" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="职位" {...formLayout} >
                {getFieldDecorator('managerPosition', {
                  rules: [{ required: true, message: '请输入职位！' }]
                })(
                  <Input placeholder="职位" />
                )}
              </FormItem>
            </Col>
            <Col >
              <FormItem label="介绍" {...formLayout} >
                {getFieldDecorator('managerInroduction', {
                  rules: [{ required: true, message: '请输入介绍！' }]
                })(
                  <TextArea placeholder="介绍" rows={4} style={{ resize: 'none' }} />
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
class Manager extends React.Component {
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
        title: '姓名',
        dataIndex: 'managerName'
      },
      {
        title: '职位',
        dataIndex: 'managerPosition'
      },
      {
        title: '介绍',
        dataIndex: 'managerInroduction'
      },
      {
        title: '头像',
        dataIndex: 'managerPhoto',
        align: 'center',
        render: text => <Avatar src={`${config.imgUrl}/${text}`} alt='' />
      },
      {
        title: '操作',
        dataIndex: 'handle',
        align: 'center',
        width: '200px',
        render: (text, record) => (
          <div>
            <Button onClick={this.update.bind(this, record)} >修改</Button>
            <Popconfirm title="确认删除该成员吗" onConfirm={this.delete.bind(this, record)}>
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

  componentDidMount() {
    this.props.getManagerList()
    this.initForm() 
  }

  add() {
    this.setState({
      visible: true,
      formData: {}
    })
    this.initForm()
    this.props.updateImageUrl(null)
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
    this.props.changeManagerForm(data)
    let imageUrl = record.managerPhoto?record.managerPhoto:null
    this.props.updateImageUrl(imageUrl)
  }

  hideModal() {
    this.setState({
      visible: false
    })
  }

 delete(record) {
    this.props.deleteManager(record)
  }

  initForm() {
    this.props.changeManagerForm({
      info: {},
      managerName: {},
      managerPosition: {},
      managerInroduction: {}
    })
  }

  render() {
    let { columns, visible, formData } = this.state
    const { managerList } = this.props.manager
    const { models } = this.props.loading
    let loading = models.manager
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} onClick={this.add.bind(this)} type="primary">新增</Button>
        </div>
        <Table
          dataSource={managerList}
          columns={columns}
          bordered
          rowKey="managerId"
          loading={loading}
        />
        <Modal
          title=""
          visible={visible}
          onCancel={this.hideModal.bind(this)}
          footer={null}
          width="650px"
        >
          <MessageForm cancel={this.hideModal.bind(this)} formData={formData} />
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Manager)