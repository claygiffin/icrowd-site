import React from 'react'
import './AnimatedLine.scss'

const AnimatedLine = ({lineColor, runAnimation, delay, duration, left, right}) => {
  return(
    <div 
      className={`
        animated-line 
        ${right ? 'right' : ''}${left ? 'left' : ''} 
        ${runAnimation ? 'animated' : ''}
      `} 
      style={{
        transitionDelay: delay + 'ms',
        transitionDuration: duration + 'ms'
      }}
    >
      <span 
        className={`fill`} 
        style={{backgroundColor: lineColor}}
      />
    </div>
  )
}

AnimatedLine.defaultProps = {
  lineColor: 'transparent',
  delay: 1500,
  duration: 2000,
}


export default AnimatedLine