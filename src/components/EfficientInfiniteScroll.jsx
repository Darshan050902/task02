import React, { useEffect, useRef, useState } from 'react'

const EfficientInfiniteScroll = ({
    dataLength,
    next,
    displayElement,
    loader,
    endComponent,
    style,
    hasPullDownToRefresh,
    hasScrollTopTopOption,
    scrollToTopComponent,
    errorComponent,
    loadingDelay
}) => {
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState([]);
    const pageRef = useRef(1);
    const mouseDownRef = useRef(false);
    const [stateY, setStateY] = useState(null)
    const refreshInProgressRef = useRef(false);
    const [takeToTop, setTakeToTop] = useState(false);
    const elementRef = useRef(null);
    const [apiError, setApiError] = useState(false);

    const apiCall = async() =>{
        try{
            const response = await next(pageRef.current, dataLength)
            if(response.data.length===0){
                setHasMore(false);
            }else{
                setItems((prevItems)=>[...prevItems, ...response.data])
                pageRef.current += dataLength;
            }
        }catch(err){
            console.log(err);
            setApiError(true);
        }
    }

    const myDebounce = (func, delay) =>{
        let timer;
        return function(...args){
          const context = this;
          if(timer)clearTimeout(timer)
          timer = setTimeout(()=>{
            timer = null;
            func.apply(context, args);
          },delay)
        }
      }

    const debouncedApiCall = myDebounce(apiCall, loadingDelay);

    const onIntersect = (entries) =>{
        const firstEntry = entries[0];
        if(firstEntry.isIntersecting && hasMore && !refreshInProgressRef.current)
        {
            debouncedApiCall()
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
        mouseDownRef.current = true
        setStateY(e.screenY);
    }

    const handleMouseLeave = (e) =>{
        mouseDownRef.current = false;
    }

    const handleMouseMove = (e) =>{
        if(mouseDownRef.current && window.scrollY===0)
        {
            if(e.screenY >= stateY && (e.screenY - stateY)>= (20/100)*964)      // let mini=1000000000;  // 115  
                                                                                // let maxi = 0  // 1079 -> 964 (used to trigger the reload page)
            {
                mouseDownRef.current = false;
                pageRef.current = 1;
                setItems([]);
                refreshInProgressRef.current = true;
                setTimeout(()=>{
                    apiCall()
                    refreshInProgressRef.current = false;
                },1000)
                setHasMore(true);
            }
        }
    }

    useEffect(()=>{
        if(takeToTop){
            window.scrollTo({top: 0, behavior: 'smooth'})
            setTakeToTop(false);
        }
    },[takeToTop])

  return (
    <>
        {hasScrollTopTopOption && items.length>0 && scrollToTopComponent(setTakeToTop)}
        {
            items && <div style={style} onMouseDown={hasPullDownToRefresh?handleMouseDown:null} onMouseLeave={hasPullDownToRefresh?handleMouseLeave:null} onMouseMove={hasPullDownToRefresh?handleMouseMove:null}>
                {displayElement(items)}
                {apiError && errorComponent}
            </div>
        }
        {hasMore  && !apiError && (loader? <div ref={elementRef}>{loader}</div> : <div ref={elementRef}>Loading...</div>)}
        {!hasMore && !apiError && (endComponent?<div>{endComponent}</div> : <div>Reached the end of page...</div>)}
    </>
  )
}

export default EfficientInfiniteScroll