import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import FullApp from './FullApp'
import Home from './Public/Home'


const routes = (
  <Route>
    <Route component={ FullApp }>
      <Route path="/" component={ Home } />
    </Route>
  </Route>
)

const Root = () => (
  <Router history={ browserHistory } routes={ routes } />
)


export default Root
