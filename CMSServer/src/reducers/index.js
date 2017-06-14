import { combineReducers } from 'redux';

import login from './login.reducer';
import cmsSelection from './homepage.reducer';
import edittest from './edittest.reducer';

const rootReducer = combineReducers({
  login,
  cmsSelection,
  edittest
})

export default rootReducer
