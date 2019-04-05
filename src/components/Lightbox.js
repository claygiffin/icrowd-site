import React from 'react'
import {Portal} from 'react-portal'
import './Lightbox.scss'

export class Lightbox extends React.Component {
  constructor(props){
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(event){
    if(event.keyCode === 27 && this.props.isOpen) {
      this.props.onClose();
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render(){
    return (
      <>
        {(this.props.isOpen || this.props.isLoaded) && (
          <Portal
            node={(typeof document !== "undefined") && document.getElementById('___gatsby')}
          >
            <div className={`lightbox ${this.props.className || ''}`} style={(this.props.isLoaded && !this.props.isOpen) ? {display: 'none'} : {display: 'block'}}>
                <div className="lightbox-wrapper" >
                <div className="wrapper-inner">
                  <div className="lightbox-container">
                    <nav>
                      <div className="close-button" onClick={this.props.onClose}></div>
                    </nav>
                    <div className="lightbox-content">
                      { this.props.children }        
                    </div>
                  </div>
                    <div className="lightbox-bg" onClick={this.props.onClose}></div>
                  </div>
                </div>
            </div>
          </Portal>
        )}
      </>
    )
  }



}

export default Lightbox