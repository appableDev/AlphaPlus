/**
 * Created by trieule on 12/18/15.
 */
import cookie from "react-cookie";

var API = {}

API.loginUrl = function () {
  return urlWrapper('/teacherlogin')
}

API.logoutUrl = function () {
  return urlWrapper('/teacherlogout')
}

API.getSelectionDataUrl = ()=>{
  return urlWrapper('/getselectiondataurl')
}

API.getGradeListUrl = ()=>{
  return urlWrapper('/cms/grade/list')
}

API.getATestUrl = ()=>{
  return urlWrapper('/cms/test/questions/list')
}

API.saveQuestionUrl = ()=>{
  return urlWrapper('/cms/savequestion')
}

API.saveCorrectAnswerUrl = ()=>{
  return urlWrapper('/cms/updatecorrectanswer')
}

API.loginUrl = ()=>{
  return urlWrapper('/cms/login')
}


function urlWrapper(apiEndPoint) {
  let url = global.base_url + ':' + global.api_port + apiEndPoint;
  const token = cookie.load('token');
  if (token) {
    url += '?token=' + token
  } else {
    url += '?token=undefined'
  }
  return url
}

module.exports = API
