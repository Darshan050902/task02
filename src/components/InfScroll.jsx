import React, { useEffect, useState } from 'react'

export const InfScroll = ({dataLength, next, hasMore, loader, endMessage, parentMaxHeight, children}) => {
    const [array, setArray]=useState(children);
    const [nextCallFlag, setNextCallFlag] = useState(false);
    const [reachedEndCount, setReachedEndCount] = useState(0);
    const handleScroll = (e) =>{
        // console.log(e.target.scrollHeight+" "+e.target.scrollTop+" "+e.target.clientHeight);
        if(e.target.scrollHeight-e.target.scrollTop === e.target.clientHeight){
            setNextCallFlag(!nextCallFlag);
            if(hasMore)setArray((prev)=>[...prev, ...children]);
            else{
                if(!reachedEndCount)setArray((prev)=>[...prev, endMessage]);
                setReachedEndCount((prev)=>prev+1);
            }
        }
    }
    console.log(parentMaxHeight);
    useEffect(()=>{
        next();
    },[nextCallFlag])
    console.log(parentMaxHeight);

  return (
    <div onScroll={handleScroll} style={{overflowY: 'scroll', maxHeight:`${parentMaxHeight}px`}} >
        {dataLength?(array.length>0?array:children):(hasMore?loader:array)}
    </div>
  )
}
