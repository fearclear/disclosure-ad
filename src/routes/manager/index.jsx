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
    deleteManager(payload) {
      dispatch({ type: 'manager/deleteManager', payload })
        .then(this.getManagerList)
    }
  }
}


const MessageForm = connect(mapStateProps, mapDispatchToProps)(Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        imageUrl: null
      }
    }
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.props.form.validateFields((err, values) => {
        if(!err) {
          values.managerPhoto = values.info.file.response.picUrl
          this.props.addManager(values)
          self.props.form.resetFields()
          self.cancel()
          message.success('添加成功')
        }
      })
    }
    cancel() {
      this.props.cancel()
    }

    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    handleChange = (info) => {
      if(info.file.status === 'uploading') {
        this.setState({ loading: true })
        return
      }
      if(info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }))
      }
    }

    render() {
      const { imageUrl } = this.state
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
                {getFieldDecorator('info', {
                  rules: [{ required: true, message: '请选择头像！' }]
                })(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action={`${config.url}/import`}
                    data={{ type: 'photo' }}
                    headers={headers}
                    // beforeUpload={beforeUpload}
                    onChange={this.handleChange.bind(this)}
                  >
                    {imageUrl ? <img style={{ width: '128px' }} src={imageUrl} alt="avatar" /> : uploadButton}
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
      visible: false
    }
  }

  componentDidMount() {
    this.props.getManagerList()
  }

  add() {
    this.setState({
      visible: true
    })
  }

  hideModal() {
    this.setState({
      visible: false
    })
  }

 delete(record) {
    this.props.deleteManager(record)
  }

  render() {
    let { columns, visible } = this.state
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
          <MessageForm cancel={this.hideModal.bind(this)} />
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Manager)