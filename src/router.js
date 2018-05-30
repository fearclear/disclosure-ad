import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, routerRedux } from 'dva/router'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'
import App from './routes'

const { ConnectedRouter } = routerRedux

const routes = [
  {
    path: '/product',
    models: () => [import('./models/product'), import('./models/manager')],
    component: () => import('./routes/product/'),
  },
  {
    path: '/manager',
    models: () => [import('./models/manager')],
    component: () => import('./routes/manager')
  }
]

function RouterConfig({ history, app }) {

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
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
            <Redirect to="/product" />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

RouterConfig.PropTypes = {
  app: PropTypes.object,
  history: PropTypes.object
}

export default RouterConfig
