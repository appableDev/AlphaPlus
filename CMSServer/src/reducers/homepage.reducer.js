
import * as types from '../constants/actiontypes.constant'
import initState from './initialState'

export default function cms_selection(state = initState.gradeList, action) {
    switch (action.type) {
        case types.LOAD_ALL_GRADES:
            return action.data
        default:
          return state;
    }
}
