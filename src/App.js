import React, { Component } from 'react'
import Search from  './Search'
import './Main.css'

const GenreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US"
const GenreDetailUrl = "https://api.themoviedb.org/3/discover/movie?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="
const ImgUrl = "https://image.tmdb.org/t/p/w300"


export default class App extends Component {

  constructor(){
    super()
    this.state = {
        genre:"",
        genreDetail:""
    }
  }
  renderMovies = (data) => {
    if(data){
      return data.results.map((item) => {
        console.log("see",data.results)
        return(
          < div style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px"}} >
                 <h2 style={{color:"green",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                <img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img>
          </ div>
        )
      })
    }
  }
  renderGenre = (data) => {
    if(data){
      
      return data.genres.map((item) =>{
       this. handleGenre=(e) => {
          sessionStorage.setItem("genreid",item.id)
          const _id = sessionStorage.getItem("genreid")
        
          const  FinalURL = GenreDetailUrl  + _id
          
          fetch(FinalURL)
          .then((res)=>res.json())
          .then((data) => this.setState({genreDetail:data}))
        }
       
          return(
            <div className="myButton" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"9px",width:"150px",cursor:"pointer",borderRadius:"50px"}}>
                  <h3 onClick={this.handleGenre} style={{padding:"10px",color:"teal"}} key={item.id} value={item.id}>{item.name}</h3>
            </div>
             
          )
      })
  }
  }
  

  render() {
  console.log("genredata" , this.state.genreDetail)
    return (
      
      <div className="main-container">
          <Search />

          <h1 style={{textAlign:"center"}}>GENRE</h1>
          <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',textAlign:"center"}}>
           {this.renderGenre(this.state.genre)}
          </div> 

          <h2 style={{textAlign:"center"}}>Get results by Genre here</h2>
          <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)'}} >
              {this.renderMovies(this.state.genreDetail)}
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
}
}




