import React from 'react'
import { connect } from 'dva'

class Product extends React.Component{
  render() {
    return (
      <div>product</div>
    )
  }
}

export default connect()(Product)