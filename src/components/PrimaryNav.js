import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import './PrimaryNav.scss'
import logo from '../assets/icrowd_logo_knockout.svg'
import ContactFormLink from './ContactFormLink'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

class PrimaryNav extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      dropdownOpen: false,
    }

    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleDropdown(){
    this.state.dropdownOpen ? this.setState({dropdownOpen: false}) : this.setState({dropdownOpen: true});
  }

  render(){
    return(
      <StaticQuery
        query={graphql`
          query NavQuery {
            services: allPrismicServicePage {
              edges {
                node {
                  uid
                  data {
                    service_name {
                      text
                    }
                  }
                }
              }
            }
            advisory: allPrismicServicePage(
              filter: {uid: {eq: "advisory-services"}}
            ) {
              edges {
                ...ServiceFragmentNav
              }
            }
            healthAndSafety: allPrismicServicePage(
              filter: {uid: {eq: "health-and-safety-services"}}
            ) {
              edges {
                ...ServiceFragmentNav
              }
            }
            eventSupport: allPrismicServicePage(
              filter: {uid: {eq: "event-support-services"}}
            ) {
              edges {
                ...ServiceFragmentNav
              }
            }
          }
          fragment ServiceFragmentNav on PrismicServicePageEdge {
            node {
              uid
              data {
                service_name {
                  text
                }
              }
            }
          }
        `}
        render={data => {
          const {
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
            }
          } = data
          return(
            <nav id="primary-nav">
              <AniLink fade duration={.5} to="/" id="nav-logo" >
                <img src={logo} alt="iCrowd logo" />
              </AniLink>
              <ul id="nav-items" >
                  <li><AniLink fade duration={.5} to="/about" activeClassName="active"><span className="page-title">About Us</span></AniLink></li>
                  <li>
                    <div className={`dropdown-button ${this.state.dropdownOpen ? 'open' : ''}`} onClick={this.handleDropdown}>
                      <span className="dropdown-title">Services</span>
                      <span className="arrow" />
                    </div>
                    <ul className={`dropdown ${this.state.dropdownOpen ? 'open' : ''}`} >
                      <li><AniLink fade duration={.5} to={`/${advisory.uid}`} activeClassName="active">{advisory.data.service_name.text}</AniLink></li>
                      <li><AniLink fade duration={.5} to={`/${healthAndSafety.uid}`} activeClassName="active">{healthAndSafety.data.service_name.text}</AniLink></li>
                      <li><AniLink fade duration={.5} to={`/${eventSupport.uid}`} activeClassName="active">{eventSupport.data.service_name.text}</AniLink></li>
                    </ul>
                    {/* {data.services.edges.map(edge =>  <Link key={edge.node.uid} to={`/${edge.node.uid}`}>{edge.node.data.service_name.text}</Link> )} */}
                  </li>
                  <li className="contact">
                    <ContactFormLink linkText="Work With Us" />
                  </li>
              </ul>  
            </nav>
          )
        }}
      />
    )
  }
}

export default PrimaryNav