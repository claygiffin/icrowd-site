import React from 'react'
import {graphql} from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import {Waypoint} from 'react-waypoint'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ServiceContent from '../components/ServiceContent'
import ContactSection from '../components/ContactSection'
import AnimatedLine from '../components/AnimatedLine'
import AnimatedSVG from '../components/AnimatedSVG'
import AdvisorySVG from '../assets/advisory_illustration.inline.svg'
import HealthSVG from '../assets/health_illustration.inline.svg'
import EventSVG from '../assets/event_illustration.inline.svg'

const yellow = 'hsl(40, 97%, 59%)'
const teal = 'hsl(186, 65%, 45%)'
const orange = 'hsl(22, 74%, 44%)'

export default class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lineColor: yellow,
      animations: {
        // Make sure these are in the order they will appear on the page
        hero: {
          animated: false, // Has the animation been started?
          duration: 2000, // How long will this section animate for? Based on CSS animation timing
          complete: false, // Has the animation finished?
          startTime: '',  // What time did animation start?
          color: yellow // The color associated with this section
        },
        advisory: {
          animated: false,
          duration: 3500,
          complete: false,
          startTime: '',
          color: yellow
        },
        healthAndSafety: {
          animated: false,
          duration: 3500,
          complete: false,
          startTime: '',
          color: teal
        },
        eventSupport: {
          animated: false,
          duration: 3500,
          complete: false,
          startTime: '',
          color: orange
        },
      }
    }
  }

  applyTrigger(waypointName){
    // get total of all previous durations for incomplete animations
    const animationsObj = this.state.animations;
    const animationsKeys = Object.keys(animationsObj);
    const animationIndex = animationsKeys.indexOf(waypointName);
    let delay = 0;
    animationsKeys.forEach((waypoint, index) => {
      if (index < animationIndex && !this.state.animations[waypoint].complete) {
        const thisTime = new Date().getTime();
        const startTime = this.state.animations[waypoint].startTime;
        const timeDif = startTime ? (thisTime - startTime) : 0;
        delay += (this.state.animations[waypoint].duration - timeDif);
      }
    })

    setTimeout(() => {
      this.setState(prevState => ({
        animations: {
          ...prevState.animations,
          [waypointName]: {
            ...prevState.animations[waypointName],
            animated: true,
            startTime: new Date().getTime()
          }
        }
      }))
      setTimeout(() => {
        this.setState(prevState => ({
          animations: {
            ...prevState.animations,
            [waypointName]: {
              ...prevState.animations[waypointName],
              complete: true,
            }
          }
        }))
      }, this.state.animations[waypointName].duration )
    }, delay)
  }

  _handlePositionChange(waypointName, currentPosition, previousPosition){
    const waypointsArray = Object.keys(this.state.animations);
    waypointsArray.forEach((waypoint, index) => {
      if (waypointName === waypoint) {
        if((currentPosition === 'inside' || currentPosition === 'above') && !this.state.animations[waypointName].animated) {
          this.applyTrigger(waypointName);
        }
        if(currentPosition === 'inside'){
          this.setState({
            lineColor: this.state.animations[waypointName].color,
          });
        }
        if(currentPosition === 'below' && previousPosition === 'inside') {
          const waypointIndex = waypointsArray.indexOf(waypoint);
          const prevWaypoint = waypointsArray[waypointIndex - 1]
          console.log(prevWaypoint);
          this.setState({
            lineColor: this.state.animations[prevWaypoint].color,
          });
        }
      }
    })
  }

  render () {
    const {
      prismicHome: {
        data: home
      },
      advisory: {
        edges: [
          {
            node: advisory
          }
        ]
      },
      healthAndSafety: {
        edges: [
          {
            node: healthAndSafety
          }
        ]
      },
      eventSupport: {
        edges: [
          {
            node: eventSupport
          }
        ]
      },
    } = this.props.data;

    return (
      <Layout>
        <div style={{position: 'relative', display: 'flex'}}>
          <Waypoint onPositionChange={({currentPosition, previousPosition}) => {this._handlePositionChange('hero', currentPosition, previousPosition)}} scrollableAncestor={"window"} />
          <AnimatedLine runAnimation={this.state.animations.hero.animated} lineColor={this.state.lineColor} delay={0} right/>
          <Hero
            video
            poster={home.hero_video_poster.url}
            videoWebM={home.hero_video_webm.url}
            videoMp4={home.hero_video_mp4.url}
            className="homepage-hero"
          >
            <h1 className="large">{home.headline.text}</h1>
            <div className="lede">
              <div dangerouslySetInnerHTML={{__html: home.lede.html}} />
              <p>We offer a 360-degree approach to crowd management through our world-class <AniLink fade duration={.5} to={`/${advisory.uid}`} alt={advisory.data.service_name.text}>advisory</AniLink>, <AniLink fade duration={.5} to={`/${healthAndSafety.uid}`} alt={healthAndSafety.data.service_name.text}>health and safety</AniLink>, and <AniLink fade duration={.5} to={`/${eventSupport.uid}`} alt={eventSupport.data.service_name.text}>event support</AniLink> services. </p>
            </div>
          </Hero>
        </div>
        <section id="content">
          <div style={{position: 'relative'}}>
            <Waypoint onPositionChange={({currentPosition, previousPosition}) => {this._handlePositionChange('advisory', currentPosition, previousPosition)}} scrollableAncestor={"window"} />          
            <AnimatedSVG runAnimation={this.state.animations.advisory.animated} lineColor={this.state.lineColor} >
              <AdvisorySVG />
            </AnimatedSVG>
            <AnimatedLine runAnimation={this.state.animations.advisory.animated} lineColor={this.state.lineColor} left/>
            <ServiceContent content={advisory} id="advisory-services"/>  
          </div>
          <div style={{position: 'relative'}}>
            <Waypoint onPositionChange={({currentPosition, previousPosition}) => {this._handlePositionChange('healthAndSafety', currentPosition, previousPosition)}} scrollableAncestor={"window"} />
            <AnimatedSVG runAnimation={this.state.animations.healthAndSafety.animated} lineColor={this.state.lineColor} >
              <HealthSVG />
            </AnimatedSVG>
            <AnimatedLine runAnimation={this.state.animations.healthAndSafety.animated} lineColor={this.state.lineColor} right/>
            <ServiceContent content={healthAndSafety} id="health-and-safety-services"/>
          </div>
          <div style={{position: 'relative'}}>
            <Waypoint onPositionChange={({currentPosition, previousPosition}) => {this._handlePositionChange('eventSupport', currentPosition, previousPosition)}} scrollableAncestor={"window"} />
            <AnimatedSVG runAnimation={this.state.animations.eventSupport.animated} lineColor={this.state.lineColor} >
              <EventSVG />
            </AnimatedSVG>
            <AnimatedLine runAnimation={this.state.animations.eventSupport.animated} lineColor={this.state.lineColor} left/>
            <ServiceContent content={eventSupport} id="event-support-services" />
          </div>
          <ContactSection />
        </section>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    prismicHome {
      data {
        headline {
          text
        }
        lede {
          html
        }
        hero_video_poster {
          url
        }
        hero_video_webm {
          url
        }
        hero_video_mp4 {
          url
        }
      }
    }
    advisory: allPrismicServicePage(
      filter: {uid: {eq: "advisory-services"}}
    ) {
      edges {
        ...ServicePageFragment
      }
    }
    healthAndSafety: allPrismicServicePage(
      filter: {uid: {eq: "health-and-safety-services"}}
    ) {
      edges {
        ...ServicePageFragment
      }
    }
    eventSupport: allPrismicServicePage(
      filter: {uid: {eq: "event-support-services"}}
    ) {
      edges {
        ...ServicePageFragment
      }
    }
  }

  fragment ServicePageFragment on PrismicServicePageEdge {
    node {
      uid
      data {
        service_name {
          text
        }
        headline {
          text
        }
        lede {
          html
        }
      }
    }
  }
`  