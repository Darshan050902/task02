import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'
import { InfScroll } from './components/InfScroll';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  let container = useRef(null);
  const [pageHeight, setPageHeight] = useState();
  
  const fetchData = async() =>{
    try {
      const response = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=40`);
      const res = response.data
      setData((prev)=>res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[page])

  useEffect(()=>{
    setPageHeight(container.current.clientHeight);
  })

  // console.log(container.current.style.cssText.split(" ")[1].slice(0, container.current.style.cssText.split(" ")[1].length-1));
  return (
    <div style={{height:'100vh'}} ref={container}>
      <InfScroll
        dataLength={data.length}
        next={()=>setPage((prev)=>prev+1)}
        hasMore={data.length?true:false}
        loader={<h1>Loading...</h1>}
        endMessage={<h1>Reached the end of the page!</h1>}
        parentMaxHeight = {pageHeight}
      >
        {
          data?.map((val, id)=>{
            return <h4 key={val.id}>{val.name}</h4>
          })
        }
      </InfScroll>
    </div>  
  );
}

export default App;
