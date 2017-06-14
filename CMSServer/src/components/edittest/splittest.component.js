
import React, { Component, PropTypes } from 'react';

import QuestionSelection from './questionselection.component'
import * as Constant from '../../constants/app.constant'

export default class SplitTest extends Component {

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

    // TODOs duplicate code, not good
    var data = this.props.reducers
    var counter = 0
    var listIndex = {}
    var renderAnswer = []

    for(var i = 0; i < data.questions.length; i++){
      for(var j = 0; j < data.questions[i].questions.length; j++){
        listIndex[counter] = [i, j]
        counter++
      }
    }

    var actualElement = listIndex[this.props.currentQuestionIndex][0]
    var actualCurrentQuestion = listIndex[this.props.currentQuestionIndex][1]

    var renderData = data.questions[actualElement]
    var actualRenderData = data.questions[actualElement].questions[actualCurrentQuestion]

    var math_paragraphs = document.getElementById("math_paragraphs")
    if (math_paragraphs) {
      math_paragraphs.innerHTML = renderData.text[0].paragraphs
    } else if (math_paragraphs === null) {
      this.setState({isTrigger: true});
    }

    var math_question = document.getElementById("math_question")
    if (math_question) {
      math_question.innerHTML = actualRenderData.question
    } else if (math_question === null) {
      this.setState({isTrigger: true});
    }

    for (var i = 0; i < actualRenderData.choices.length; i++) {
      var answer = {}
      answer.index = actualRenderData.choices[i].index
      answer.content = actualRenderData.choices[i].content
      answer.imageUrl = actualRenderData.choices[i].image_url || ''
      renderAnswer.push(answer)
    }

    renderAnswer.map(function(row, index){
      let math_answer = document.getElementById("math_answer_"+index)
      if (math_answer) {
        math_answer.innerHTML = row.content
      } else if (math_answer === null) {
        self.setState({isTrigger: true});
      }
    })

    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_direction"])
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_paragraphs"])
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_question"])
    // work with all answers automatically. maybe use 1 id for all value need to transform
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math_answer_"])
  }

  componentWillMount() {

  }

  render() {
    var self = this
    var data = this.props.reducers
    var counter = 0
    var listIndex = {}
    var renderAnswer = []

    for(var i = 0; i < data.questions.length; i++){
      for(var j = 0; j < data.questions[i].questions.length; j++){
        listIndex[counter] = [i, j]
        counter++
      }
    }

    var actualElement = listIndex[this.props.currentQuestionIndex][0]
    var actualCurrentQuestion = listIndex[this.props.currentQuestionIndex][1]

    var renderData = data.questions[actualElement]
    var actualRenderData = data.questions[actualElement].questions[actualCurrentQuestion]


    for (var i = 0; i < actualRenderData.choices.length; i++) {
      var answer = {}
      answer.index = actualRenderData.choices[i].index
      answer.content = actualRenderData.choices[i].content
      answer.imageUrl = actualRenderData.choices[i].image_url || ''
      renderAnswer.push(answer)
    }

    var checkQuestionSize = 'choose_q'
    if (counter > 5) {
      checkQuestionSize = 'choose_q sum'
    }

    return (
      <div>
        <div className="desc_top" >
          <span className="title">{data.objective_number} {data.test_name}</span>
          <span className="no-mathjax">{data.objective_text}</span>
        </div>

        <div className="sum_test inner">
          <div className={checkQuestionSize}>
            <div className="info_top">
              <QuestionSelection
                currentQuestion={this.props.currentQuestionIndex}
                testSize={counter}
                selectAQuestionAction={this.props.selectAQuestionAction}/>
            </div>
          </div>
          <div className="test_left">
            <div className="request">
              <h1 id="math_direction">{renderData.text[0].direction}</h1>
              <img onClick={this.props.editGroupText.bind(this, Constant.EDIT_DIRECTION, renderData, actualElement, actualCurrentQuestion, null)} className="edit" alt="edit" src="images/edit_1.png"/>
            </div>
            <div className="title_para"><h3>{renderData.text[0].title}</h3></div>
            <div className="content_para">
              <span id="math_paragraphs" className="text_para"></span>
              <img onClick={this.props.editGroupText.bind(this, Constant.EDIT_PARAGRAPH, renderData, actualElement, actualCurrentQuestion, null)} className="edit" alt="edit" src="images/edit_1.png"/>
            </div>
          </div>
          <div className="test_right answer" >
            <div className="top_qa">
              <div id="math_question" className="common_title main_question"></div>
              <img onClick={this.props.editGroupText.bind(this, Constant.EDIT_QUESTION, renderData, actualElement, actualCurrentQuestion, null)} className="edit" alt="edit" src="images/edit_1.png"/>
              <div className="text_ans">
                {
                  renderAnswer.map(function(row, index){

                    var correctCSS = {}
                    if (row.index === actualRenderData.answer[0].index) {
                      correctCSS = {background: '#214099', color: '#fff', border: '1px solid #041C61'}
                    }

                    return (<div key={row.index} className="ans_option">
                                          <span onClick={self.props.onChangeCorrectAnswer.bind(this, renderData, actualElement, actualCurrentQuestion, row)}
                                                className="circle"
                                                id={row.index}
                                                style={correctCSS}>{convertToAlphabet(row.index)}</span>
                      <p id={"math_answer_"+index}></p>
                      <img onClick={self.props.editGroupText.bind(this, Constant.EDIT_ANSWER, renderData, actualElement, actualCurrentQuestion, row)} className="edit" alt="edit" src="images/edit_1.png"/>
                    </div>)
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
  switch(number) {
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
