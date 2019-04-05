import React from 'react'
import './AnimatedSVG.scss'

const AnimatedSVG = ({children, lineColor, runAnimation}) => {
  return(
    <div 
      className={`
        animated-svg 
        ${runAnimation ? 'animated' : ''}
      `} 
      style={{
        stroke: lineColor,
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedSVG