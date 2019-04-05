import React from 'react'
import ContactFormLightbox from './ContactFormLightbox'

export default class ContactFormLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lightboxOpen: false,
      otherLightboxClosed: false,
    }
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    if (document.body.classList.contains('lightbox-open') ) {
      setTimeout(() => {document.body.classList.add('multi-lightbox-open')}, 10);
      setTimeout(() => {
        this.setState({
          lightboxOpen: true,
        })
      },
        10
      )
      setTimeout(() => {
        this.setState({
          otherLightboxClosed: true,
        })
      },
        200
      )
    } else {
      this.setState({
        lightboxOpen: true,
      });
      setTimeout(() => {document.body.classList.add('lightbox-open')}, 10);
    }
  }

  handleFormClose(){
    if (document.body.classList.contains('multi-lightbox-open') ) {
      this.setState({otherLightboxClosed: false });
      setTimeout(() => {document.body.classList.remove('multi-lightbox-open')}, 200);
      setTimeout(() => {
        this.setState({
          lightboxOpen: false,
        })
      },
        200
      )
    } else {
      document.body.classList.remove('lightbox-open');
      setTimeout(() => {
        this.setState({
          lightboxOpen: false,
        })
      },
        300
      )
    }
  }

  render(){
    return(
      <>
        <div
          className={`contact-link ${this.props.className || ''}`}
          onClick={this.handleClick}
          style={{cursor: "pointer"}}
        >
          {this.props.linkText}
        </div>
        <ContactFormLightbox 
          isOpen={this.state.lightboxOpen} 
          onClose={this.handleFormClose}
          className={this.state.otherLightboxClosed ? 'active' : ''}
          subject={this.props.subject ? this.props.subject : ''}
        />
      </>
    )
  }
}