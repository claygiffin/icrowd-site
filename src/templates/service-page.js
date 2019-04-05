import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default class ServicePageTemplate extends React.Component {
  render(){

    const {
      prismicServicePage: {
        data: service
      },
    } = this.props.data

    return(
      <Layout 
        title={`${service.service_name.text} | iCrowd`}
        description={service.lede.text}
        bodyClass="service-page"
      >
        <Hero
          image
          imgSrc={service.hero.url}
          imgAlt={service.hero.alt}
        >
          <h1>{service.headline.text}</h1>
          <div dangerouslySetInnerHTML={{__html: service.lede.html}} className="lede" />
        </Hero>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query ServicePageQuery($uid: String!) {
    prismicServicePage(uid: { eq: $uid }) {
      data {
        service_name {
          text
        }
        headline {
          text
        }
        lede {
          html
          text
        }
        hero {
          alt
          url
        }
      }
    }
  }
`