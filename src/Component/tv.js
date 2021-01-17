import React, { Component } from 'react'
import  '../Main.css'
import StarRatings from 'react-star-ratings';
import loader from '../Images/loader.gif'
import {Link} from 'react-router-dom'
const tvapi = "https://api.themoviedb.org/3/tv/popular?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const ImgUrl = "https://image.tmdb.org/t/p/w300"

class tv extends Component {

    constructor(){
        super()
        this.state = {
            tv:""
        }
      }
      componentDidMount(){
        fetch(tvapi)
        .then((res)=>res.json())
        .then((data) => {
          this.setState({tv:data})
        })
        
      }
     

      render() {
          return (
              <div className="tv">
                       <h1>Tv-Series</h1>
                       <div  style={{display:"flex",flexWrap:"wrap"}}>
                      {this.rendertvapi(this.state.tv)}
              </div>
              </div>
          )
      }
      rendertvapi=(data) => {
        if(data){
          return data.results.map((tv) => {
            const det = (e) =>{
              sessionStorage.setItem("id",tv.id)  
              console.log(tv.id)  
            }
            return(
              < div style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px"}} >
                 <h2 style={{color:"green",textAlign:"center"}} key={tv.id}>||| {tv.original_name}{tv.title} |||</h2>
                <Link onClick={det} to={`/details/${tv.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${tv.poster_path}`}></img></Link> 
                <div style={{margin:"55px"}}>
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Popularity : </span>  {tv.popularity}</h4> 
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Release Date : </span> {tv.release_date} {tv.first_air_date}</h4>
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Average: </span> </h4> 
                    <StarRatings
                        rating={tv.vote_average}
                        starRatedColor="blue"
                        numberOfStars={10}
                        name='rating'
                        starDimension="25px"
                        starSpacing="2px"
                  />
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Count : </span>{tv.vote_count} </h4>
                </div>
              
              </ div>
             
            )
             
          }
          )
    
        }else{
          return(
            <div>
              <img src={loader} />
            </div>
          )
        }
      }
      

}


export default tv;