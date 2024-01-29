// import { InfScroll } from "../components/InfScroll";
import EfficientInfiniteScroll from "../components/EfficientInfiniteScroll";
import Test from "../components/Test";
import axios from "axios";

import '../../src/App.css'
import { Loading } from "../components/Loading";
import { End } from "../components/End";

const fetchData = async(startInd, length) =>{
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${startInd}&_limit=${length}`)
      // if(res[1].id === 13)throw new Error("Error")
      return response
    } catch (error) {
      console.error(error);
    }
  }


export default{
    title:"Infinite Scroll",
    component: EfficientInfiniteScroll,
    // argTypes:{next : {action : 'next'}}
}

let style = {
    color:'red',
    backgroundColor:'black'
  }

const Template = args =><EfficientInfiniteScroll {...args} />

export const HasPullDownToRefresh = Template.bind({});
HasPullDownToRefresh.args={
    dataLength:10, next:fetchData, displayElement:(data)=><Test data={data}/>, loader:<Loading />,  endComponent:<End />, hasPullDownToRefresh:true
}

export const HasNoPullDownToRefreshRefresh = Template.bind({});
HasNoPullDownToRefreshRefresh.args={
    dataLength:10, next:fetchData, displayElement:(data)=><Test data={data}/>, loader:<Loading />,  endComponent:<End />, hasPullDownToRefresh:false
}

export const StyledComponent = Template.bind({});
StyledComponent.args = {
    dataLength:10, next:fetchData, displayElement:(data)=><Test data={data}/>, loader:<Loading />,  endComponent:<End />, hasPullDownToRefresh:true, style:style
}