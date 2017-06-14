/**
 * Created by zenymax on 2/13/17.
 */
/*eslint-disable no-unused-vars*/
import React from 'react'
import {Route, IndexRoute} from 'react-router'
/*eslint-enable no-unused-vars*/
import App from './app'
import LoginPage from './containers/login.container'
import HomePage from './containers/homepage.container'
import TestPage from './containers/edittest.container'


export default (
  <Route path='/' component={App}>
    <IndexRoute component={LoginPage}></IndexRoute>
    <Route path='grades' component={HomePage}></Route>
    <Route path='testpage' component={TestPage}></Route>
  </Route>
)
