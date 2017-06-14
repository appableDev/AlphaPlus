import * as types from '../constants/actiontypes.constant'

export default function login(state = {}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
          return action.data

        default:
            return state;
    }
}
