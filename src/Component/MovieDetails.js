import React, { Component } from 'react'
import SimilarMovies from './SimilarMovies'
import Movies from './RecommendedMovies'
import Credit from './MovieCredits'
import MovieReviews from './MovieReviews'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video'
import '../Modal.scss'

const api_key = "api_key=76a3351cce68be3d7eaa350f43ad5644"
const TrailerUrl = "https://api.themoviedb.org/3/movie/"
const YoutubeUrl = "https://www.youtube.com/embed/"
const ImgUrl = "https://image.tmdb.org/t/p/w300"
const IMdbURL = "https://www.imdb.com/title/"

export default class MovieDetails extends Component {
    constructor(){
        super()
        this.state = {
            videos : "",
            moreDetails:"",
            isOpen: false
        }
        this.openModal = this.openModal.bind(this)
    }
    openModal () {
        this.setState({isOpen: true})
      }
    
        renderDetails = (moreDetails) => {
            
            if(moreDetails) {
               const key = sessionStorage.getItem("itemKey")
               
              return(
                  
                  <div style={{background:`url(${`${ImgUrl}/${moreDetails.backdrop_path}`})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                       <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={key} onClose={() => this.setState({isOpen: false})} />
                  <div className="movie"  style={{display:"flex",backgroundColor:' rgba(12, 4, 12, 0.700)',backdropFilter:'blur(5px)'}}>
                 <img className="main" onClick={this.openModal} style={{float:"left",width:"30%" ,margin:"30px",cursor:"pointer"}} src={`${ImgUrl}/${moreDetails.poster_path}`} alt="pic not available"></img>
                      
                      <div className="right" style={{display:"block",marginTop:"90px",width:"60%"}}>
                            <h2 style={{color:"turquoise",fontSize:"30px"}}>{moreDetails.tagline}</h2>
                            <h1>{moreDetails.title}</h1>
                            <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Runtime : </span>{moreDetails.runtime} mins</h2>
                            <StarRatings
                                    rating={moreDetails.vote_average}
                                    starRatedColor="blue"
                                    numberOfStars={10}
                                    name='rating'
                                    starDimension="40px"
                                    starSpacing="10px"
                            />
                            <p style={{color:"teal",fontSize:"20px",fontWeight:"bold"}}>{moreDetails.overview}</p>
                            <div style={{display:"flex",justifyContent:"space-between",marginRight:"20px"}}>
                                  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Budget : </span>${moreDetails.budget} </h2>
                                  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Revenue : </span>${moreDetails.revenue} </h2>
                                  <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Release Date : </span>{moreDetails.release_date} </h2>
                            </div>
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
                            <h1>Name : {item.name}</h1>
                            <h2 style={{color:"white"}}>Source : {item.site}</h2>
                            <h3 style={{textAlign:"center"}}><iframe width="800" height="500" src={`${YoutubeUrl}/${item.key}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h3>
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
        console.log(this.state.moreDetails)
        return (
            <div>

                {this.renderDetails(this.state.moreDetails)}
                <button onClick={this.handleBack}>Go back</button>
                
                <Tabs>
                    <TabList>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Cast</Tab>
                            <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Similar Movies</Tab>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Recommended Movies</Tab>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Videos</Tab>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Reviews</Tab>

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
        const id = sessionStorage.getItem("id")
        URL = TrailerUrl + id +  "/videos?"+ api_key + "&language=en-US"

       const  detailUrl = TrailerUrl  + id + "?" + api_key + "&language=en-US"
       
        fetch(URL)
        .then((res) => res.json())
        .then((data) => this.setState({videos:data}))

        fetch(detailUrl)
        .then((res) => res.json())
        .then((data) => this.setState({moreDetails:data}))

    }
}
