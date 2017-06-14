import React, { Component, PropTypes } from 'react'

export default class EditTestPopup extends Component {

  constructor(props) {
      super(props);
      this.changeInputText = this.changeInputText.bind(this)
      this.saveInputText = this.saveInputText.bind(this)
      this.selectObjective = this.selectObjective.bind(this)
      this.timeout = null
  }

  componentDidMount(){

    if(this.props.data.editType !== editTypeConst.ANSWER_KEY && this.props.data.editType !== editTypeConst.OBJECTIVE_NUMBER){
      var previewBoxDOM = document.getElementById("preview_box_id")
      previewBoxDOM.setAttribute("style", "visibility: hidden")

      if(this.timeout){
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(function(){
        MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
        previewBoxDOM.setAttribute("style", "visibility: visible")
      }, 500)

      this.componentDidUpdate()
    }

  }

  componentDidUpdate(){
    debug("Did update nha: ")

    if(this.props.data.editType !== editTypeConst.ANSWER_KEY && this.props.data.editType !== editTypeConst.OBJECTIVE_NUMBER){
      var previewBoxDOM = document.getElementById("preview_box_id")

      previewBoxDOM.innerHTML = this.props.data.preview.replace(/<script/gi, '&lt;script').replace(/\son[a-z]+=/gi, 'XXXX_BLOCKED=');
    }
  }

  componentWillReceiveProps(nextProps){
    debug("nextProps nha: ", nextProps)
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
  }

  changeInputText(){
    var self = this
    if(this.timeout){
      clearTimeout(this.timeout)
    }
    var previewBoxDOM = document.getElementById("preview_box_id")
    previewBoxDOM.setAttribute("style", "visibility: hidden")
    var inputValue = document.getElementById("inputArea")
    self.props.changeTextPopupAction(inputValue.value)

    this.timeout = setTimeout(function(){
      MathJax.Hub.Queue(["Typeset",MathJax.Hub, "preview_box_id"])
      previewBoxDOM.setAttribute("style", "visibility: visible")
    }, 500)

  }

  saveInputText(){

    var actualElement
    var actualCurrentQuestion
    var currentData

    var dataPass

    // for ANSWER KEY
    if(this.props.data.editType === editTypeConst.ANSWER_KEY){
      dataPass = this.props.data.currentSelectedAnswer

    }else if(this.props.data.editType === editTypeConst.OBJECTIVE_NUMBER){
      debug("data la gi: ", this.props.data.currentSelectedObj)
      dataPass = {
        objective_id: this.props.data.objectiveData[this.props.data.currentSelectedObj]._id,
        objective_text: this.props.data.objectiveData[this.props.data.currentSelectedObj].objective_text,
        objective_number: this.props.data.objectiveData[this.props.data.currentSelectedObj].objective_number
      }
    }else{
      var inputValue = document.getElementById("inputArea")
      var escapeHTML = inputValue.value.replace(/<script/gi, '&lt;script').replace(/\son[a-z]+=/gi, 'XXXX_BLOCKED=');
      dataPass = escapeHTML
    }


    if(this.props.displayCode === 0){
      actualElement = this.props.currentIndex
      currentData = this.props.questions[this.props.currentIndex]
      debug("Data pass when update: ", dataPass)

      saveTextMath(currentData, dataPass, this.props.data.editType)

    }else{
      actualElement = this.props.listIndex[this.props.currentIndex][0]
      actualCurrentQuestion = this.props.listIndex[this.props.currentIndex][1]

      currentData = this.props.questions[actualElement]
      saveTextEnglish(currentData, actualCurrentQuestion, dataPass, this.props.data.editType)
    }

    debug("Current data before update test: ", currentData)
    this.props.saveTextPopupAction(currentData._id, currentData, this.props.data.editType)

  }

  saveAnswerKey(index){
    this.props.saveAnswerKeyAction(index)
  }

  selectObjective(e){
    debug("You selected objecitve _id: ", e.target.value)
    this.props.selectObjectiveAction(e.target.value)
  }

  render(){
    var self = this
    debug("[Component] Popup Edit Test props: ", this.props)

    var contentDOM

    //For editing ANSWER KEY
    if(this.props.data.editType === 15){
      //Create alphabet answer
      var alphabet = []
      var firstChar = 'A'.charCodeAt(0)
      var lastChar = 'Z'.charCodeAt(0)

      var renderAnswer = []
      for(var i = 0; i < this.props.data.lengthChoices; i++){
        alphabet.push(String.fromCharCode(firstChar))
        ++firstChar

        renderAnswer.push(i)
      }

      contentDOM =
        <div className="popup_cms">
        <div className="content_popup">
          <div className="answer text_ans">
            <div style={{marginLeft: '50px'}} className="ans_option">
              <h3>Select an answer key: </h3>
              {
                renderAnswer.map(function(row){

                  var highlightCSS = {}

                  if(self.props.data.currentSelectedAnswer === row){
                    highlightCSS = {background: '#214099', color: '#fff', border: '1px solid #041C61'}
                  }
                  return(
                      <span onClick={self.saveAnswerKey.bind(self, row)} style={highlightCSS} className="circle" id={row}>{alphabet[row]}</span>
                  )
                })
              }
            </div>
          </div>
          </div>
          <div className="cd-buttons">
            <ul>
              <li><a onClick={this.saveInputText} className="done">Update</a></li>
              <li><a onClick={this.props.clickCancelEditTestPopUp} className="cancel">Cancel</a></li>
            </ul>
          </div>
        </div>
    }else if(this.props.data.editType === 0){

      contentDOM =
        <div className="popup_cms">
        <div className="content_popup">
          <div className="answer text_ans">
            <div style={{marginLeft: '50px'}} className="ans_option">
              <h3>Select an objective number: </h3>
              <select onChange={self.selectObjective} defaultValue={self.props.data.input}>
                <option id="default" value="default">Select an objective</option>
                {

                  this.props.data.objectiveData.map(function(row){

                    return(
                      <option id={row._id} value={row._id}>{row.objective_number}</option>
                    )
                  })
                  // this.props.questions[this.props.currentIndex].map(function(row){
                  //   return(
                  //     <option id={row._id} value={row._id}>{row.grade} - {row.subject}</option>
                  //   )
                  // })

                }
              </select>
              <span style={{float: "none"}}>{this.props.data.objectiveData[this.props.data.currentSelectedObj].objective_text}</span>
            </div>
          </div>
          </div>
          <div className="cd-buttons">
            <ul>
              <li><a onClick={this.saveInputText} className="done">Update</a></li>
              <li><a onClick={this.props.clickCancelEditTestPopUp} className="cancel">Cancel</a></li>
            </ul>
          </div>
        </div>
    }else{
      contentDOM =
      <div className="popup_cms">
        <div className="content_popup">
          <div className="input">
            <p>Input</p>
            <textarea
              id="inputArea"
              onKeyUp={self.changeInputText}
              rows="5"
              defaultValue={this.props.data.input}>
            </textarea>
          </div>

          <div className="preview">
            <p>Preview</p>
            <div className="preview_box">
              <div id="preview_box_id"></div>
            </div>
          </div>
        </div>
        <div className="cd-buttons">
          <ul>
            <li><a onClick={this.saveInputText} className="done">Update</a></li>
            <li><a onClick={this.props.clickCancelEditTestPopUp} className="cancel">Cancel</a></li>
          </ul>
        </div>

      </div>

    }


    return (
      <div id="openModal" className="modalDialog">
      	{contentDOM}
         
      </div>
    )
  }
}




// ----- HELPER -----
const editTypeConst = {
    "OBJECTIVE_NUMBER": 0,
    // "OBJECTIVE_TEXT": 1,
    "SUBJECT": 2,
    "TEST_NAME": 3,
    "DIRECTION": 11,
    "QUESTION": 12,
    "DIRECTION_TEXT": 13,
    "PARAGRAPH_TEXT": 14,
    "ANSWER_KEY": 15,
    "ANSWER_A": 101,
    "ANSWER_B": 102,
    "ANSWER_C": 103,
    "ANSWER_D": 104,
    "ANSWER_E": 105,
    "ANSWER_F": 106,
}

function saveTextMath(currentData, input, type){
    switch (type){
        case editTypeConst.OBJECTIVE_NUMBER:
            currentData.general_info.objective_number = input.objective_number
            currentData.general_info.objective_id = input.objective_id
            currentData.general_info.objective_text = input.objective_text
            break
        case editTypeConst.OBJECTIVE_TEXT:
            currentData.general_info.objective_text = input
            break
        case editTypeConst.SUBJECT:
            currentData.general_info.subject = input
            break
        case editTypeConst.DIRECTION:
            currentData.questions[0].direction = input
            break
        case editTypeConst.QUESTION:
            currentData.questions[0].question = input
            break
        case editTypeConst.ANSWER_KEY:
            currentData.questions[0].answer[0].index = input
            break
        case editTypeConst.ANSWER_A:
            currentData.questions[0].choices[0].content = input
            break
        case editTypeConst.ANSWER_B:
            currentData.questions[0].choices[1].content = input
            break
        case editTypeConst.ANSWER_C:
            currentData.questions[0].choices[2].content = input
            break
        case editTypeConst.ANSWER_D:
            currentData.questions[0].choices[3].content = input
            break
        case editTypeConst.ANSWER_E:
            currentData.questions[0].choices[4].content = input
            break
        case editTypeConst.ANSWER_F:
            currentData.questions[0].choices[5].content = input
            break
        default:
            break
    }
}

function saveTextEnglish(currentData, index, input, type){
    switch(type){
        case editTypeConst.DIRECTION_TEXT:
            currentData.text[0].direction = input
            break
        case editTypeConst.PARAGRAPH_TEXT:
            currentData.text[0].paragraphs = input
            break
        case editTypeConst.DIRECTION:
            currentData.questions[index].direction = input
            break
        case editTypeConst.QUESTION:
            currentData.questions[index].question = input
            break
        case editTypeConst.ANSWER_KEY:
            currentData.questions[index].answer[0].index = input
            break
        case editTypeConst.ANSWER_A:
            currentData.questions[index].choices[0].content = input
            break
        case editTypeConst.ANSWER_B:
            currentData.questions[index].choices[1].content = input
            break
        case editTypeConst.ANSWER_C:
            currentData.questions[index].choices[2].content = input
            break
        case editTypeConst.ANSWER_D:
            currentData.questions[index].choices[3].content = input
            break
        case editTypeConst.ANSWER_E:
            currentData.questions[index].choices[4].content = input
            break
        case editTypeConst.ANSWER_F:
            currentData.questions[index].choices[5].content = input
            break
        default:
            break
    }
}
