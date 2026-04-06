import { faBookBible, faGears } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const FontAwesomeComponent = () => {
  return (
      <div className='icon__items'>
      <FontAwesomeIcon  icon={faBookBible} />
      <FontAwesomeIcon  icon={faGears} />
      <FontAwesomeIcon  icon={faPhone} />
      </div>
  );
  
}

export default FontAwesomeComponent