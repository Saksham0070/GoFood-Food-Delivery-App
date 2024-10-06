import React, { useEffect, useRef, useState } from 'react'
import {useDispatchCart,useCart} from './ContextReducer';

const Card = (props) => {

  
  const optionlots = props.options[0];
  console.log(optionlots)
  // Check if optionlots is not null or undefined before using Object.keys
  const priceOptions = Object.keys(optionlots);
  console.log(priceOptions)
  
  let foodItem = props.foodItem;
  const priceRef = useRef();
  let data = useCart(); 
  let dispatch = useDispatchCart();
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");

  const handleAddToCart = async()=>{
    let food=[]
    for(const item of data){
      if(item.id===foodItem._id){
        food=item;
        break;
      }
    }
    if(food.size !== []){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:foodItem._id,price:finalPrice,qty:qty});
        return
      }else if(food.size!==size){
        await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size,img:foodItem.img})
        return
      }
      return
    }
    await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size,img:foodItem.img})
    console.log(data)
  }

  let finalPrice = size ? qty * parseInt(optionlots[size]) : 0;
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"200px",objectFit:"fill"}} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          {/* <p className="card-text">
            Tasty and Happy Meal
          </p> */}
          <div className="container w-100">
            <select className="m-2 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 bg-success rounded"ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-5">
              Total Price {finalPrice}
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}> Add to Cart</button>
          
        </div>
      </div>
    </div>
  )
}

export default Card
