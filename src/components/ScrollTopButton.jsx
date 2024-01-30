import React from 'react'

const ScrollTopButton = ({flag}) => {
    console.log(flag);
  return (
    <span className='scrollToTop-button' onClick={()=>{return flag(true)}}>&#8593;</span>
  )
}

export default ScrollTopButton