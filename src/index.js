import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './redux/reducers'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
)

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root'),
)
