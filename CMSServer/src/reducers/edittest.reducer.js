
import * as types from '../constants/actiontypes.constant'
import * as Constant from '../constants/app.constant'
import initState from './initialState'

export default function edittest(state = initState.aTest, action) {
  switch (action.type) {

    case types.LOAD_A_TEST:
      return action.data

    case types.SAVE_NEW_DATA:
      if (action.data.editType == Constant.EDIT_DIRECTION) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.qIndex) {
            let updateQuestion = question.questions[0]
            return Object.assign({}, question, {questions: [Object.assign({}, updateQuestion, {direction: action.data.newText})]})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})

      } else if (action.data.editType == Constant.EDIT_QUESTION) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.qIndex) {
            let updateQuestion = question.questions[0]
            return Object.assign({}, question, {questions: [Object.assign({}, updateQuestion, {question: action.data.newText})]})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})

      } else if (action.data.editType == Constant.EDIT_ANSWER) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.qIndex) {
            let updateQuestion = question.questions[0]
            let answers = updateQuestion.choices.map((answer, index)=>{
              if (index === action.data.aIndex.index) {
                return Object.assign({}, answer, {content: action.data.newText})
              }
              return answer
            });

            return Object.assign({}, question, {questions: [Object.assign({}, updateQuestion, {choices: answers})]})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})

      }

    case types.SAVE_CORRECT_ANSWER:
      let questions = state.questions.map((question, index) => {
        if (index === action.data.qIndex) {
          let updateQuestion = question.questions[0]
          let correctAnswer = question.questions[0].answer[0]

          return Object.assign({}, question, {questions: [Object.assign({}, updateQuestion, {answer: [Object.assign({}, correctAnswer, {index: action.data.answer.index})]})]})
        }
        return question
      })
      return Object.assign({}, state, {questions: questions})


    case types.SAVE_GROUP_NEW_DATA:
      if (action.data.editType == Constant.EDIT_DIRECTION) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.actualElement) {
            let oldDirection = question.text[0]
            return Object.assign({}, question, {text: [Object.assign({}, oldDirection, {direction: action.data.newText})]})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})

      } else if (action.data.editType == Constant.EDIT_PARAGRAPH) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.actualElement) {
            let oldDirection = question.text[0]
            return Object.assign({}, question, {text: [Object.assign({}, oldDirection, {paragraphs: action.data.newText})]})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})

      } else if (action.data.editType == Constant.EDIT_QUESTION) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.actualElement) {
            let tmpUpdate = question.questions.map((iQuestion, iIndex)=>{
              if (iIndex == action.data.actualCurrentQuestion) {
                return Object.assign({}, iQuestion, {question: action.data.newText})
              }
              return iQuestion
            })
            return Object.assign({}, question, {questions: tmpUpdate})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})

      } else if (action.data.editType == Constant.EDIT_ANSWER) {
        let questions = state.questions.map((question, index) => {
          if (index === action.data.actualElement) {
            let tmpUpdate = question.questions.map((iQuestion, iIndex)=>{
              if (iIndex == action.data.actualCurrentQuestion) {
                let tmpQuestion = iQuestion.choices.map((answer, index)=>{
                  if (index == action.data.qAnswer.index) {
                    return Object.assign({}, answer, {content: action.data.newText})
                  }
                  return answer
                })
                return Object.assign({}, iQuestion, {choices:tmpQuestion})
              }
              return iQuestion
            })
            return Object.assign({}, question, {questions: tmpUpdate})
          }
          return question
        })
        return Object.assign({}, state, {questions: questions})
      }

    case types.SAVE_GROUP_CORRECT_ANSWER:
      let questions2 = state.questions.map((question, index) => {
        if (index === action.data.actualElement) {
          let tmpUpdate = question.questions.map((iQuestion, iIndex)=>{
            if (iIndex == action.data.actualCurrentQuestion) {
              let correctAnswer = iQuestion.answer[0]
              return Object.assign({}, iQuestion, {answer: [Object.assign({}, correctAnswer, {index: action.data.answer.index})]})
            }
            return iQuestion
          })
          return Object.assign({}, question, {questions: tmpUpdate})
        }
        return question
      })
      return Object.assign({}, state, {questions: questions2})

    default:
      return state;
  }
}
