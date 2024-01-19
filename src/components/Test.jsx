import React from 'react'

const Test = ({names}) => {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div className="title">Beer Names</div>
        <div className="list-items">
            {
                names?.map((name, ind)=>{
                    if(name.apiError)return <p style={{backgroundColor:'red'}}>Error loading data</p>
                    return <p>{name.id}</p>
                })
            }
        </div>
    </div>
  )
}

export default Test