import React from 'react'
import {Spring} from 'react-spring/renderprops'
import './Landing.css'
import img from '../Images/deadpool.jpg'


export default function LandingPage() {
    return (
        <Spring
          
        from = { {opacity: 0 , margin: -500}}
        to = {{opacity: 1 , margin: 0}}
       >
       {props =>  ( 
           <div style={props}>
           <div className="banner">
           <img src={img} />
           <div className="heading">
               <h1>WELCOME TO </h1>
               <h1 className="title">DAILY MOVIE MANIA</h1>
               <h2>Explore the Big screen and the Small screen entertainment here</h2>
           </div>
          
       </div>
           </div>
       )}
       </Spring>
    )
}

 
