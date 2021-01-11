import React, { Component } from 'react'
import {Link} from 'react-router-dom'
const SimilarMoviesURL = "https://api.themoviedb.org/3/tv/"
const url2 = "/similar?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const ImgUrl = "https://image.tmdb.org/t/p/w300"

export default class Similarseries extends Component {
constructor(){
        super()
        this.state = {
            similar : ""
        }
    }
    renderSimilar = (data) => {
        if(data){
          return data.results.map((item) => {
            const  viewMore = (e) =>{
                sessionStorage.setItem("id",item.id)
                window.location.reload()            }
        
            return(
              < div style={{backgroundColor:' rgba(12, 4, 12, 0.700)',backdropFilter:'blur(5px)',margin:"10px",width:"400px"}} >
                     <h2 style={{color:"green",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                     <Link onClick={viewMore} to={`/details/${item.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> 
              </ div>
            )
          })
        }
      }
    render() {
   
        return (
            <div>
                <h1>Similar Movies</h1>
                <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',justifyContent:"center",alignItems:"center"}} >
                {this.renderSimilar(this.state.similar)}
                </div>
            </div>
        )
    }
    
    componentDidMount(){
        const similar_id = sessionStorage.getItem("id")
        const similarURL = SimilarMoviesURL  + similar_id + url2

        fetch(similarURL)
        .then((res) => res.json())
        .then((data) => {this.setState({similar:data})})
    }
}
