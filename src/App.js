import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'
import { InfScroll } from './components/InfScroll';
import Test from './components/Test';
import { Loading } from './components/Loading';
import { End } from './components/End';
import { Error } from './components/Error';

function App() {
  let container = useRef(null);
  const [pageHeight, setPageHeight] = useState();
  
  const fetchData = async(page) =>{
    try {
      const response = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=30`);
      const res = response.data
      // if(res[19].id === 50)throw new Error("Error")
      return res
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(()=>{
  //   fetchData();
  // },[page])

  useEffect(()=>{
    setPageHeight(container.current.clientHeight);
  })

  // console.log(container.current.style.cssText.split(" ")[1].slice(0, container.current.style.cssText.split(" ")[1].length-1));
  return (
    <div style={{height:'100vh'}} ref={container}>
      <InfScroll
        next={fetchData}
        loader={<Loading />}
        endMessage={<End />}
        errorMessage={<Error />}
        parentMaxHeight = {pageHeight}
        displayElement = {(data)=><Test data={data}/>}
        threshold={150}
      />
    </div>  
  );
}

export default App;
