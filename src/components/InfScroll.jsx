import React, { useEffect, useRef, useState } from 'react'

export const InfScroll = ({next, loader, endMessage, errorMessage, parentMaxHeight, displayElement, threshold}) => {
    const [array, setArray]=useState([]);
    // const [page, setPage] = useState(1);
    const pageRef = useRef(1);
    const [loading, setLoading] = useState(false);
    const [endFlag, setEndFlag] = useState(false);
    const [error, setError] = useState(false);

    const handleScroll = (e) =>{
        // console.log(e.target.scrollHeight+" "+e.target.scrollTop+" "+e.target.clientHeight);
        if(threshold>100)threshold=100;
        if(threshold<0)threshold=0;
        if((e.target.scrollTop + e.target.clientHeight>=((threshold/100)*(e.target.scrollHeight))) && !loading  && !endFlag){
            // newAPiCall();
            debouncedApiCall()
        }
    }

    const newAPiCall = async() =>{
      setLoading(true)
      try {
        const response = await next(pageRef.current);
        if(!response){
          setError(true)
        }else if(response.length===0){
          setEndFlag(true);
          setError(false);
        }else{
          setArray((prev)=>[...prev, ...response]);
          // setPage((prev)=>prev+1);
          pageRef.current = pageRef.current + 1;
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    const myDebounce = (func) =>{
      let timer;
      return function(...args){
        const context = this;
        if(timer)clearTimeout(timer)
        setLoading(true);
        timer = setTimeout(()=>{
          timer = null;
          func.apply(context, args);
        },5000)
      }
    }

    const debouncedApiCall = myDebounce(newAPiCall);

    useEffect(()=>{
      // console.log("hi");
          newAPiCall();
    },[])
    // console.log(pageRef.current);

  return (
    <div onScroll={handleScroll} style={{overflowY: 'scroll', maxHeight:`${parentMaxHeight?parentMaxHeight:'800'}px`}} >
        {displayElement(array)}
        {error?(errorMessage?errorMessage:alert("api error")):null}
        {loading&&!endFlag?((loader?loader:<h4>default loader...</h4>)):(endFlag?(endMessage?endMessage:<h4>default end!!</h4>):null)}
    </div>
  )
}
