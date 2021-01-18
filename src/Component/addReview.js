import React, { Component } from 'react'
import './Review.css'

const url = "http://localhost:8900/review"

export class addReview extends Component {

    constructor() {
        super()
        this.state = {
            id:sessionStorage.getItem("id"),
            name:"SHIVA",
            review:""
        }
    }

    handleChange = (e) => {
        this.setState({review : e.target.value})
    }

    handleSubmit =() => {
        console.log(this.state)
        fetch(url,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        this.setState({review:""})
        window.location.reload()
    }
    render() {
        return (
            <div className="review">
                <h2>Add your review :</h2>
                <input onChange={this.handleChange} value={this.state.review} type="text" placeholder="EXPRESS YOUR FEELINGS FOR THIS MOVIE" />
                <button onClick={this.handleSubmit}>Add Review</button>
            </div>
        )
    }
}

export default addReview
