import React from 'react'

const ScrollTopButton = ({flag}) => {
  const handleClick = () =>{
    return flag(true);
  }
  return (
    <span className='scrollToTop-button' onClick={handleClick}>&#8593;</span>
  )
}

export default ScrollTopButton