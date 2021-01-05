import React, { Component } from 'react'
import Search from  './Search'

const GenreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US"
const TrendingUrl = "https://api.themoviedb.org/3/trending/all/day?api_key=76a3351cce68be3d7eaa350f43ad5644"
const ImgUrl = "https://image.tmdb.org/t/p/w300"

export default class App extends Component {

  constructor(){
    super()
    this.state = {
        genre:"",
        trending:""
    }
  }

  renderGenre = (data) => {
    if(data){
      console.log(data)
      return data.genres.map((item) =>{
          return(
             <h3 style={{padding:"10px",color:"teal"}} key={item.id}>{item.name}</h3>
          )
      })
  }
  }

  renderTrending=(data) => {
    if(data){
      return data.results.map((item) => {
        return(
          < div >
             <h2 style={{color:"green",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
            <img style={{margin:"30px"}} src={`${ImgUrl}/${item.poster_path}`}></img>
            <div style={{margin:"30px"}}>
                <h4><span style={{color:"teal",fontSize:"20px"}}>Popularity : </span>  {item.popularity}</h4> 
                <h4><span style={{color:"teal",fontSize:"20px"}}>Release Date : </span> {item.release_date} {item.first_air_date}</h4>
                <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Average: </span>  {item.vote_average} </h4> 
                <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Count : </span>{item.vote_count} </h4>
            </div>
          
          </ div>
         
        )
      })

    }
  }
  render() {
    console.log(this.state.genre)
    console.log("trending",this.state.trending)
    return (
      
      <div>
          <Search />
          <h1>GENRE</h1>
          <div style={{display:"flex",flexWrap:"wrap"}}>
           {this.renderGenre(this.state.genre)}
          </div>

          <div >
            <h1>TRENDING</h1>
            <div  style={{display:"flex",flexWrap:"wrap"}}>
                  {this.renderTrending(this.state.trending)}
            </div>
          </div>          
         
          
      </div>
    )
  }
  componentDidMount(){
    fetch(GenreUrl,{method:'GET'})
    .then((res) => res.json())
    .then((data) => {
        this.setState({genre:data})
    })

    fetch(TrendingUrl)
    .then((res)=>res.json())
    .then((data) => {
      this.setState({trending:data})
  })
}
}

