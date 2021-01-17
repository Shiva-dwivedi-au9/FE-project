import React from 'react'
import {Spring} from 'react-spring/renderprops'
import Header1 from './header/Header1'

export default function Header() {
    return (
        <Spring
          
         from = { {opacity: 0 , margin: -500}}
         to = {{opacity: 1 , margin: 0}}
        >
        {props =>  ( 
            <div style={props}>
                <Header1 />
            </div>
        )}
        </Spring>
       
    )
}
