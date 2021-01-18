import React, { Component } from 'react'
import Review from './addReview'

const Movie = "https://api.themoviedb.org/3/movie/"
const ReviewUrl = "/reviews?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const url = " http://localhost:8900/review/"

export class MovieReviews extends Component {
    constructor() {
        super()
        this.state = {
            reviews : "",
            userReview:""
        }
    }

    renderUserReview = (data) => {
        if(data){
                return(
                    <div style={{backgroundColor:' rgba(12, 4, 12, 0.700)',backdropFilter:'blur(5px)',margin:"10px"}}>
                    <h2 style={{color:"teal",fontSize:"25px",padding:"20px"}}>WRITTEN BY : <span style={{color:"white"}}>{data.name}</span></h2>
                    <p style={{color:"wheat",padding:"20px",fontSize:"20px"}}>{data.review}</p>
                </div>
                )
        }
        else{
            <h1>no user review</h1>
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
        console.log("userreview", this.state.userReview)
        return (
            <div>
                <Review />
                {this.renderUserReview(this.state.userReview)}
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

    const UserURL = url + id
    fetch(UserURL)
    .then((res) => res.json())
    .then((data) => this.setState({userReview:data}))
}

    
}

export default MovieReviews
