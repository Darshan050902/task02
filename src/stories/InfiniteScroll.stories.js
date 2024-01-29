import { InfScroll } from "../components/InfScroll";
import Test from "../components/Test";
import axios from "axios";

import '../../src/App.css'
import { Loading } from "../components/Loading";
import { End } from "../components/End";

const fetchData = async(startInd, length) =>{
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${startInd}&_limit=${length}`)
      const res = response.data
      // if(res[1].id === 13)throw new Error("Error")
      return res
    } catch (error) {
      console.error(error);
    }
  }


export default{
    title:"Infinite Scroll",
    component: InfScroll,
    // argTypes:{next : {action : 'next'}}
}

const Template = args =><InfScroll {...args} />

export const HasPullDownToRefresh = Template.bind({});
HasPullDownToRefresh.args={
    style:{overflowY: 'scroll', maxHeight:`100vh`, width:'100%', position:'absolute', left:'0', right:'0', marginLeft:'auto', marginRight:'auto'},
    displayElement:(data)=><Test data={data}/>,
    next:fetchData,
    threshold:75,
    dataLength:10,
    loadingDelay:1,
    loader:<Loading />,
    endMessage:<End />,
    hasPullDownToRefresh:true
}

export const HasNoPullDownToRefreshRefresh = Template.bind({});
HasNoPullDownToRefreshRefresh.args={
    style:{overflowY: 'scroll', maxHeight:`100vh`, width:'100%', position:'absolute', left:'0', right:'0', marginLeft:'auto', marginRight:'auto'},
    displayElement:(data)=><Test data={data}/>,
    next:fetchData,
    threshold:75,
    dataLength:10,
    loadingDelay:1,
    loader:<Loading />,
    endMessage:<End />,
    hasPullDownToRefresh:false
}

export const StyledComponent = Template.bind({});
StyledComponent.args = {
    style:{overflowY: 'scroll', maxHeight:`100vh`, backgroundColor:'red', color:'blue', borderRadius:'5px', width:'100%', position:'absolute', left:'0', right:'0', marginLeft:'auto', marginRight:'auto'},
    displayElement:(data)=><Test data={data}/>,
    next:fetchData,
    threshold:75,
    dataLength:10,
    loadingDelay:1,
    loader:<Loading />,
    endMessage:<End />,
    hasPullDownToRefresh:true
}