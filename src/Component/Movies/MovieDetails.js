import React, { Component } from 'react'
import SimilarMovies from './SimilarMovies'
import Movies from './RecommendedMovies'
import Credit from './MovieCredits'
import MovieReviews from '../Review/MovieReviews'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video'
import '../../Main/Modal.scss'
import FavoriteIcon from '@material-ui/icons/Favorite';

const api_key = "api_key=76a3351cce68be3d7eaa350f43ad5644"
const TrailerUrl = "https://api.themoviedb.org/3/movie/"
const YoutubeUrl = "https://www.youtube.com/embed/"
const ImgUrl = "https://image.tmdb.org/t/p/w500"
const IMdbURL = "https://www.imdb.com/title/"
const Favourite = JSON.parse(localStorage.getItem("FavouriteMovie"))
let x

export default class MovieDetails extends Component {
    constructor(){
        super()
        this.state = {
            videos : "",
            id : sessionStorage.getItem("id"),
            moreDetails:"",
            isOpen: false,
            marked:false,
            Disabled:""
        }
        this.openModal = this.openModal.bind(this)
        console.log("disabled" , this.state.Disabled)
    }
    openModal () {
        this.setState({isOpen: true})
      }
    
        renderDetails = (moreDetails) => {

            
            const setfavorite = (e) => {
            
                        const New_val  ={ 'id' : moreDetails.id , 'img' : moreDetails.poster_path , 'name' :  moreDetails.original_name || moreDetails.title}
                        if (localStorage.getItem("FavouriteMovie") == null) {
                            localStorage.setItem("FavouriteMovie" , '[]')
                        }
              
                        var Old_val = JSON.parse(localStorage.getItem("FavouriteMovie"))
        
                        Old_val.push(New_val)
                        localStorage.setItem("FavouriteMovie" , JSON.stringify(Old_val))
                        this.setState({marked:true})
               
            }
            
            if(moreDetails) {
               const key = sessionStorage.getItem("itemKey")
               
              return(
                <div className="container"  style={{background:`url(${`${ImgUrl}/${moreDetails.backdrop_path}`})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={key} onClose={() => this.setState({isOpen: false})} />
                <div className="sub" style={{overflow:"auto"}}>
                
                  <div className="main">
                  <img  onClick={this.openModal} style={{width:"100%" ,cursor:"pointer"}} src={`${ImgUrl}/${moreDetails.poster_path}`} alt="pic not available"></img>
                  </div>
                
                  <div className="right">
                  <h2 style={{color:"turquoise"}}>{moreDetails.tagline}</h2>
                            <h1 style={{color:"whitesmoke"}}>{moreDetails.title}</h1>
                            <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Runtime : </span>{moreDetails.runtime} mins</h2>

                            <StarRatings
                                    rating={moreDetails.vote_average}
                                    starRatedColor="blue"
                                    numberOfStars={10}
                                    name='rating'
                                    starDimension="40px"
                                    starSpacing="10px"
                            />

                            <p style={{color:"#DCDCDC",fontWeight:"bold"}}>{moreDetails.overview}</p>
                            <div>
                            {  moreDetails.genres.length > 1 ?  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Genre : </span>{moreDetails.genres[0].name} {moreDetails.genres[1].name} </h2> : <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Genre : </span>{moreDetails.genres[0].name}</h2>}
                    
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Budget : </span>${moreDetails.budget} </h2>
                                  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Revenue : </span>${moreDetails.revenue} </h2>
                                  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Release Date : </span>{moreDetails.release_date} </h2>
                            </div>
                            
                            {this.state.marked == false ? <FavoriteIcon   onClick={setfavorite} style={{ fontSize: 60  ,color:"white"}} /> : <FavoriteIcon   onClick={setfavorite} style={{ fontSize: 60  ,color:"red"}} />}
                        
                            <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Original Language : </span>{moreDetails.original_language} </h2>
                            <a style={{color:"silver",fontWeight:"bold",textDecoration:"underline"}} href={`${IMdbURL}${moreDetails.imdb_id}`}>More details on IMdb</a>                   
                  </div>
                </div>
                </div>
              )
            }
        }

        renderVideos =(videos) => {
            if(videos) {
                
                return videos.results.map((item) => {
                    sessionStorage.setItem("itemKey",item.key)
                    return(
                        <div style={{textAlign:'center'}}>
                            <h3>Name : {item.name}</h3>
                            <h2 style={{color:"white"}}>Source : {item.site}</h2>
                           <div className="iframe"> <h3 style={{textAlign:"center"}}><iframe className="responsive-iframe" width="800" height="500" src={`${YoutubeUrl}/${item.key}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h3></div>
                        </div>
                    )
                })
            }
    
        }
    handleBack = (e) => {
        sessionStorage.removeItem("id")
        this.props.history.push("/")
    }
    render() {
        console.log("suppose",this.state.Disabled)
        return (
            <div>

                {this.renderDetails(this.state.moreDetails)}
                <button onClick={this.handleBack}>Go back</button>
                
                <Tabs className="tabs" style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white'}}>
                    <TabList>
                            <Tab  style={{fontSize:"17px",fontWeight:"bold"}}>Cast</Tab>
                            <Tab style={{fontSize:"17px",fontWeight:"bold"}}>Similar Movies</Tab>
                            <Tab  style={{fontSize:"17px",fontWeight:"bold"}}>Recommended Movies</Tab>
                            <Tab  style={{fontSize:"17px",fontWeight:"bold"}}>Videos</Tab>
                            <Tab  style={{fontSize:"17px",fontWeight:"bold"}}>Reviews</Tab>

                    </TabList>

                    <TabPanel>
                    <Credit />
                    </TabPanel>
                    <TabPanel>
                            <SimilarMovies />
                    </TabPanel>
                    <TabPanel>
                          <Movies />
                    </TabPanel>
                    <TabPanel>
                          {this.renderVideos(this.state.videos)}
                    </TabPanel>
                    <TabPanel>
                          <MovieReviews />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }

    componentDidMount(){
      
        URL = TrailerUrl + this.state.id +  "/videos?"+ api_key + "&language=en-US"

       const  detailUrl = TrailerUrl  + this.state.id + "?" + api_key + "&language=en-US"
       
        fetch(URL)
        .then((res) => res.json())
        .then((data) => this.setState({videos:data}))

        fetch(detailUrl)
        .then((res) => res.json())
        .then((data) => this.setState({moreDetails:data}))

    }
}
