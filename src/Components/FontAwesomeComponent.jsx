import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const FontAwesomeComponent = () => {
  return (
    <FontAwesomeIcon icon={faCoffee} />
  )
}

export default FontAwesomeComponent