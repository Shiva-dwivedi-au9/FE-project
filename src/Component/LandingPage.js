import React from 'react'
import {Spring} from 'react-spring/renderprops'
import './Landing.css'

export default function LandingPage() {
    return (
        <Spring
          
        from = { {opacity: 0 , margin: -500}}
        to = {{opacity: 1 , margin: 0}}
       >
       {props =>  ( 
           <div style={props}>
           <div className="banner">
           <iframe width="560" height="315" src="https://www.youtube.com/embed/5OqiOBQfnNM?autoplay=1&playlist=5OqiOBQfnNM&controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           <div className="heading">
               <h1>WELCOME TO </h1>
               <h1 className="title">DAILY MOVIE MANIA</h1>
               <div className="sub-heading">
                    <h2>Explore the Big screen and the Small screen entertainment here</h2>
                    <h2>Scroll or Swipe up to check what's trending today</h2>
               </div>
               
           </div>
          
       </div>
           </div>
       )}
       </Spring>
    )
}

 
