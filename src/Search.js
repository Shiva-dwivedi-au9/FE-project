import React, { Component } from 'react'
import MovieDisplay from './Component/MovieDisplay'
import {Spring} from 'react-spring/renderprops'

const MovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query="
const DefaultUrl = "https://api.themoviedb.org/3/search/movie?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query=&query=_"
let url
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
        if(input){
             url = `${MovieUrl}${input}`
        }
        else{
             url = DefaultUrl
        }
       
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            this.setState({movie:data})
        })
    }
    render() {
        console.log("movies",this.state.movie)
        return (
        
             <Spring
          
          from = { {opacity: 0}}
          to = {{opacity: 1}}
          config = {{ delay: 800 ,  duration : 800}}
         >
         {props =>  (
             <div style={props}>
                    <div style={{textAlign:"center",marginTop:"40px"}}>
                        <input  type="text" placeholder="Enter Keywords to search for movie" onChange={this.handleSearch.bind(this)} />
                    </div>
                    <MovieDisplay display={this.state.movie} />
            </div>
            )}
            </Spring>
        )
    }
    
}
