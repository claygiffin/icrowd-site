import React from 'react'
import './Hero.scss'
import Parallax from './Parallax'

class Hero extends React.Component {

  render(){
    // let parallaxPos = `translate3d(0, ${this.state.pos / 3}px, 0)`
    return(
      <section id="hero" className={this.props.className || ''}>
        <Parallax>
          {this.props.video &&         
            <video
              id="hero-video" 
              poster={this.props.poster || "" }
              playsInline 
              muted 
              autoPlay 
              loop 
              async 
              volume={0} 
            >
              {this.props.videoWebM && <source src={this.props.videoWebM} type="video/webm" /> }
              {this.props.videoOgg && <source src={this.props.videoOgg} type="video/ogg"/> }
              {this.props.videoMp4 && <source src={this.props.videoMp4} type="video/mp4" /> }
            </video>
          }
          {this.props.image && 
            <div id="hero-image">
              <img src={this.props.imgSrc} alt={this.props.imgAlt || ""} />
            </div>
          }
        </Parallax>
        <div id="hero-content">
          {this.props.children}
        </div>
      </section>
    )
  }

}

export default Hero

