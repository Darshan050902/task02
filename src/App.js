import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'
import { InfScroll } from './components/InfScroll';
import Test from './components/Test';
import { Loading } from './components/Loading';
import { End } from './components/End';
import { Error } from './components/Error';
import EfficientInfiniteScroll from './components/EfficientInfiniteScroll';
import ScrollTopButton from './components/ScrollTopButton';

function App() {
  let container = useRef(null);
  const [pageHeight, setPageHeight] = useState();
  
  const fetchData = async(startInd, length) =>{
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${startInd}&_limit=${length}`)
      // if(response.data[1].id === 13)throw new Error("Error")
      return response
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    setPageHeight(container.current.clientHeight);
  })

  let style = {
    color:'red',
    // backgroundColor:'black'
  }
  
  return (
    <div style={{height:'100vh'}} ref={container}>
      {/* <InfScroll
        next={fetchData}
        loader={<Loading />}
        endMessage={<End />}
        errorMessage={<Error />}
        parentMaxHeight = {pageHeight}
        displayElement = {(data)=><Test data={data}/>}
        threshold={30}
        dataLength={10}
        loadingDelay={1}
        style={style}
        hasPullDownToRefresh={true}
      /> */}
      <EfficientInfiniteScroll dataLength={10} next={fetchData} loadingDelay={2000} displayElement = {(data)=><Test data={data}/>} errorComponent={<Error />} loader={<Loading />} endComponent={<End />} style={style} hasPullDownToRefresh={true} hasScrollTopTopOption={true} scrollToTopComponent={(data)=><ScrollTopButton flag={data}/>}/>
    </div>
  );
}

export default App;
