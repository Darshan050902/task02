import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const EfficientInfiniteScroll = ({
    dataLength,
    next,
    displayElement,
    loader,
    endComponent,
    style
}) => {
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState([]);
    const pageRef = useRef(1);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [stateY, setStateY] = useState(null)

    const elementRef = useRef(null);

    const apiCall = async() =>{
        try{
            const response = await next(pageRef.current, dataLength)
            if(response.data.length===0){
                setHasMore(false);
            }else{
                setItems((prevItems)=>[...prevItems, ...response.data])
                // setPage((prev)=>prev+dataLength);
                pageRef.current += dataLength;
            }
        }catch(err){
            console.log(err);
        }
    }

    const onIntersect = (entries) =>{
        const firstEntry = entries[0];
        if(firstEntry.isIntersecting && hasMore)
        {
            apiCall();
        }
    }

    useEffect(()=>{
        const observer = new IntersectionObserver(onIntersect);
        if(observer && elementRef.current)
        {
            observer.observe(elementRef.current)
        }

        return ()=>{
            if(observer)observer.disconnect();
        }
    }, [items]);

    const handleMouseDown = (e) =>{
        setIsMouseDown(true);
        setStateY(e.screenY);
    }

    const handleMouseLeave = (e) =>{
        setIsMouseDown(false);
    }

    const handleMouseMove = (e) =>{
        if(isMouseDown)
        {
            if(e.screenY >= stateY && (e.screenY - stateY)>= (20/100)*964)      // let mini=1000000000;  // 115  
                                                                                // let maxi = 0  // 1079 -> 964 (used to trigger the reload page)
            {
                setIsMouseDown(false);
                pageRef.current = 1;
                setItems([]);
            }
        }
    }
  return (
    <>
    {
        items && <div style={style} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
            {displayElement(items)}
        </div>
    }
    {hasMore && (loader? <div ref={elementRef}>{loader}</div> : <div ref={elementRef}>Loading...</div>)}
    {!hasMore && (endComponent?<div>{endComponent}</div> : <div>Reached the end of page...</div>)}
    </>
  )
}

export default EfficientInfiniteScroll