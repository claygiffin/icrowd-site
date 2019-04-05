import React from 'react'
import Helmet from 'react-helmet'
import PrimaryNav from './PrimaryNav'
import GlobalFooter from './GlobalFooter'
import './all.scss'

const Layout = ({title, bodyClass, description, children}) => (
  <>
    <Helmet 
      title={title || `iCrowd | Intelligent Crowd Solutions`} 
      bodyAttributes={{
        class: bodyClass
      }}
    >
      <html lang="en" /> 
      <meta name="description" content={description || `At iCrowd, we take pride in transforming events into well-managed experiences through planning, technology, and innovative thinking. We offer a 360-degree approach to crowd management through our world-class advisory, health and safety, and event support services.` } />
    </Helmet>
    <PrimaryNav />
    <main>
      {children}
    </main>
    <GlobalFooter />
  </>
)

export default Layout