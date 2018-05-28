import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Row, Col, Menu, } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const MenuItem = Menu.Item
const { logo, userIcon } = config

class Header extends React.Component {
  changeMenu(index) {
    this.props.changeMenuIndex(index)
  }
  render() {
    const { menuIndex } = this.props.dcad
    return (
      <div>
        <Row>
          <Col span={12}>
            <img className={styles.logo} src={logo} alt="蓝石资管" />
            <span className={styles.title}>产品信息录入平台</span>
          </Col>
          <Col className={styles.info} align="right" span={12}>
            <img src={userIcon} alt="" />
            <span className={styles["info-text"]}>欢迎您，系统管理员</span>
            <Link to='/product' className={styles["log-out"]}>退出登录</Link>
          </Col>
        </Row>
        <Row className={styles.menu}>
          <Col span={24}>
            <Menu
              onClick={this.changeMenu.bind(this)}
              mode="horizontal"
              selectedKeys={[`${menuIndex}`]}
              theme="dark"
            >
              <MenuItem key="product">
                <Link to="/product">产品录入</Link>
              </MenuItem>
              <MenuItem key="manager">
                <Link to="/manager">产品经理</Link>
              </MenuItem>
              <MenuItem key="notice">
                <Link to="/product">产品公告</Link>
              </MenuItem>
            </Menu>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    changeMenuIndex(payload) {
      dispatch({ type: 'dcad/changeMenuIndex', payload: payload.key })
    }
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Header)