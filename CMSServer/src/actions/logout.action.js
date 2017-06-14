import superagent from 'superagent'
import cookie from 'react-cookie'

import * as types from '../constants/AppConstants'
import errorCode from '../errorCode'
import API from '../webservice'
import Utils from '../utils/utils'

function renderSpinnerWaitingAction(type) {
	return(
		{
			type: types.RENDER_SPINNER_MANAGEMENT,
			data: {
				type: type
			}
		}
	)
}

export function saveAndResetState(history, dataElastic) {
  return dispatch => {

    // Data elastic
    if(dataElastic !== null){
      // debug("Log out data elastic: ", dataElastic)
      var linkElastic = global.elastic + "/student/saveandexit"
      Utils.getDataElastic(linkElastic, dataElastic, "Response student save and exit", "Elastic student save and exit")

    }
    dispatch(renderSpinnerWaitingAction(null))
    cookie.remove('token')

    // workaround
    setTimeout(function(){
      window.location.href = "/"
    },2000)
  }
}
