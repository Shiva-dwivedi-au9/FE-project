import React from 'react'

export default function Footer(props) {
    return (
        <div style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white',textAlign:"center"}}>
            <h1>Daily Movie Mania {props.year} {props.month}</h1>
        </div>
    )
}
