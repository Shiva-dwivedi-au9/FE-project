import React from 'react'
import {BrowserRouter , Route} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Contact from './Contact'
import Home from '../Home'
import Trending from './Trending'
import MovieDetails from './MovieDetails'
import SeriesDetails from './tvdetails'
import App from '../App'
import TVapp from './TVapp'
import Seasondetail from './Seasondetail'
import Visited from './Visited'
import Favourite from './Favourite'

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
                    <Route path="/season/:id" component={Seasondetail} />
                    <Route exact path = "/movies" component ={App} />
                    <Route exact path = "/series" component = {TVapp} />
                    <Route exact path = "/visited" component = {Visited} />
                    <Route  exact path = "/favourite" component = { Favourite} />

 
                <Footer year="2021" month="JAN"  />
            </BrowserRouter>
            
        </div>
    )
}