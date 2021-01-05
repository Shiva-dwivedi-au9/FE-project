import React, { Component } from 'react'
import MovieDisplay from './Component/MovieDisplay'

const MovieUrl = "https://api.themoviedb.org/3/search/multi?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query="

export default class Search extends Component {

    constructor(){
        super()
        this.state = {
            movie:"",
            name:""
        }
      }

    handleSearch(e){
        const input = e.target.value
        this.setState({name:input})
        const url = `${MovieUrl}${input}`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            this.setState({movie:data})
        })
    }
    render() {
        console.log("name",this.state.name)
        return (
            <div>
                <input type="text" placeholder="Enter Keywords to search for movie" onChange={this.handleSearch.bind(this)} />
                <MovieDisplay display={this.state.movie} />
            </div>
        )
    }
    
}
