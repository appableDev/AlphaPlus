
import {createStore, applyMiddleware} from 'redux'
import rootReducers from '../reducers/index'
import thunk from 'redux-thunk'

export default function configureStore(initState) {
  return createStore(
    rootReducers,
    initState,
    applyMiddleware(thunk)
  )
}
