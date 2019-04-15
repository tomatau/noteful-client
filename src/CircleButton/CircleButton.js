import React from 'react'
import './CircleButton.css'
import PropTypes from "prop-types"

export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
