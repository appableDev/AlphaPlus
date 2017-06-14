/**
 * Created by zenymax on 2/13/17.
 */

/*eslint-disable no-unused-vars*/
import Header from './components/commons/header.component'
import Footer from './components/commons/footer.component'
import LostNetworkBox from './components/commons/lostnetwork.component'
/*eslint-enable no-unused-vars*/
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import * as Actions from './actions/login.action'
import cookie from 'react-cookie';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLostNetwork: false
    }
  }

  componentDidMount(){
    let self = this
    window.addEventListener('offline', function(){
      self.setState({isLostNetwork: true})
    })
    window.addEventListener('online', function(){
      self.setState({isLostNetwork: false})
    })
    var token=cookie.load('token');
    if (Object.keys(this.props.reducers.loginReducer).length === 0 && token == undefined) {
      this.props.history.replace({
        pathname: '/'
      })
      return false
    }
  }

  render() {
    let lostNetworkDOM = ''
     if (this.state.isLostNetwork === true && this.props.location.pathname !== '/') {
      lostNetworkDOM = <LostNetworkBox />
    }

    return (
      <div className='content'>
        <Header location={this.props.location} reducers={this.props.reducers.loginReducer} logoutAction={this.props.actions.logoutAction}/>
        {this.props.children}
        <Footer/>
        {lostNetworkDOM}
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    reducers: {
      loading: state.ajaxCallInProgress > 0,
      loginReducer: state.login
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
