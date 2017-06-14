
import React, { Component, PropTypes } from 'react'
import * as Constant from '../../constants/app.constant'

export default class EditTestPopup extends Component {

  constructor(props) {
    super(props)

    this.changeInputText = this.changeInputText.bind(this)
    this.previewBtn = this.previewBtn.bind(this)
    this.saveBtn = this.saveBtn.bind(this)

    this.state = {
      inputValue: ""
    }
    this.timeout = null
    this.withoutPreview = ''
  }

  componentDidMount() {
    let self = this
    // init popup
    let previewBoxDOM = document.getElementById("preview_box_id")
    if(this.timeout){
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(function(){
      if (self.props.viewType === 0) {
        previewBoxDOM.innerHTML = convertData(self.props)
      } else {
        previewBoxDOM.innerHTML = convertDataForSplitView(self.props)
      }
      self.withoutPreview = previewBoxDOM.innerHTML
      previewBoxDOM.setAttribute("style", "visibility: visible")
      MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
    }, 100)
    this.componentDidUpdate()
  }

  componentDidUpdate(){
    var previewBoxDOM = document.getElementById("preview_box_id")
    previewBoxDOM.innerHTML = this.state.inputValue.replace(/<script/gi, '&lt;script').replace(/\son[a-z]+=/gi, 'XXXX_BLOCKED=');
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
  }

  componentWillReceiveProps(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
  }

  changeInputText(){
    if(this.timeout){
      clearTimeout(this.timeout)
    }
    var inputValue = document.getElementById("inputArea")
    this.withoutPreview = inputValue.value
  }

  previewBtn() {
    var previewBoxDOM = document.getElementById("preview_box_id")
    previewBoxDOM.innerHTML = this.state.inputValue

    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
    previewBoxDOM.setAttribute("style", "visibility: visible")

    var inputValue = document.getElementById("inputArea")
    this.setState({
      inputValue: inputValue.value,
    })
  }

  saveBtn() {
    this.props.onSavePopup(this.props, this.withoutPreview)
  }

  render() {
    var self = this
    let dataInput = ''
    if (this.props.viewType === 0) {
      dataInput = convertData(self.props)
    } else {
      dataInput = convertDataForSplitView(self.props)
    }

    var css = 'common_title'
    if (self.props.editType === Constant.EDIT_DIRECTION) {
      css = "common_title direction"
    } else if (self.props.editType === Constant.EDIT_QUESTION) {
      css = "common_title main_question"
    } else {
        css='common_answer'
      }

    var contentDOM =
      <div id="openModal" className="modalDialog cms">
        <a onClick={this.props.onCancelPopup} title="Close" className="close"></a>
        <div className="popup_cms">
          <div className="content_popup">
            <div className="input">
              <p className="h_title">Input</p>
              <a onClick={this.previewBtn} className="preview_btn">Preview</a>
              <textarea
                id="inputArea"
                onKeyUp={this.changeInputText}
                rows="5"
                defaultValue={dataInput}>
              </textarea>
            </div>

            <div className="preview">
              <p className="h_title">Result</p>
              <a onClick={this.saveBtn} className="done">Save</a>
              <div className="preview_box">
                <div className={css}>
                  <div id="preview_box_id">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    return (
      <div id="openModal" className="modalDialog">
        {contentDOM}
      </div>
    )
  }
}

function convertData(data) {
  let tmp = ''
  switch (data.editType) {
    case Constant.EDIT_DIRECTION:
      tmp = data.qData.direction
      break;
    case Constant.EDIT_QUESTION:
      tmp = data.qData.question
      break;
    case Constant.EDIT_ANSWER:
      tmp = data.qAnswer.content
      break;
    default:
      break;
  }
  return tmp
}

function convertDataForSplitView(data) {
  let tmp = ''
  switch (data.editType) {
    case Constant.EDIT_DIRECTION:
      tmp = data.data.text[0].direction
      break;
    case Constant.EDIT_PARAGRAPH:
      tmp = data.data.text[0].paragraphs
      break;
    case Constant.EDIT_QUESTION:
      tmp = data.data.questions[data.actualCurrentQuestion].question
      break;
    case Constant.EDIT_ANSWER:
      tmp = data.qAnswer.content
      break;
    default:
      break;
  }
  return tmp
}
