import React from 'react'
import {BrowserRouter , Route} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Contact from './Contact'
import Home from '../Main'
import Trending from './Trending'
import MovieDetails from './MovieDetails'
import SeriesDetails from './tvdetails'

export default function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Header/>

                    <Route exact path="/" component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/info/:tvid" component={SeriesDetails} />
                    <Route path="/trending" component={Trending} />
                    <Route path="/details/:id" component={MovieDetails} />

                <Footer year="2021" month="JAN"  />
            </BrowserRouter>
            
        </div>
    )
}