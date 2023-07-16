import React from 'react'

const Message = ({children, className}) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export default Message