
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import cookie from 'react-cookie'
import {connect} from "react-redux";
import SelectionBox from "../components/homepage/homepage.component";
import * as Actions from "../actions/homepage.action.js";

class CmsSelection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {history, location, reducers} = this.props
    if(cookie.load('token') == undefined){
      window.location.href = "/"
      return false
    }

    return (
      <div>
        <div className="content">
          <SelectionBox
            history={history}
            location={location}

            reducers={reducers}
            actions={this.props.actions}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {reducers: {cmsSelectionReducer: state.cmsSelection, loginReducer: state.login}}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsSelection)
