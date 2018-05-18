import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Link } from 'dva/router' 
import Header from '../components/header'

class App extends React.Component{
  render() {
    return (
      <div>
        <Header />
        <Link to='/product'>product</Link>
      </div>
    )
  }
}

App.PropTypes = {
  children: PropTypes.element.isRequired
}

export default connect()(App)