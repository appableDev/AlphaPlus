
import superagent from 'superagent'
import * as types from "../constants/actiontypes.constant";
import * as Constant from '../constants/app.constant'
import errorCode from '../errorCode'
import API from '../webservice'

export function changeLoadedStatusAction(status) {
  return {
    type: types.CMS_VIEWEDIT_LOADED,
    status: status
  }
}

export function saveDataAction(data, newText) {
  return dispatch => {
    let clone = {
      old_question: data.data.questions[data.qIndex],
      question_index: data.qIndex,
      answer_index: data.qAnswer ? data.qAnswer:null,
      new_text: newText,
      edit_type: data.editType,
      is_single: 1
    }
    superagent.post(API.saveQuestionUrl())
      .send(clone)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (res.body.code === errorCode.SUCCESS) {
          if (data.editType === Constant.EDIT_ANSWER) {
            // edit answer content
            dispatch({
              type: types.SAVE_NEW_DATA,
              data: {
                qIndex: data.qIndex,
                editType: data.editType,
                aIndex: data.qAnswer,
                newText: newText
              }
            })
          } else {
            // edit direction, question content
            dispatch({
              type: types.SAVE_NEW_DATA,
              data: {
                qIndex: data.qIndex,
                editType: data.editType,
                newText: newText
              }
            })
          }
        } else {

        }
     })
  }
}

export function saveCorrectAnswerAction(data, qIndex, answer) {
  return dispatch => {

    var clone = {
      old_question: data.questions[qIndex],
      question_index: qIndex,
      answer_index: answer,
      is_single: 1
    }

    superagent.post(API.saveCorrectAnswerUrl())
      .send(clone)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (res.body.code === errorCode.SUCCESS) {
          dispatch({
            type: types.SAVE_CORRECT_ANSWER,
            data: {
              qIndex: qIndex,
              answer: answer
            }
          })
        } else {

        }
      })
  }
}

export function saveGroupDataAction(data, newText) {
  return dispatch => {
    let clone = {
      old_question: data.data,
      question_index: data.actualCurrentQuestion,
      answer_index: data.qAnswer ? data.qAnswer:null,
      new_text: newText,
      edit_type: data.editType,
      is_single: 0
    }

    superagent.post(API.saveQuestionUrl())
      .send(clone)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (res.body.code === errorCode.SUCCESS) {
          if (data.editType === Constant.EDIT_ANSWER) {
            // edit answer content
            dispatch({
              type: types.SAVE_GROUP_NEW_DATA,
              data: {
                actualElement: data.actualElement,
                actualCurrentQuestion: data.actualCurrentQuestion,
                editType: data.editType,
                qAnswer: data.qAnswer,
                newText: newText
              }
            })
          } else {
            // edit direction, question content
            dispatch({
              type: types.SAVE_GROUP_NEW_DATA,
              data: {
                actualElement: data.actualElement,
                actualCurrentQuestion: data.actualCurrentQuestion,
                editType: data.editType,
                newText: newText
              }
            })
          }
        } else {

        }

      })
  }
}

export function saveGroupCorrectAnswerAction(renderData, actualElement, actualCurrentQuestion, answer) {
  return dispatch => {
    var clone = {
      old_question: renderData,
      question_index: actualCurrentQuestion,
      answer_index: answer,
      is_single: 0
    }

    superagent.post(API.saveCorrectAnswerUrl())
      .send(clone)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (res.body.code === errorCode.SUCCESS) {
          dispatch({
            type: types.SAVE_GROUP_CORRECT_ANSWER,
            data: {
              actualElement: actualElement,
              actualCurrentQuestion: actualCurrentQuestion,
              answer: answer
            }
          })
        } else {

        }
      })
  }
}

export function selectTestAction(data, history){
  return dispatch => {

    superagent.get(API.getATestUrl())
      .query({test_id: data.test_id})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.body.code === errorCode.SUCCESS) {
          dispatch({
            type: types.LOAD_A_TEST,
            data: res.body.message
          })
          history.push({
            pathname: "testpage",
            search: "?test_id=" + data.test_id,
            state: res.body.message
          })
        }
      })
  }
}
