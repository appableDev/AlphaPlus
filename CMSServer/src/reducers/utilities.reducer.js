import * as types from '../constants/AppConstants';
import merge from 'lodash/object/merge'

const initState = {
  button_checked: 0
}

const resetState = merge({}, initState)

export default function disableButton(state = initState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATE:
      return merge({}, resetState)

    case types.DISABLE_BUTTON_STATUS_CHANGED:

      if(action.reload == 0){
        state.button_checked = action.status
        return state
      }else{
        state.button_checked = action.status
        return merge({}, state)
      }

    default:
      return state
  }

}
