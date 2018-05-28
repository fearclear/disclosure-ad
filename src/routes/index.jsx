import React from 'react'
import { connect } from 'dva'
// import PropTypes from 'prop-types'
import { withRouter } from 'dva/router'
import { Helmet } from 'react-helmet'
import NProgress from 'nprogress'
import Header from '../components/header'
import './index.less'

import { config } from '../utils'
import { changeToken } from '../utils/request'
import { sign } from '../services'
const { version } = require('../../package.json')

let lastHref
let lastVersion

class App extends React.Component {
  constructor(props) {
    super(props)
    sign.login()
      .then(data => {
        changeToken(data.tokenId)
      })
  }
  componentDidMount() {
    const { loading, location } = this.props
    this.props.changeMenuIndex(location.pathname.slice(1, location.pathname.length))

    // 版本控制
    lastVersion = window.localStorage.getItem(config.key.version)
    if(lastVersion !== version) {
      window.localStorage.setItem(config.key.version, version)
    }

    // 进度条控制
    const { href } = window.location
    if(lastHref !== href) {
      NProgress.start()
      if(!loading.global) {
        NProgress.done()
        lastHref = href
      }
    }
  }
  render() {
    const { children } = this.props
    const { fav } = config
    return (
      <div>
        <Helmet>
          <title>蓝石资管信息披露管理系统</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href={fav} type="image/x-icon" />
        </Helmet>
        <Header />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // children: PropTypes.element.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    changeMenuIndex(payload) {
      dispatch({ type: 'dcad/changeMenuIndex', payload })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDisPatchToProps)(App))