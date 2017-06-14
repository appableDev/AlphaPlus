
import superagent from 'superagent'
import cookie from 'react-cookie'

import * as types from '../constants/actiontypes.constant'
import errorCode from '../errorCode'
import API from '../webservice'

export function loadPageAction(history) {
  return dispatch => {
    superagent.get(API.getGradeListUrl())
      .query()
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.body.code === errorCode.SUCCESS) {
            dispatch({
              type: types.LOAD_ALL_GRADES,
              data: res.body.message
            })
        }
    })


  }
}
