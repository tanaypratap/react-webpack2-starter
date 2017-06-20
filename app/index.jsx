import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Root from './components/Root'
import datastore from './reducers/datastore'


const store = createStore(datastore,
  applyMiddleware(
    ReduxThunk,
  ))

render(
  <Provider store={ store }>
    <Root />
  </Provider>,
   document.getElementById('app'),

)
