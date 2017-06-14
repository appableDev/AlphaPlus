
import React, { Component } from 'react';

export default class QuestionSelection extends Component {
  constructor(props){
    super(props)

  }
  selectAQuestion(index) {
    this.props.selectAQuestionAction(index)
  }
  render(){
    var self = this
    var testSize = []
    for (var i = 1; i <= this.props.testSize; i++) {
      let css = ""
      if (this.props.currentQuestion === i-1) {
        css = "active"
      }
      testSize.push(<div><li><a key={i-1} className={css} onClick={self.selectAQuestion.bind(self, i-1)}>{i}</a></li></div>)
    }
    return (<ul>{testSize}</ul>)
  }
}
