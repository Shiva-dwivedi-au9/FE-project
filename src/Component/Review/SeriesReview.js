import React, { Component } from 'react'
import './Review.css'

const verify = localStorage.getItem("loggedin")
const Series = "https://api.themoviedb.org/3/tv/"
const ReviewUrl = "/reviews?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const SeriesReview =  "http://localhost:8900/SeriesReview/"
const url1 = " http://localhost:8900/SeriesReview"

export class SeriesReviews extends Component {
    constructor() {
        super()
        this.state = {
            id:sessionStorage.getItem("id"),
            name:sessionStorage.getItem("UDetails"),
            review:"",
            reviews : "",
            userReview:""
        }
    }

    handleChange = (e) => {
        this.setState({review : e.target.value})
    }

    handleSubmit =() => {
        console.log(this.state)
        fetch(url1,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify( {id:this.state.id , name:this.state.name , review: this.state.review})
        })
        this.setState({review:""})

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
       else{
           return(
                   <h3 style={{textAlign:"center"}}>No Review found for this series</h3>
           )
       }
    }
    render() {
    
        return (
            <div>
            <>
            { verify === "true" ? <div className="review">
            <h2>Add your review :</h2>
            <input onChange={this.handleChange} value={this.state.review} type="text" placeholder="EXPRESS YOUR FEELINGS FOR THIS SERIES" />
            <button onClick={this.handleSubmit}>Add Review</button>
        </div> : <h1  className="condition">Please Login to write your review</h1>}

             {this.renderUserReview(this.state.userReview)} 
               
                </>
    
                {this.renderReviews(this.state.reviews)}
            </div>
        )
    }

componentDidMount() {
    const id = sessionStorage.getItem("tvid")
    const FinalUrl = Series + id + ReviewUrl

    fetch(FinalUrl)
    .then((res) => res.json())
    .then((data) => this.setState({reviews:data}) )
}

componentDidUpdate(){
    const id = sessionStorage.getItem("id")
    const UserURL = SeriesReview + id
    fetch(UserURL)
    .then((res) => res.json())
    .then((data) =>
    setTimeout(
        () =>  this.setState({userReview:data})), 
        200
  );
}
}

export default SeriesReviews
