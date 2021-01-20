import React from 'react'
import {BrowserRouter , Route} from 'react-router-dom'
import Header from './header/Header'
import Footer from './Footer/Footer'
import Home from '../Main/Home'
import Trending from './Trending/Trending'
import MovieDetails from './Movies/MovieDetails'
import SeriesDetails from './Series/tvdetails'
import App from '../App'
import TVapp from './Series/TVapp'
import Seasondetail from './Series/Seasondetail'
import Visited from './Visited/Visited'
import Favourite from './favourites/Favourite'

export default function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Header/>

                    <Route exact path="/" component={Home} />
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