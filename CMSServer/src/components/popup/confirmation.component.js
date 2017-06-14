import React, { Component, PropTypes } from 'react'

export default class ConfirmationPopup extends Component {

  constructor(props) {
      super(props);
  }

  render(){
    var buttons = "";
    var text_display_id = ""
    var leftButtonId = ""
    var rightButtonId = ""

    if(this.props.text_display_id !== undefined){
      text_display_id = this.props.text_display_id
    }

    if(this.props.rightButtonId !== undefined){
      rightButtonId = this.props.rightButtonId
    }

    if(this.props.leftButtonId !== undefined){
      leftButtonId = this.props.leftButtonId
    }

    if (this.props.isConfirm) {
      buttons = <div className="cd-buttons confirm-button">
        <ul>
          <li><a id={leftButtonId} className={this.props.className} onClick={this.props.clickLeftButton}>{this.props.leftButton}</a></li>
          <li><a id={rightButtonId} onClick={this.props.clickRightButton}>{this.props.rightButton}</a></li>
        </ul>
      </div>

    } else {
      buttons = <ul className="cd-buttons confirm-button">
        <li className="btn-resume"><a id={rightButtonId} onClick={this.props.clickRightButton}>{this.props.rightButton}</a></li>
      </ul>
    }
    var classPopup = "modalDialog"
    if (this.props.classPopup !== '') {
      classPopup += ' '+this.props.classPopup
    }

    return (
      <div className="popup_management">
        <div id="openModal" className={classPopup}>
          <div className="cd-popup-container">
            <a onClick={this.props.clickRightButton} title="Close" className="close"></a>
            <p id={text_display_id}>{this.props.text_display}</p>
            {buttons}
          </div>
        </div>
      </div>
    )
  }
}
