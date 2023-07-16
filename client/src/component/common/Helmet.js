import React from 'react'

const Helmet = ({children, title, className}) => {
    document.title = title
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export default Helmet