import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';

const tvid = sessionStorage.getItem("tvid") 
const seasonNum = sessionStorage.getItem("seasonNo")
const SeasonURL = "https://api.themoviedb.org/3/tv/"+ tvid +"/season/"+ seasonNum +"?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US"
const ImgUrl = "https://image.tmdb.org/t/p/w500"

export class Seasondetail extends Component {
    constructor(){
        super()

        this.state = {
            seasonDetail : ""
        }
    }

    renderEpisode = ( seasonDetail ) => {
        if(seasonDetail) {
            return seasonDetail.episodes.map((item) => {
                return(
                    <div >
                                 <h2 style={{color:"whitesmoke"}}>{item.episode_number}. {item.name}</h2>
                                <StarRatings
                                        rating={item.vote_average}
                                        starRatedColor="blue"
                                        numberOfStars={10}
                                        name='rating'
                                        starDimension="25px"
                                        starSpacing="5px"
                                />
                                <p style={{color:"#DCDCDC",fontSize:"20px",fontWeight:"bold"}}>{item.overview}</p>
                                <div style={{display:"flex",justifyContent:"space-between",marginRight:"20px"}}>
                                    <h3 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Air Date : </span>{item.air_date} </h3>
                                </div>
                    </div>
                )
            })
        }
    }

    renderSeason = ( seasonDetail ) => {
        if(seasonDetail) {
                return(
                    <div className="container">
                        <div className="sub" style={{overflow:"auto"}}>
                        
                                <div className="main">
                                        <img style={{width:"100%"}} src={`${ImgUrl}/${seasonDetail.poster_path}`} alt="pic not available"></img>
                                </div>
                                
                                <div className="right" style={{overflowY:"scroll",height:"800px"}}>

                                    {this.renderEpisode(this.state.seasonDetail)}
                                                                    
                                </div>
                        </div>
                    </div>
                )
        }
    }
    render() {
        return (
            <div>
                    {this.renderSeason(this.state.seasonDetail)}
            </div>
        )
    }

    componentDidMount() {
        fetch(SeasonURL)
        .then((res) => res.json() )
        .then((data) => this.setState({seasonDetail:data}) )
    }
}

export default Seasondetail
