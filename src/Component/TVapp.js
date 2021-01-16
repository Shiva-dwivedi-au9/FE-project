
import React, { Component } from 'react'
import TVsearch from  './TVsearch'
import '../Main.css'
import {Link} from 'react-router-dom'
import {Spring} from 'react-spring/renderprops'
import {Transition} from 'react-spring/renderprops'


const GenreURL = "https://api.themoviedb.org/3/genre/tv/list?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US"
const GenreDetailUrl = "https://api.themoviedb.org/3/discover/tv?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres="
const url2 = "&include_null_first_air_dates=false"
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
        const  viewMore = (e) =>{
          sessionStorage.setItem("tvid",item.id)
          sessionStorage.setItem("seriesName",item.title || item.original_name)
      }
        return(
          <Transition
                items={item} keys={item => item.key}
                from={{ transform: 'translate3d(0,-80px,0)' }}
                enter={{ transform: 'translate3d(0,0px,0)' }}
                leave={{ transform: 'translate3d(0,-80px,0)' }}>
                {item => props => <div style={props}>
                      < div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px",height:"600px"}} >
                              <h2 style={{color:"teal",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                             <Link onClick={viewMore} to={`/info/${item.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> 
                        </ div></div>}
          </Transition>
         
        )
      })
    }
  }
  renderGenre = (data) => {
    if(data){
      
      return data.genres.map((item) =>{
       this. handleGenre=(e) => {
          sessionStorage.setItem("TVgenreid",item.id)
          const _id = sessionStorage.getItem("TVgenreid")
        
          const  FinalURL = GenreDetailUrl  + _id + url2
          
          fetch(FinalURL)
          .then((res)=>res.json())
          .then((data) => this.setState({genreDetail:data}))
        }
       
          return(
            <div className="myButton" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"9px",width:"150px",cursor:"pointer",borderRadius:"50px",textAlign:"center"}}>
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
               
                <TVsearch />
                  <Spring
                  
                  from = { {opacity: 0}}
                  to = {{opacity: 1}}
                  config = {{ delay: 1100 ,  duration : 1000}}
                >
                {props =>  (
                    <div style={props}>
                    <br/>
                    <br/>
                    <br/> 
                    <br/>
                    <h2 style={{textAlign:"center"}}>GENRE</h2>
                      <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',justifyContent:"center",alignItems:"center"}}>
                          {this.renderGenre(this.state.genre)}
                      </div>
                      </div>
                    )}
                    </Spring>
                                  
                  <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',justifyContent:"center",alignItems:"center"}} >
                      {this.renderMovies(this.state.genreDetail)}
                  </div>
         
      </div>
    )
  }
  componentDidMount(){
    fetch(GenreURL,{method:'GET'})
    .then((res) => res.json())
    .then((data) => {
        this.setState({genre:data})
    })
}
}




