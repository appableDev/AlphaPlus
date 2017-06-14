
import superagent from 'superagent'
import cookie from 'react-cookie'

import * as types from '../constants/actiontypes.constant'
import errorCode from '../errorCode'
import API from '../webservice'

export function loginAction(data, history, cb) {

  return dispatch => {
    superagent.post(API.loginUrl())
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res) {

        if(!res){
          cb('No Internet Connection')
        }
        console.log("[Action] [Login] CMS admin login response: ", res.body)
        if (res.body.code === errorCode.LOGIN_SUCCESS) {

          // write cookie
          cookie.save('token', res.body.message.token)

          dispatch({
            type: types.LOGIN_SUCCESS,
            data: res.body.message
          })

          history.replace({
            pathname: '/grades',
            state: res.body.message
          })
        } else {
          cb('Invalid email or password.')
        }
    })
  }
}

export function logoutAction() {
  cookie.remove('token')
  window.location.href = "/"
}

