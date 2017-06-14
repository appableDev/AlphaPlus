import {createStore, applyMiddleware} from 'redux'
import rootReducers from '../reducers/index'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

export default function configureStore(initState) {
  return createStore(
    rootReducers,
    initState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  )
}
