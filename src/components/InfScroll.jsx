import React, { useEffect, useRef, useState } from 'react'

export const InfScroll = ({next, loader, endMessage, errorMessage, parentMaxHeight, displayElement, threshold, dataLength, loadingDelay, style, className}) => {
    const [array, setArray]=useState([]);
    const pageRef = useRef(1);
    const [loading, setLoading] = useState(false);
    const [endFlag, setEndFlag] = useState(false);
    const [error, setError] = useState(false);
    const [startY, setStartY] = useState(null);
    const [isAtTop, setIsAtTop] = useState(true)
    const mouseDownFlag = useRef(false);
    let styleObj = useRef({overflowY: 'scroll', maxHeight:`${parentMaxHeight?parentMaxHeight:'100'}vh`, ...style})

    const handleScroll = (e) =>{
        if(threshold>100)threshold=100;
        if(threshold<0)threshold=0;
        if(e.target.scrollTop===0)setIsAtTop(true);
        else setIsAtTop(false);
        if((e.target.scrollTop + e.target.clientHeight>=((threshold/100)*(e.target.scrollHeight))) && !loading  && !endFlag){
            debouncedApiCall()
        }
    }

    const newAPiCall = async() =>{
      setLoading(true)
      try {
        const response = await next(pageRef.current, dataLength);
        if(!response){
          setError(true)
        }else if(response.length===0){
          setEndFlag(true);
          setError(false);
        }else{
          setArray((prev)=>[...prev, ...response]);
          pageRef.current = pageRef.current + dataLength;
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    const myDebounce = (func, delay) =>{
      let timer;
      return function(...args){
        const context = this;
        if(timer)clearTimeout(timer)
        setLoading(true);
        timer = setTimeout(()=>{
          timer = null;
          func.apply(context, args);
        },delay)
      }
    }

    const debouncedApiCall = myDebounce(newAPiCall, loadingDelay*1000);

    useEffect(()=>{
      newAPiCall();
    },[])
    // let mini=1000000000;  // 115
    // let maxi = 0  // 1079 -> 964
    const handleMouseDown = (e) =>{
      mouseDownFlag.current = true ;
      setStartY(e.screenY);
    }

    const handleMouseLeave = (e) =>{
      mouseDownFlag.current = false;
    }
    
    const handleMouseMove = (e) =>{
      if(mouseDownFlag.current){
        if(isAtTop)
        {
          if(e.screenY >= startY && (e.screenY - startY)>= (10/100)*964){
            window.location.reload();
          }
        }
      }
    }

  return (
    <div className={className} onScroll={handleScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={styleObj.current} >
      {displayElement(array)}
      {error?(errorMessage?errorMessage:alert("api error")):null}
      {!isAtTop && loading&&!endFlag&&!error?((loader?loader:<h4>default loader...</h4>)):(endFlag?(endMessage?endMessage:<h4>default end!!</h4>):null)}
    </div>
  )
}