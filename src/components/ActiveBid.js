import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Buffer} from 'buffer'

export function ActiveBid({product,sendEmailToWinner,handleBid,calculateRemainingTime}){
  const [imageStream,setImageStream] =useState(null)
  const [remainingTime,setRemainingTime] = useState('');

  useEffect(()=>{
    (async ()=>{const imageResponse =  await fetch(`https://bidwiser.onrender.com/api/images/${product.imageUrl}`);
        // console.log(imageResponse)
        const data = await imageResponse.json()
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer.buffer)));
        const base64String = Buffer.from(data.buffer.data).toString('base64')
        const image = `data:${data.contentType};base64,${base64String}`;     
        setImageStream(image)})()
       
  },[])

  useEffect(() => {
    
    const intervalID = setInterval(calculateTime,1000)
   return ()=>{
      clearInterval(intervalID)}
   
  },[])  

  function calculateTime(){
    const calculated = calculateRemainingTime(product.endTime);
    // console.log(calculated.message)
    setRemainingTime(calculated.message);
    const winningBid = product.currentBid;
    if(calculated.ended){      
      if (!localStorage.getItem(`${product._id}_email_sent`)) { // Check if email has not been sent
            sendEmailToWinner(product.name, winningBid, product._id);
            localStorage.setItem(`${product._id}_email_sent`, 'true'); // Set flag in local storage
      }}
  }
    
  return (<div className="col-md-4 mb-4 ">
                
                  <div className='container-fluid'>
                      <div className="card mx-auto col-md-3 col-10 mt-5 ">
                      <div className='imagecontainer'>
                      <img
                     src={imageStream}
                      alt={product.name}
                      className="mx-auto img-thumbnail"/>
                      </div>
                            <div className="card-body win text-center mx-auto">
                                <div className='cvp'>
                                    <h5 className="card-title font-weight-bold">{product.name}</h5>
                                    <p className="card-text">Current Bid: &#8377;{product.currentBid}</p>
                                    <p className="card-text">{remainingTime}
                                  </p>
                                  <Link to={`/products/${product._id}`} className="btn btn-view m">View Details</Link>
                                  <button className="btn-p cart px-auto" onClick={() => handleBid(product._id, product.currentBid, product.startingBid,product.category)}>
                                      Place Bid
                                  </button>
                                </div>
                            </div>
                      </div>
                  </div>
                  

            </div>)
}
