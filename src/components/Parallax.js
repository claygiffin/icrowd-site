import React from 'react'
import './Parallax.scss'

class Parallax extends React.Component{

  constructor(props){
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.Ref = React.createRef();
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(){
    const elPos = this.Ref.current.parentElement.getBoundingClientRect().top;
    const parallaxPos = Math.round((0 - elPos) / this.props.scrollFactor);
    this.Ref.current.style.transform = `translate3d(0, ${parallaxPos}px, 0)`;
  }

  render(){
    return (
      <div className={`parallax-bg ${this.props.className || ''}`} ref={this.Ref} >
        {this.props.children}
      </div>
    )
  }
}

Parallax.defaultProps = {
  scrollFactor: 3.5,
}

export default Parallax