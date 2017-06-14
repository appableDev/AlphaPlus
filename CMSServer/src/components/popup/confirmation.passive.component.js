import React, { Component, PropTypes } from 'react'

export default class ConfirmationPassivePopup extends Component {

  constructor(props) {
      super(props);
  }

  render(){
    return (
      <div id="openModal" className="modalDialog">
        <div className="cd-popup-container">
          <p>{this.props.text_display}</p>
        </div>
      </div>
    )
  }
}
