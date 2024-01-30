"use strict";(self.webpackChunkmyapp=self.webpackChunkmyapp||[]).push([[954],{"./src/stories/EfficientInfiniteScroll.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HasNoPullDownToRefreshRefresh:()=>HasNoPullDownToRefreshRefresh,HasPullDownToRefresh:()=>HasPullDownToRefresh,StyledComponent:()=>StyledComponent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>EfficientInfiniteScroll_stories});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let EfficientInfiniteScroll=_ref=>{let{dataLength,next,displayElement,loader,endComponent,style,hasPullDownToRefresh}=_ref,[hasMore,setHasMore]=(0,react.useState)(!0),[items,setItems]=(0,react.useState)([]),pageRef=(0,react.useRef)(1),mouseDownRef=(0,react.useRef)(!1),[stateY,setStateY]=(0,react.useState)(null),refreshInProgressRef=(0,react.useRef)(!1),elementRef=(0,react.useRef)(null),apiCall=async()=>{try{let response=await next(pageRef.current,dataLength);0===response.data.length?setHasMore(!1):(setItems(prevItems=>[...prevItems,...response.data]),pageRef.current+=dataLength)}catch(err){console.log(err)}},onIntersect=entries=>{entries[0].isIntersecting&&hasMore&&!refreshInProgressRef.current&&(console.log(hasMore),apiCall())};return(0,react.useEffect)(()=>{let observer=new IntersectionObserver(onIntersect);return observer&&elementRef.current&&observer.observe(elementRef.current),()=>{observer&&observer.disconnect()}},[items]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[items&&(0,jsx_runtime.jsx)("div",{style:style,onMouseDown:hasPullDownToRefresh?e=>{mouseDownRef.current=!0,setStateY(e.screenY)}:null,onMouseLeave:hasPullDownToRefresh?e=>{mouseDownRef.current=!1}:null,onMouseMove:hasPullDownToRefresh?e=>{mouseDownRef.current&&0===window.scrollY&&e.screenY>=stateY&&e.screenY-stateY>=192.8&&(mouseDownRef.current=!1,pageRef.current=1,setItems([]),refreshInProgressRef.current=!0,setTimeout(()=>{apiCall(),refreshInProgressRef.current=!1},1e3),setHasMore(!0))}:null,children:displayElement(items)}),hasMore&&(loader?(0,jsx_runtime.jsx)("div",{ref:elementRef,children:loader}):(0,jsx_runtime.jsx)("div",{ref:elementRef,children:"Loading..."})),!hasMore&&(endComponent?(0,jsx_runtime.jsx)("div",{children:endComponent}):(0,jsx_runtime.jsx)("div",{children:"Reached the end of page..."}))]})};EfficientInfiniteScroll.__docgenInfo={description:"",methods:[],displayName:"EfficientInfiniteScroll"};let image_url=["https://images.pexels.com/photos/15871749/pexels-photo-15871749/free-photo-of-black-and-white-photograph-of-palm-trees-and-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","https://images.pexels.com/photos/16055364/pexels-photo-16055364/free-photo-of-handsome-man-in-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","https://images.pexels.com/photos/4714529/pexels-photo-4714529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],Test=_ref=>{let{data,invisibleHeight}=_ref;return(0,jsx_runtime.jsxs)("div",{className:"test-container",children:[(0,jsx_runtime.jsx)("div",{className:"list-title",children:"Data!"}),(0,jsx_runtime.jsx)("div",{className:"list-items",style:{overflow:"hidden"},children:null==data?void 0:data.map((value,ind)=>(0,jsx_runtime.jsxs)("div",{className:"list-item",children:[(0,jsx_runtime.jsx)("div",{className:"item-image",children:(0,jsx_runtime.jsx)("img",{src:image_url[ind%image_url.length],alt:"item image"})}),(0,jsx_runtime.jsxs)("div",{className:"item-body",children:[(0,jsx_runtime.jsx)("div",{className:"item-desc",children:(0,jsx_runtime.jsx)("p",{children:null==value?void 0:value.title})}),(0,jsx_runtime.jsx)("div",{className:"item-attenuation_level",children:(0,jsx_runtime.jsx)("p",{style:{fontWeight:"bold"},children:null==value?void 0:value.userId})})]})]},null==value?void 0:value.id))})]})};Test.__docgenInfo={description:"",methods:[],displayName:"Test"};var axios=__webpack_require__("./node_modules/axios/lib/axios.js");let Loading=()=>(0,jsx_runtime.jsx)("div",{className:"load"});Loading.__docgenInfo={description:"",methods:[],displayName:"Loading"};let End=()=>(0,jsx_runtime.jsx)("h1",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:"End!!"});End.__docgenInfo={description:"",methods:[],displayName:"End"};let fetchData=async(startInd,length)=>{try{return await axios.Z.get("https://jsonplaceholder.typicode.com/posts?_start=".concat(startInd,"&_limit=").concat(length))}catch(error){console.error(error)}},EfficientInfiniteScroll_stories={title:"Infinite Scroll",component:EfficientInfiniteScroll},Template=args=>(0,jsx_runtime.jsx)(EfficientInfiniteScroll,{...args}),HasPullDownToRefresh=Template.bind({});HasPullDownToRefresh.args={dataLength:10,next:fetchData,displayElement:data=>(0,jsx_runtime.jsx)(Test,{data:data}),loader:(0,jsx_runtime.jsx)(Loading,{}),endComponent:(0,jsx_runtime.jsx)(End,{}),hasPullDownToRefresh:!0};let HasNoPullDownToRefreshRefresh=Template.bind({});HasNoPullDownToRefreshRefresh.args={dataLength:10,next:fetchData,displayElement:data=>(0,jsx_runtime.jsx)(Test,{data:data}),loader:(0,jsx_runtime.jsx)(Loading,{}),endComponent:(0,jsx_runtime.jsx)(End,{}),hasPullDownToRefresh:!1};let StyledComponent=Template.bind({});StyledComponent.args={dataLength:10,next:fetchData,displayElement:data=>(0,jsx_runtime.jsx)(Test,{data:data}),loader:(0,jsx_runtime.jsx)(Loading,{}),endComponent:(0,jsx_runtime.jsx)(End,{}),hasPullDownToRefresh:!0,style:{color:"red",backgroundColor:"black"}},HasPullDownToRefresh.parameters={...HasPullDownToRefresh.parameters,docs:{...HasPullDownToRefresh.parameters?.docs,source:{originalSource:"args => <EfficientInfiniteScroll {...args} />",...HasPullDownToRefresh.parameters?.docs?.source}}},HasNoPullDownToRefreshRefresh.parameters={...HasNoPullDownToRefreshRefresh.parameters,docs:{...HasNoPullDownToRefreshRefresh.parameters?.docs,source:{originalSource:"args => <EfficientInfiniteScroll {...args} />",...HasNoPullDownToRefreshRefresh.parameters?.docs?.source}}},StyledComponent.parameters={...StyledComponent.parameters,docs:{...StyledComponent.parameters?.docs,source:{originalSource:"args => <EfficientInfiniteScroll {...args} />",...StyledComponent.parameters?.docs?.source}}};let __namedExportsOrder=["HasPullDownToRefresh","HasNoPullDownToRefreshRefresh","StyledComponent"]}}]);