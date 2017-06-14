import React, { Component, PropTypes } from 'react'
import LoginBox from '../components/login/loginbox.component'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/login.action.js'

function mapStateToProps(state) {
    return{
      loginReducer: state.login
    }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Actions, dispatch)}
}

class LoginPage extends Component {
    constructor(props){
      super(props)
    }
    render() {
        console.log("Inside Login Site [Props] = ", this.props)
        const {history, location, loginReducer} = this.props

        return (
          <div className="content">
            <LoginBox
              history={history}
              location={location}

              reducers={loginReducer}
              actions={this.props.actions}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
