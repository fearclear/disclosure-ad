import React from 'react'
import { connect } from 'dva'

class Header extends React.Component{
  render() {
    return (
      <div>header</div>
    )
  }
}

export default connect()(Header)