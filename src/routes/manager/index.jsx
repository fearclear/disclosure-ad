import React from 'react'
import { connect } from 'dva'
import { Table, Button, Popconfirm } from 'antd'
import styles from './index.less'

class Manager extends React.Component {
  constructor() {
    super()
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        render: (text, record, index) => index+1
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
        dataIndex: 'managerPhoto'
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
      columns
    }
  }

  componentDidMount() {
    this.props.getManagerList()
  }
  
  delete(record) {

  }

  render() {
    let { columns } = this.state
    const { managerList } = this.props.manager
    const { models } = this.props.loading
    let loading = models.manager
    return (
      <div>
        <div className={styles.search}>
          <Button className={styles.btn} type="primary">新增</Button>
        </div>
        <Table
          dataSource={managerList}
          columns={columns}
          bordered
          rowKey="managerId"
          loading={loading}
        />

      </div>
    )
  }
}

const mapStateProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManagerList() {
      dispatch({type: 'manager/getManagerList'})
    }
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Manager)