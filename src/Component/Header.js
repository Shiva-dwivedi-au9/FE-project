import React from 'react'
import "../Main.css"
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <div style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white'}}>
           <Link to="/"> <h1 style={{textAlign:"center"}}>Daily Movie Mania</h1>      </Link>   
        </div>
    )
}
