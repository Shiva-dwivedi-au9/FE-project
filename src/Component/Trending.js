import React, { Component } from 'react'
import  '../Main.css'
import loader from '../Images/loader.gif'
const TrendingUrl = "https://api.themoviedb.org/3/trending/all/day?api_key=76a3351cce68be3d7eaa350f43ad5644"
const ImgUrl = "https://image.tmdb.org/t/p/w300"


export default class Trending extends Component {

    constructor(){
        super()
        this.state = {
            trending:""
        }
      }

      renderTrending=(data) => {
        if(data){
          return data.results.map((item) => {
            return(
              < div style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px"}} >
                 <h2 style={{color:"green",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                <img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img>
                <div style={{margin:"55px"}}>
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Popularity : </span>  {item.popularity}</h4> 
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Release Date : </span> {item.release_date} {item.first_air_date}</h4>
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Average: </span>  {item.vote_average} </h4> 
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Count : </span>{item.vote_count} </h4>
                </div>
              
              </ div>
             
            )
          })
    
        }else{
          return(
            <div>
              <img src={loader} />
            </div>
          )
        }
      }
      
    render() {
        return (
            <div className="trending">
                     <h1>TRENDING</h1>
                     <div  style={{display:"flex",flexWrap:"wrap"}}>
                    {this.renderTrending(this.state.trending)}
            </div>
            </div>
        )
    }

    componentDidMount(){
        fetch(TrendingUrl)
        .then((res)=>res.json())
        .then((data) => {
          this.setState({trending:data})
      })

    }
}