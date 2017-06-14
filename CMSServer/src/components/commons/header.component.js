import React from 'react'
const header = (data) => {
  let logoutBtn = ''
  let displayName = ''
  let headerContent=''
  if (data.location.pathname !== '/' && data.location.pathname !== '/login') {
    displayName = <a id="accountTitle" className="user">{data.reducers.last_name} {data.reducers.first_name}</a>
    logoutBtn = <a alt="logout" className="logout" onClick={data.logoutAction}>Logout</a>


    var userInfo = data.location.state;
    if (Object.keys(data.reducers).length === 0 && userInfo) {
      displayName = <a id="accountTitle" className="user">{userInfo.last_name} {userInfo.first_name}</a>
    }

    //show user info and logout button in grades page
    if(data.location.pathname!=="/testpage" && data.location.pathname!=="testpage"){
      headerContent= <div className="header_login">
        {logoutBtn}
        {displayName}
      </div>
    }
  }


  return (
    <div className="header">
      <div className="header_top">
        <div className="header_img"><img src="images/logo.png" alt="logo_alphaplus"/></div>
        {headerContent}
      </div>
    </div>
  )
}
export default header
