import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import ContactFormLink from './ContactFormLink'

const ContactSection = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        prismicWorkWithUs {
          data {
            on_page_headline {
              text
            }
            on_page_link_text {
              text
            }
          }
        }
      }
    `}
    render={data => {
      const {
        prismicWorkWithUs:  {
          data: contact
        }
      } = data
      return(
        <>
          <section id="work-with-us">
            <h2>{contact.on_page_headline.text}</h2>
            <ContactFormLink linkText={contact.on_page_link_text.text} />
          </section>
        </>
      )
    }}
  />
)

export default ContactSection