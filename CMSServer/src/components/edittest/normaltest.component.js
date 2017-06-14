
import React, {Component, PropTypes} from "react";
import QuestionSelection from "./questionselection.component";

import * as Constant from '../../constants/app.constant'

export default class NormalTest extends Component {

  constructor(props) {
    super(props)

    // trigger in case of first load and move from 3 answers to 4 answers
    this.state = {
      isTrigger: false
    }
  }

  componentDidMount(){
    let self = this
    this.timeout = setTimeout(function(){
      self.componentDidUpdate()
    }, 100)
  }

  componentDidUpdate(){

    // TODOs duplicate code nha not good
    let currentQuestionIndex = this.props.currentQuestionIndex
    let currentQuestion = this.props.reducers.questions[currentQuestionIndex].questions[0]

    var math_question = document.getElementById("math_question")
    if (math_question) {
      math_question.innerHTML = currentQuestion.question
    } else if (math_question === null) {
      this.setState({isTrigger: true})
    }
    currentQuestion.choices.map(function(row, index) {
      let math_answer = document.getElementById("math_answer_"+index)
      if (math_answer) {
        math_answer.innerHTML = row.content
      } else if (math_answer === null) {
        self.setState({isTrigger: true})
      }
    })

    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_direction"])
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_question"])
    // work with all answers automatically. maybe use 1 id for all value need to transform
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_answer_"])
  }



  render() {
    let self = this
    let data = this.props.reducers
    let currentQuestionIndex = this.props.currentQuestionIndex

    let checkQuestionSize = 'choose_q'
    if (data.questions.length > 5) {
      checkQuestionSize = 'choose_q sum'
    }
    let currentQuestion = data.questions[currentQuestionIndex].questions[0]

    return (
      <div>
        <div className="desc_top">
          <span className="title">{data.objective_number} {data.test_name}</span>
          <span className="no-mathjax">{data.objective_text}</span>
        </div>

        <div className="form_test inner">
          <div className={checkQuestionSize}>
            <div className="info_top">
              <QuestionSelection currentQuestion={currentQuestionIndex}
                                 testSize={data.questions.length}
                                 selectAQuestionAction={this.props.selectAQuestionAction}/>
            </div>
          </div>

          <div className="main_test">
            <h1 id="math_direction">{currentQuestion.direction}</h1>
            <img onClick={this.props.editAText.bind(this, data, Constant.EDIT_DIRECTION, currentQuestionIndex, currentQuestion, null)} className="edit" alt="edit" src="images/edit_1.png"/>
            <div className="test_content">

              <div className="question_main">
                <p dangerouslySetInnerHTML={{__html: currentQuestion.foreword}}></p>

                <div id="math_question" className="common_title main_question"></div>
                <img onClick={this.props.editAText.bind(this, data, Constant.EDIT_QUESTION, currentQuestionIndex, currentQuestion, null)} className="edit" alt="edit" src="images/edit_1.png"/>
              </div>

              <div className="answer">
                {
                  currentQuestion.choices.map(function(row, index) {

                    let correctCSS = {}
                    if (row.index === currentQuestion.answer[0].index) {
                      correctCSS = {background: '#214099', color: '#fff', border: '1px solid #041C61'}
                    }

                    return (
                      <div className="ans_option ans_A">
                        <span  onClick={self.props.onChangeCorrectAnswer.bind(this, data, currentQuestionIndex, row)} className="circle" style={correctCSS}>{convertToAlphabet(row.index)}</span>
                        <p id={"math_answer_"+index}></p>
                        <img onClick={self.props.editAText.bind(this, data, Constant.EDIT_ANSWER, currentQuestionIndex, currentQuestion, row)} className="edit" alt="edit" src="images/edit_1.png"/>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

function convertToAlphabet(number) {
  switch (number) {
    case 0:
      return 'A'
      break
    case 1:
      return 'B'
      break
    case 2:
      return 'C'
      break
    case 3:
      return 'D'
      break
    case 4:
      return 'E'
      break
    case 5:
      return 'F'
      break
    default:
      return 'Z'
  }
}

