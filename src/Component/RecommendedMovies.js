import React, { Component } from 'react'
import {Link} from 'react-router-dom'
const recommendedMoviesURL = "https://api.themoviedb.org/3/movie/"
const url2 = "/recommendations?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const ImgUrl = "https://image.tmdb.org/t/p/w300"

export default class recommendedMovies extends Component {
    constructor(){
        super()
        this.state = {
            recommended : ""
        }
    }
    renderrecommended = (data) => {
        if(data){
          return data.results.map((item) => {
            const  viewMore = (e) =>{
                sessionStorage.setItem("id",item.id)
                window.location.reload()
            }
            console.log("see",data.results)
            return(
              < div style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px"}} >
                     <h2 style={{color:"green",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                    <Link onClick={viewMore} to={`/details/${item.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> 

              </ div>
            )
          })
        }
      }
    render() {
        console.log("recommended movies" , this.state.recommended)
        return (
            <div>
                <h1>recommended Movies</h1>
                <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)'}} >
                {this.renderrecommended(this.state.recommended)}
                </div>
            </div>
        )
    }
    
    componentDidMount(){
        const recommended_id = sessionStorage.getItem("id")
        const recommendedURL = recommendedMoviesURL  + recommended_id + url2

        fetch(recommendedURL)
        .then((res) => res.json())
        .then((data) => {this.setState({recommended:data})})
    }
}
