import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Movie = "https://api.themoviedb.org/3/movie/"
const ReviewUrl = "/reviews?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"

export class MovieReviews extends Component {
    constructor() {
        super()
        this.state = {
            reviews : ""
        }
    }
    renderReviews = (data) => {
       if(data){
           return data.results.map((item) => {
               return(
                   <div style={{backgroundColor:' rgba(12, 4, 12, 0.700)',backdropFilter:'blur(5px)',margin:"10px"}}>
                       <h2 style={{color:"teal",fontSize:"25px",padding:"20px"}}>WRITTEN BY : <span style={{color:"white"}}>{item.author}</span></h2>
                       <p style={{color:"wheat",padding:"20px",fontSize:"20px"}}>{item.content}</p>
                       <h3 style={{color:"teal",padding:"20px"}}>Written on : {item.created_at} </h3>
                       <a style={{padding:"20px"}} href={item.url}>See the original review</a>
                       <br/>
                       <br/>
                   </div>
               )
           })
       }
    }
    render() {
        console.log("reviews" , this.state.reviews)
        return (
            <div>
                {this.renderReviews(this.state.reviews)}
            </div>
        )
    }

componentDidMount() {
    const id = sessionStorage.getItem("id")
    const FinalUrl = Movie + id + ReviewUrl

    fetch(FinalUrl)
    .then((res) => res.json())
    .then((data) => this.setState({reviews:data}) )
}
}

export default MovieReviews
