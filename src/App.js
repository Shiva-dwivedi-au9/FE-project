import React, { Component } from 'react'
import Search from  './Search'
import './Main.css'
import TopRated from './Component/TopRated'
import Popular from './Component/Popular'
import NowPlaying from './Component/NowPlaying'
import Upcoming from './Component/Upcoming'
import {Link} from 'react-router-dom'
import {Spring} from 'react-spring/renderprops'
import {Transition} from 'react-spring/renderprops'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const GenreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US"
const GenreDetailUrl = "https://api.themoviedb.org/3/discover/movie?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="
const ImgUrl = "https://image.tmdb.org/t/p/w300"


export default class App extends Component {

  constructor(){
    super()
    this.state = {
        genre:"",
        genreDetail:"",
        movies : []
    }
  }
  renderMovies = (data) => {
    if(data){
      return data.results.map((item) => {
        console.log("see",data.results)
        const  viewMore = (e) =>{
          
          const New_val  ={ 'id' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}

          if (localStorage.getItem("movieList") == null) {
              localStorage.setItem("movieList" , '[]')
          }

          var Old_val = JSON.parse(localStorage.getItem("movieList"))
          Old_val.push(New_val)

          localStorage.setItem("movieList" , JSON.stringify(Old_val))
          sessionStorage.setItem("id",item.id)
      }
        return(
          <Transition
                items={item} keys={item => item.key}
                from={{ transform: 'translate3d(0,-800px,0)' }}
                enter={{ transform: 'translate3d(0,0px,0)' }}
                leave={{ transform: 'translate3d(0,-80px,0)' }}>
                {item => props => <div style={props}>
                      < div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px",height:"600px"}} >
                              <h2 style={{color:"teal",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                             <Link onClick={viewMore} to={`/details/${item.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> 
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
          sessionStorage.setItem("genreid",item.id)
          const _id = sessionStorage.getItem("genreid")
        
          const  FinalURL = GenreDetailUrl  + _id
          
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
  console.log("local" , this.state.movies)
    return (
      
      <div className="main-container">
       <Tabs>
          <TabList>
                <Tab style={{fontSize:"20px",fontWeight:"bold"}}>All Movies</Tab>
                <Tab style={{fontSize:"20px",fontWeight:"bold"}}>Now Playing Movies</Tab>
                <Tab style={{fontSize:"20px",fontWeight:"bold"}}>Upcoming Movies</Tab>
                <Tab style={{fontSize:"20px",fontWeight:"bold"}}>Popular Movies</Tab>
                <Tab style={{fontSize:"20px",fontWeight:"bold"}}>Top Rated Movies</Tab>                
          </TabList>

          <TabPanel>
               
                  <Search />
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
         
          </TabPanel>
          <TabPanel>
                <NowPlaying />
          </TabPanel>
          <TabPanel>
                <Upcoming />
          </TabPanel>
          <TabPanel>
                <Popular />
          </TabPanel>
          <TabPanel>
                <TopRated />
          </TabPanel>
  </Tabs>
         
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




