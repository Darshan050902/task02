import React, { useEffect, useRef, useState } from 'react'

export const InfScroll = ({next, loader, endMessage, errorMessage, parentMaxHeight, displayElement, threshold, dataLength, loadingDelay, style, className}) => {
    const [array, setArray]=useState([]);  // to map the updated data from the api
    const pageRef = useRef(1);  // a pointer to fetch required amount of data from the api according to threshold provided by the user
    const [loading, setLoading] = useState(false);
    const [endFlag, setEndFlag] = useState(false);   // to check if the user has reached the end of the container
    const [error, setError] = useState(false);
    const [startY, setStartY] = useState(null);   
    const [isAtTop, setIsAtTop] = useState(true)   // to check if scroll is on top (used in pull to refresh feature)
    const mouseDownFlag = useRef(false);   // to check if the user cursor is down for the movement
    let defaultStyleRef = useRef({overflowY: 'scroll', maxHeight:`${parentMaxHeight?parentMaxHeight:'100'}vh`, width:'100%', position:'absolute', left:'0', right:'0', marginLeft:'auto', marginRight:'auto',  ...style})   // update the default style object with the user provided object
    const [refreshLoading, setRefreshLoading] = useState(false);   // to handle refresh loading component to render
    const [refresh, setRefresh] = useState(false);

    const handleScroll = (e) =>{
        // handle thr invalid threshold value
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
        if(refreshLoading)setRefreshLoading(false);
        let obj = {top:`0px`, height:'100vh'}
        defaultStyleRef.current = {...defaultStyleRef.current, ...obj}
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
    },[refresh])
    // let mini=1000000000;  // 115  
    // let maxi = 0  // 1079 -> 964 (used to trigger the reload page)

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
          if(e.screenY >= startY && (e.screenY - startY)>= (20/100)*964){  // 10% assumed 
            mouseDownFlag.current = false;
            pageRef.current = 1;
            setArray([]);
            setTimeout(()=>{
              newAPiCall();
            },1000)
          }else{
            let obj = {top:`${e.screenY - startY}px`, height:'98vh'}
            defaultStyleRef.current = {...defaultStyleRef.current, ...obj}
            setRefreshLoading(true);
          }
        }
      }
    }

  return (
    <>
      {isAtTop && refreshLoading && !endFlag && !error?(<div style={{paddingTop:'3rem'}}>
        {loader?loader:<h4>default loader...</h4>}
      </div>):null}
    <div onScroll={handleScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={!refreshLoading?defaultStyleRef.current:null} >
      {array?displayElement(array):<h4>No Data</h4>}
      {error?(errorMessage?errorMessage:alert("api error")):null}
      {!isAtTop && loading&&!endFlag&&!error?((loader?loader:<h4>default loader...</h4>)):(endFlag?(endMessage?endMessage:<h4>default end!!</h4>):null)}
    </div>
    </>
  )
}