import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import './ServiceContent.scss'
import {Waypoint} from 'react-waypoint'

class ServiceContent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      animated: false,
    }
  }

  _handlePositionChange(currentPosition){
    if (currentPosition === 'inside' || currentPosition === 'above') {
      this.setState({
        animated: true
      })
    }
  }

  render(){

    const {id, content} = this.props;

    return (
      <section id={id} className={`service-content`}>
        <Waypoint onPositionChange={({currentPosition}) => {this._handlePositionChange(currentPosition)}} scrollableAncestor={window} />
        <h2 className={`large ${this.state.animated ? 'animated' : ''}`}>{content.data.headline.text}</h2>
        <div className={`details ${this.state.animated ? 'animated' : ''}`}>
          <div className="text">
            <h5>{content.data.service_name.text}</h5>
            <div className="lede" dangerouslySetInnerHTML={{__html: content.data.lede.html}} />
          </div>
          <AniLink fade duration={.5} to={`/${content.uid}`} className="button">Learn More</AniLink>
        </div>
      </section>
    )
  }
} 

export default ServiceContent