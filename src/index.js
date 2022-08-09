// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

// ** Lazy load app
import App from './App'

ReactDOM.render(
 
          <App />
        ,
  document.getElementById('root')
)
serviceWorker.unregister()
