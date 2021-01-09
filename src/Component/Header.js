import React from 'react'
import "../Main.css"
import {Link} from 'react-router-dom'
import {Spring} from 'react-spring/renderprops'

export default function Header() {
    return (
        <Spring
          
         from = { {opacity: 0 , margin: -500}}
         to = {{opacity: 1 , margin: 0}}
        >
        {props =>  (
            <div style={props}>
                <div style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white'}}>
                        <Link to="/"> <h1 style={{textAlign:"center"}}>Daily Movie Mania</h1> </Link>   
                </div>
            </div>
        )}
        </Spring>
       
    )
}
