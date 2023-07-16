import React from 'react'

const Error = ({children, className}) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export default Error