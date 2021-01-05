import React from 'react'
import {BrowserRouter , Route} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Contact from './Contact'
import App from '../App'

export default function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Header/>

                    <Route exact path="/" component={App} />
                    <Route path="/contact" component={Contact} />
                <Footer year="2020" month="DEC" date="21" />
            </BrowserRouter>
            
        </div>
    )
}
