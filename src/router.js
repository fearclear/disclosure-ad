import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes'
console.log(App)

const { ConnectedRouter } = routerRedux

const routes = [
  {
    path: '/',
    models: () => [import('./models/dcad')],
    component: () => import('./routes/'),
  }, {
    path: '/product',
    models: () => [import('./models/product')],
    component: () => import('./routes/product/'),
  }
]

function RouterConfig({ history, app }) {
  
  return (
    <ConnectedRouter history={history}>
      <Switch>
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Redirect to="/" />
      </Switch>
    </ConnectedRouter>
  )
}

RouterConfig.PropTypes = {
  app: PropTypes.object,
  history: PropTypes.object
}

export default RouterConfig
