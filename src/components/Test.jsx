import React from 'react'

const image_url = [
  "https://images.pexels.com/photos/15871749/pexels-photo-15871749/free-photo-of-black-and-white-photograph-of-palm-trees-and-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/16055364/pexels-photo-16055364/free-photo-of-handsome-man-in-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4714529/pexels-photo-4714529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]
const Test = ({data}) => {
  // console.log({data});
  return (
    <div className='test-container'>
        <div className="list-title">Data!</div>
        <div className="list-items">
            {
                data?.map((value, ind)=>{
                    return <div key={value.id} className='list-item'>
                      <div className="item-image"><img src={image_url[ind%image_url.length]} alt="item image" /></div>
                      <div className="item-body">
                        <div className="item-desc">
                          <p>{value.title}</p>
                          {/* <p style={{color:'gray'}}>First brewed : {value.first_brewed}</p> */}
                        </div>
                        <div className='item-attenuation_level'>
                          <p style={{fontWeight:'bold'}}>{value.userId}</p>
                        </div>
                      </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Test