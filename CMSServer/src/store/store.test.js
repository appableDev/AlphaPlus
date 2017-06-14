
import React from 'react'
import {createStore} from 'redux'
import expect from 'expect'

import rootReducers from '../reducers/index'
import initialState from '../reducers/initialState'
import {createCourseSuccess} from '../actions/course.action'

describe('Store Test', ()=>{
  it('Should handle creating courses', ()=>{
    const store = createStore(rootReducers, initialState)
    const courses = {title: 'Clean code'}

    const action = createCourseSuccess(courses)
    store.dispatch(action)

    const actual = store.getState().course[0]

    console.log('actual ', actual);

    const expected = {
      title: 'Clean code'
    }

    expect(actual).toEqual(expected)
  })
})
