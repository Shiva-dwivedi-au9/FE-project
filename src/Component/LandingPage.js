import React from 'react'
import './Landing.css'
import img from '../Images/deadpool.jpg'


export default function LandingPage() {
    return (
        <div className="banner">
            <img src={img} />
            <div className="heading">
                <h1>WELCOME TO </h1>
                <h1 className="title">DAILY MOVIE MANIA</h1>
                <h2>Explore the Big screen and the Small screen entertainment here</h2>
            </div>
           
        </div>
    )
}

