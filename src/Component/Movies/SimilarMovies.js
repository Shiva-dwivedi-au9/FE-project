import React, { Component } from 'react'
import {Link} from 'react-router-dom'
const SimilarMoviesURL = "https://api.themoviedb.org/3/movie/"
const url2 = "/similar?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const ImgUrl = "https://image.tmdb.org/t/p/w300"

export default class SimilarMovies extends Component {
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

                const New_val  ={ 'id' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}
                
                if (localStorage.getItem("movieList") == null) {
                    localStorage.setItem("movieList" , '[]')
                }
      
                var Old_val = JSON.parse(localStorage.getItem("movieList"))
                Old_val.push(New_val)
      
                localStorage.setItem("movieList" , JSON.stringify(Old_val))

                sessionStorage.setItem("id",item.id)

                sessionStorage.setItem("id",item.id)
                window.location.reload()            }
        
            return(
              <div style={{backgroundColor:' rgba(12, 4, 12, 0.700)',backdropFilter:'blur(5px)',margin:"10px",width:"300px",height:"600px"}} >
                     <h2 style={{color:"silver",textAlign:"center",fontSize:"20px"}} key={item.id}>{item.original_name}{item.title}</h2>
                     <Link onClick={viewMore} to={`/details/${item.id}`}><img style={{width:"100%"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> 
              </div>
            )
          })
        }
      }
    render() {
   
        return (
            <div>
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
