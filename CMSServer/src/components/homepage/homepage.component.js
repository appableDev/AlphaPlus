
import React, {Component} from "react";
import {Link} from 'react-router';

class CmsSelection extends Component {

  constructor(props, context) {
    super(props, context)
    this.selectAGradeAction = this.selectAGradeAction.bind(this)
    this.selectATest = this.selectATest.bind(this)

    this.state = {
      selectGrade: {
        formative_test_list: [],
        summative_test_list: []
      },
      loading: false
    }
  }

  componentDidMount() {
    this.props.actions.loadPageAction()
    this.setState({loading: true})
  }

  componentWillReceiveProps() {
    this.setState({loading: false})
  }

  selectATest(data) {
    this.props.actions.selectTestAction(data, this.props.history)
  }

  selectAGradeAction(e) {
    if (e.target.value === 'default') {
      this.setState({
        selectGrade: {
          formative_test_list: [],
          summative_test_list: []
        }
      })
      return
    }
    for (var i = 0; i < this.props.reducers.cmsSelectionReducer.length; i++) {
      if (e.target.value === this.props.reducers.cmsSelectionReducer[i]._id) {
        this.setState({selectGrade: this.props.reducers.cmsSelectionReducer[i]})
        break
      }
    }
  }


  render() {
    var self = this
    var spinnerDOM = ''
    if (this.state.loading) {
      spinnerDOM = <div className="spinner-import">
        <div className="loadingSpinner">
          <div id="circularG">
          </div>
        </div>
      </div>
    }
    var renderContent =
      <div className="cms_selection">
        <div className="choose_class">
          <div className="item">
              <span className="sort">
                <span className="title-1">Grade:</span>
                <select onChange={self.selectAGradeAction}>
                  <option id="default" value="default">Select a grade</option>
                  {
                    this.props.reducers.cmsSelectionReducer.map(function (row) {
                      return (
                        <option id={row._id} value={row._id}>{row.grade} - {row.grade_name}</option>
                      )
                    })
                  }
            </select>
              </span>
          </div>
        </div>
        <div className="list_name">

          <div className="selectTest sum">
            <h3>Summative Test List</h3>
            <ul>
              {
                self.state.selectGrade.summative_test_list.map(test => {
                  var urlActive = "testpage?test_id=" + test.test_id;
                  return (
                    <li><Link to={urlActive} target="_blank"><p>{test.test_name}</p></Link></li>
                  )
                })
              }
            </ul>
          </div>
          <div className="selectTest form">
            <h3>Formative Test List</h3>
            <ul>

              {
                self.state.selectGrade.formative_test_list.map(test => {
                  var urlActive = "testpage?test_id=" + test.test_id;
                  return (
                    <li>
                      {/*<a onClick={self.selectATest.bind(self, test)}>{test.test_name}*/}
                      {/*<span className="desc_object">{test.test_description}</span>*/}
                      {/*</a>*/}
                      <Link to={urlActive} target="_blank">{test.test_name}
                        <span className="desc_object">{test.test_description}</span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

    return (
      <div className="wrapper">
        {spinnerDOM}
        {renderContent}
      </div>
    )
  }
}

export default CmsSelection
