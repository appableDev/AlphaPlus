import React, { Component, PropTypes } from 'react'
import SHA256 from 'crypto-js/sha256'
import * as Messages from '../../constants/messages.constant'

const _ENTER = 13

class LoginBox extends Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      errorMessage: '',
      isClickedLogin: false
    }
  }

  componentDidMount(){
    let self = this
    this.eventKeyDown = function(e) {
      switch (e.keyCode) {
        case _ENTER:
          if (self.refs.email.value.toString() !== '' && self.refs.password.value.toString() !== '') {
            self.handleLogin()
          }
          break
        default:
          break
      }
    }
    window.addEventListener("keydown", this.eventKeyDown, false)
  }

  componentWillUnmount(){
    window.removeEventListener("keydown", this.eventKeyDown, false)
  }

  handleLogin() {
    let email_valid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    let re = new RegExp(email_valid)
    let email = this.refs.email.value.toString().trim()

    if(!re.test(email) || email === "") {
      this.setState({
        isClickedLogin: false,
        errorMessage: Messages.LOGIN_WRONG_EMAIL_FORMAT
      })
      return
    } else {
      //Encrypt password
      let key = '[Encrypt_password]'
      let loginData = {
        email: this.refs.email.value.toString().trim(),
        password: key,
        forceLogin: true
      }
      let self = this
      this.props.actions.loginAction(loginData, this.props.history, function(err) {
        self.setState({isClickedLogin: false, errorMessage: err})
      })
    }
    this.setState({isClickedLogin: true})
  }

  render() {
    return(
        <div className="wrapper">
          <div className="login_form form_st">
            <div className="sum_form">
              <div className="main_title backgroundred">
                <h1 id="hoho">CMS Login</h1>
              </div>
              <div className="desc_login student_lg">
                  <div className="student_id"><span>Email</span>
                    <div className="login_left">
                      <input ref="email" type="text" name="firstname" placeholder="Enter Your Email" />
                    </div>
                  </div>

                  <div className="student_id"><span>Password</span>
                    <div className="login_left">
                      <input ref="password" type="password" name="lastname" placeholder="Enter Your Password" />
                    </div>
                  </div>
                  <div className="login_error">{this.state.errorMessage}</div>
                  <div className={this.state.isClickedLogin?"btn_1 disabled":"btn_1"}>
                    {this.state.isClickedLogin && <button className="disabled" type="button" >Login</button>}
                    {!this.state.isClickedLogin && <button type="button" onClick={this.handleLogin}>Login</button>}
                  </div>


              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default LoginBox
