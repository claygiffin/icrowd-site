import React from 'react'
import Lightbox from './Lightbox'

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export default class ContactFormLightbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(e){
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => {
        this.setState({
          submitted: true
        })
      })
      .catch(error => alert(error));

    e.preventDefault();
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  } 

  handleClose(){
    this.props.onClose();
    setTimeout(() => {
      this.setState({
        name: "",
        email: "",
        subject: "",
        message: "",
        submitted: false,
      })
    }, 300);
  }

  componentDidMount(){
    this.setState({subject: this.props.subject})
  }

  render(){
    const { name, email, subject, message } = this.state;
    return(
      <Lightbox 
        isOpen={this.props.isOpen}
        // isLoaded={true}
        onClose={this.handleClose}
        className={`contact-form ${this.props.className || ''}`}
      >
        <h2>Work With Us</h2>
        <form name="contact" method="post" data-netlify="true" onSubmit={this.handleSubmit} className={this.state.submitted ? 'hidden' : ''} data-netlify-honeypot="bot-field" >
          <input type="hidden" name="form-name" value="contact" /> 
          <input type="hidden" name="bot-field" />
          <input type="text" name="name" value={name} placeholder="Your name (required)" required={true} onChange={this.handleChange} />
          <input type="email" name="email" value={email} placeholder="Your email address (required)" required={true} onChange={this.handleChange} />
          <input type="text" name="subject" value={subject} autoComplete="off" placeholder="Which coaches and/or services are you interested in?" onChange={this.handleChange} />
          <textarea name="message" value={message} placeholder="Additional notes" onChange={this.handleChange} ></textarea>
          <button type="submit" className="cta-link" >Submit Inquiry</button>
        </form>
        <div className={`form-success ${this.state.submitted ? '' : 'hidden'}`}>
          <p>Thank you, your inquiry has been sent successfully.</p>
          <button className="cta-link" onClick={this.handleClose} >Return to site</button>
        </div>
      </Lightbox>      
    )
  }
}