import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions/edittest.action.js";
import NormalTest from "../components/edittest/normaltest.component";
import SplitTest from "../components/edittest/splittest.component";
import EditTestPopup from "../components/popup/popup2.edit.component";
import ConfirmationPopup from '../components/popup/confirmation.component'
import cookie from 'react-cookie';

const _RIGHT_ARROW = 39
const _LEFT_ARROW = 37

const CONFIRM="confirm";
const TEXT_DISPLAY="Are you sure you want to change Correct Answer Key to ";
const LEFT_BUTTON="OK";
const RIGHT_BUTTON="Cancel";


class EditTest extends Component {
  constructor(props) {
    super(props)

    this.selectAQuestionAction = this.selectAQuestionAction.bind(this)
    this.editAText = this.editAText.bind(this)
    this.editGroupText = this.editGroupText.bind(this)
    this.onCancelPopup = this.onCancelPopup.bind(this)
    this.onSavePopup = this.onSavePopup.bind(this)
    this.onSaveGroupTextPopup = this.onSaveGroupTextPopup.bind(this)
    this.onChangeCorrectAnswer = this.onChangeCorrectAnswer.bind(this)
    this.onChangeGroupCorrectAnswer = this.onChangeGroupCorrectAnswer.bind(this)
    this.backToGradeList = this.backToGradeList.bind(this);
    this.onSavePopupAnswer=this.onSavePopupAnswer.bind(this);
    this.onSavePopupGroupAnswer=this.onSavePopupGroupAnswer.bind(this);

    this.state = {
      currentQuestionIndex: 0,
      popupContent: ''
    }
    this.testSize = 0

    window.addEventListener("keydown", this.eventKeyDown, false)
  }

  componentDidMount() {
    if (cookie.load('token') != undefined) {
      this.props.actions.selectTestAction(this.props.location.query, this.props.history);
    }

    var self = this;
    this.eventKeyDown = function (e) {
      switch (e.keyCode) {
        case _RIGHT_ARROW:
          e.preventDefault()
          if (self.state.currentQuestionIndex + 1 < self.testSize) {
            self.selectAQuestionAction(self.state.currentQuestionIndex + 1)
          }
          break
        case _LEFT_ARROW:
          e.preventDefault()
          if (self.state.currentQuestionIndex > 0) {
            self.selectAQuestionAction(self.state.currentQuestionIndex - 1)
          }
          break
        default:
          break
      }
    }
    window.addEventListener("keydown", this.eventKeyDown, false)
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    if (this.state.popupContent !== '') {
      window.removeEventListener("keydown", this.eventKeyDown, false)
    } else {
      window.addEventListener("keydown", this.eventKeyDown, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.eventKeyDown, false)
  }

  selectAQuestionAction(index) {
    this.setState({currentQuestionIndex: index})
  }

  editAText(data, editType, qIndex, qData, qAnswer) {
    this.setState({
      popupContent: <EditTestPopup
        viewType={0}
        editType={editType}
        qIndex={qIndex}
        qData={qData}
        qAnswer={qAnswer}
        data={data}
        onCancelPopup={this.onCancelPopup}
        onSavePopup={this.onSavePopup}
      />
    })
  }

  editGroupText(editType, data, actualElement, actualCurrentQuestion, qAnswer) {
    this.setState({
      popupContent: <EditTestPopup
        viewType={1}
        editType={editType}
        actualElement={actualElement}
        actualCurrentQuestion={actualCurrentQuestion}
        qAnswer={qAnswer}
        data={data}
        onCancelPopup={this.onCancelPopup}
        onSavePopup={this.onSaveGroupTextPopup}
      />
    })
  }

  // An popup
  onCancelPopup() {
    this.setState({
      popupContent: ''
    })
  }

  onSavePopup(oldData, newText) {
    if (newText !== '') {
      this.props.actions.saveDataAction(oldData, newText)
    }
    this.setState({
      popupContent: ''
    })
  }

  onSaveGroupTextPopup(oldData, newText) {
    if (newText !== '') {
      this.props.actions.saveGroupDataAction(oldData, newText)
    }
    this.setState({
      popupContent: ''
    })
  }


  // confirm popup
  // onRenderConfirmPopup() {
  //   this.setState({
  //     confirmPopup: 1
  //   })
  // }
  //
  // onCloseConfirmPopup() {
  //   this.setState({
  //     confirmPopup: 0
  //   })
  // }
  //
  // onExecuteConfirmPopup() {
  //   var self = this
  //   this.props.actions.saveTestAction(this.props.EditReducer.questions[0], ()=>{
  //     self.props.history.replace({
  //       pathname: '/'
  //     })
  //   })
  // }

  // back to grade list

  backToGradeList() {
    this.props.history.replace({
      pathname: '/grades'
    })
  }


  onChangeCorrectAnswer(data, questionIndex, answer) {
    let oldAnswer=data.questions[questionIndex].questions[0].answer[0].index;
    let newAnswer=answer.index;
    if(oldAnswer===newAnswer){
      return;
    }
    let answerArr=['A','B','C', 'D','E','F'];
    let display=TEXT_DISPLAY+ answerArr[answer.index];
    this.setState({
      popupContent: <ConfirmationPopup
        isConfirm={CONFIRM}
        text_display={display}
        leftButton={LEFT_BUTTON}
        rightButton={RIGHT_BUTTON}
        data={data}
        questionIndex={questionIndex}
        answer={answer}
        clickLeftButton={this.onSavePopupAnswer}
        clickRightButton={this.onCancelPopup}
      />
    })
    // this.props.actions.saveCorrectAnswerAction(data, questionIndex, answer)
  }

  onChangeGroupCorrectAnswer(renderData, actualElement, actualCurrentQuestion, answer) {
    let oldAnswer=renderData.questions[actualCurrentQuestion].answer[0].index;
    let newAnswer=answer.index;
    if(oldAnswer===newAnswer){
      return;
    }
    let answerArr=['A','B','C', 'D','E','F'];
    let display=TEXT_DISPLAY+ answerArr[answer.index];
    this.setState({
      popupContent: <ConfirmationPopup
        isConfirm={CONFIRM}
        text_display={display}
        leftButton={LEFT_BUTTON}
        rightButton={RIGHT_BUTTON}
        renderData={renderData}
        actualElement={actualElement}
        actualCurrentQuestion={actualCurrentQuestion}
        answer={answer}
        clickLeftButton={this.onSavePopupGroupAnswer}
        clickRightButton={this.onCancelPopup}
      />
    })
    // this.props.actions.saveGroupCorrectAnswerAction(renderData, actualElement, actualCurrentQuestion, answer)
  }

  onSavePopupAnswer() {
    var data = this.state.popupContent.props;
    this.props.actions.saveCorrectAnswerAction(data.data, data.questionIndex, data.answer)
    this.setState({
      popupContent: ''
    })
  }
  onSavePopupGroupAnswer() {
    var data = this.state.popupContent.props;
    this.props.actions.saveGroupCorrectAnswerAction(data.renderData, data.actualElement, data.actualCurrentQuestion, data.answer)
    this.setState({
      popupContent: ''
    })
  }


  render() {
    const {history, location, EditReducer} = this.props
    let content = ''

    if (Object.keys(EditReducer).length === 0) {
      // history.replace({
      //   pathname: this.props.location.pathname + this.props.location.search
      // })
      return false;
    }

    if (this.props.location.state.display_code === 0) {

      content = <NormalTest history={history}
                            location={location}

                            reducers={EditReducer}
                            currentQuestion={this.state.currentQuestion}
                            currentQuestionIndex={this.state.currentQuestionIndex}
                            actions={this.props.actions}
                            selectAQuestionAction={this.selectAQuestionAction}
                            editAText={this.editAText}
                            onChangeCorrectAnswer={this.onChangeCorrectAnswer}
                            backToGradeList={this.backToGradeList}/>

      this.testSize = EditReducer.questions.length
    } else {
      content = <SplitTest history={history}
                           location={location}

                           reducers={EditReducer}
                           currentQuestionIndex={this.state.currentQuestionIndex}
                           actions={this.props.actions}
                           selectAQuestionAction={this.selectAQuestionAction}
                           editGroupText={this.editGroupText}
                           onChangeCorrectAnswer={this.onChangeGroupCorrectAnswer}
                           backToGradeList={this.backToGradeList}/>
      let counter = 0
      for (var i = 0; i < EditReducer.questions.length; i++) {
        for (var j = 0; j < EditReducer.questions[i].questions.length; j++) {
          counter++
        }
      }
      this.testSize = counter
    }

    var inactiveBtn = {}
    var inactiveBtn2 = {}
    if (this.state.currentQuestionIndex === 0) {
      inactiveBtn = {
        'pointerEvents': 'none',
        background: '#888',
        border: '1px solid #b7b7b7'
      }
    } else if (this.state.currentQuestionIndex === this.testSize - 1) {
      inactiveBtn2 = {
        'pointerEvents': 'none',
        background: '#888',
        border: '1px solid #b7b7b7'
      }
    }

    /*var confirmPopup = <div></div>*/
    // if (this.state.confirmPopup === 1) {
    //   confirmPopup = <ConfirmationPopup isConfirm={true}
    //                                     leftButton="OK"
    //                                     rightButton="Cancel"
    //                                     className=""
    //                                     clickLeftButton={this.onExecuteConfirmPopup}
    //                                     clickRightButton={this.onCloseConfirmPopup}
    //                                     text_display="Do you want to save the test ?"/>
    // }

    return (
      <div className="wrapper">
        <div className="review_test">
          {this.state.popupContent}
          {content}
          <div className="footer_test">
            <div className="ft_tst_r">
              <ul>
                <li>
                  <a className="btn_back" style={inactiveBtn}
                     onClick={this.selectAQuestionAction.bind(this, this.state.currentQuestionIndex - 1)}>
                    Back
                  </a>
                </li>
                <li>
                  <a className="btn_next" style={inactiveBtn2}
                     onClick={this.selectAQuestionAction.bind(this, this.state.currentQuestionIndex + 1)}>
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {EditReducer: state.edittest}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTest)
