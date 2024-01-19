import React, { useEffect, useState } from 'react'

export const InfScroll = ({next, loader, endMessage, parentMaxHeight, displayElement}) => {
    const [array, setArray]=useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [endFlag, setEndFlag] = useState(false);

    const handleScroll = (e) =>{
        // console.log(e.target.scrollHeight+" "+e.target.scrollTop+" "+e.target.clientHeight);
        if((e.target.scrollTop + e.target.clientHeight>=e.target.scrollHeight - 10) && !loading  && !endFlag){
          newAPiCall();
        }
    }

    const newAPiCall = async() =>{
      setLoading(true);
      try {
        const response = await next(page);
        if(response.length===0){
          setEndFlag(true);
        }else{
          setArray((prev)=>[...prev, ...response]);
          setPage((prev)=>prev+1);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      // console.log("hi");
        newAPiCall();
    },[])


  return (
    <div onScroll={handleScroll} style={{overflowY: 'scroll', maxHeight:`${parentMaxHeight}px`}} >
        {displayElement(array)}
        {loading&&!endFlag?((loader?loader:<h4>default loader...</h4>)):(endFlag?(endMessage?endMessage:<h4>default end!!</h4>):null)}
    </div>
  )
}
