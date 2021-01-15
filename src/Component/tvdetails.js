import React, { Component } from 'react'
import Credit from './tvcredits'
import Similar from './similarseries'
import Recommended from './RecommendedSeries'
import SeriesReviews from './SeriesReview'
import SeasonDisplay from './SeasonDisplay'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video'
import '../Modal.scss'

const api_key = "api_key=76a3351cce68be3d7eaa350f43ad5644"
const TrailerUrl = "https://api.themoviedb.org/3/tv/"
const YoutubeUrl = "https://www.youtube.com/embed/"
const ImgUrl = "https://image.tmdb.org/t/p/w500"

export default class Tv extends Component {
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
               const key = sessionStorage.getItem("tvkey")
               
              return(
                 <div className="container"  style={{background:`url(${`${ImgUrl}/${moreDetails.backdrop_path}`})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                        <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={key} onClose={() => this.setState({isOpen: false})} />
                        <div className="sub" style={{overflow:"auto"}}>
                        
                        <div className="main">
                        <img  onClick={this.openModal} style={{width:"100%" ,cursor:"pointer"}} src={`${ImgUrl}/${moreDetails.poster_path}`} alt="pic not available"></img>
                        </div>
                        
                        <div className="right">
                        <h2 style={{color:"turquoise",fontSize:"30px"}}>{moreDetails.tagline}</h2>
                                    <h1 style={{color:"whitesmoke"}}>{moreDetails.title} {moreDetails.name}</h1>
                                    <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Episode Runtime : </span>{moreDetails.episode_run_time[0]} mins</h2>
                                    <StarRatings
                                            rating={moreDetails.vote_average}
                                            starRatedColor="blue"
                                            numberOfStars={10}
                                            name='rating'
                                            starDimension="40px"
                                            starSpacing="10px"
                                    />
                                    <p style={{color:"#DCDCDC",fontSize:"20px",fontWeight:"bold"}}>{moreDetails.overview}</p>
                                    <div style={{display:"flex",justifyContent:"space-between",marginRight:"20px"}}>
                                        <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Genre : </span>{moreDetails.genres[0].name} </h2>
                                        <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>First Air Date : </span>{moreDetails.first_air_date} </h2>
                                    </div>
                                    <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Seasons : </span>{moreDetails.number_of_seasons} </h2>
                                    <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Total Episodes : </span>{moreDetails.number_of_episodes} </h2>
                                    <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Status : </span>{moreDetails.status} </h2>
                                    <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Last Air Date : </span>{moreDetails.  last_air_date} </h2>
                                                                                  
                        </div>
                        </div>
                </div>
              )
            }
        }
        
      
        renderVideos =(videos) => {
            if(videos) {
                
                return videos.results.map((item) => {
                    sessionStorage.setItem("tvkey",item.key)
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
            sessionStorage.removeItem("tvid")
            this.props.history.push("/")
        }
        render() {
            console.log("season" , this.state.moreDetails)
            return (
                <div>

                {this.renderDetails(this.state.moreDetails)}
               
                <button onClick={this.handleBack}>Go back</button>

                
                <Tabs style={{backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',color:'white'}}>
                    <TabList>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Seasons</Tab>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Cast</Tab>
                            <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Trailers and Bloopers</Tab>
                            <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Recommended Tv Series</Tab>
                            <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Similar Tv Series</Tab>
                            <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Series Review</Tab>
                    </TabList>

                    <TabPanel>
                    <SeasonDisplay />
                    </TabPanel>
                    <TabPanel>
                    <Credit />
                    </TabPanel>
                    <TabPanel>
                          {this.renderVideos(this.state.videos)}
                    </TabPanel>
                    <TabPanel>
                          <Recommended />
                    </TabPanel>
                    <TabPanel>
                          <Similar />
                    </TabPanel>
                    <TabPanel>
                          <SeriesReviews />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }

    componentDidMount(){
        const id = sessionStorage.getItem("tvid")
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