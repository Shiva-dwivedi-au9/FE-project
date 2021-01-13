import React, { Component } from 'react'
import TVDisplay from './TVDisplay'
import {Spring} from 'react-spring/renderprops'

const TVUrl = "https://api.themoviedb.org/3/search/tv?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&query="
const url2 = "&include_adult=false"

const DefaultUrl = "https://api.themoviedb.org/3/search/tv?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&query=_&include_adult=false"
let url
export default class Search extends Component {

    constructor(){
        super()
        this.state = {
            series:"",
            name:""
        }
      }

    handleSearch(e){
        const input = e.target.value
        this.setState({name:input})
        if(input){
             url = `${TVUrl}${input}${url2}`
        }
        else{
             url = DefaultUrl
        }
       
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            this.setState({series:data})
        })
    }
    render() {
        console.log("series",this.state.movie)
        return (
        
             <Spring
          
          from = { {opacity: 0}}
          to = {{opacity: 1}}
          config = {{ delay: 800 ,  duration : 800}}
         >
         {props =>  (
             <div style={props}>
                    <div style={{textAlign:"center",marginTop:"40px"}}>
                        <input  type="text" placeholder="Enter Keywords to search for TV Series" onChange={this.handleSearch.bind(this)} />
                    </div>
                    <TVDisplay display={this.state.series} /> 
            </div>
            )}
            </Spring>
        )
    }
    
}
