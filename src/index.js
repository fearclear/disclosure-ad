import '@babel/polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { message } from 'antd'
import createHistory from 'history/createBrowserHistory'
import './index.css'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError(e) {
    message.error('error', e.message)
  }
})

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/dcad').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
