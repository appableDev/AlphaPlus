import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ImageLoader from 'react-imageloader'

import * as types from '../../constants/AppConstants'

class LoadingBox extends Component {

  /*
    Props:
    - imgWidth: width of the image
    - wrapperWidth: width of the div outside
    - wrapperMargin: margin of the div outside
   */
  render(){
    // debug("LOADING BOX [PROPS]: ", this.props)

    var imgProps = {
      width: this.props.imgWidth
    }

    if(this.props.imgWidth == undefined){
      imgProps.width = "50px"
    }

    var wrapperStyle = {}
    if(this.props.customStyle === undefined){
      wrapperStyle = {
        width: this.props.wrapperWidth,
        margin: this.props.wrapperMargin
      }

      if(this.props.wrapperWidth == undefined){
        wrapperStyle.width = "20%"
      }

      if(this.props.wrapperMargin === undefined){
        wrapperStyle.margin = "1% auto"
      }
    }else{
      wrapperStyle = this.props.customStyle
    }

    var imageType = types.LOADING_IMAGE_A
    if(this.props.imageType !== undefined){
      imageType = this.props.imageType
    }
    
    return(
      <div>
        <ImageLoader src={imageType}
          wrapper={React.DOM.div}
          imgProps={imgProps}
          style={wrapperStyle}>
          <div> No loading image found </div>
        </ImageLoader>
      </div>
    )
  }

}

export default LoadingBox
