import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const api_key = "api_key=76a3351cce68be3d7eaa350f43ad5644"
const TrailerUrl = "https://api.themoviedb.org/3/tv/"
const ImgUrl = "https://image.tmdb.org/t/p/w500"

export class SeasonDisplay extends Component {

    constructor(){
        super()
        this.state = {
            season : "",
            seriesName : sessionStorage.getItem("seriesName")
        }
    }

    renderSeason = ( season ) => {
        if(season) {
            return season.seasons.map((item) => {
                const seasonNum = (e) => {
                    sessionStorage.setItem("seasonNo" , item.season_number)
                }
                return(
                    <div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"300px",height:"600px"}} >
                     
                    <h2  style={{color:"teal",textAlign:"center"}} key={item.id}>{item.name}</h2>
                    <h3 style={{color:"silver",textAlign:"center"}}>Episodes : {item.episode_count}</h3>
                    <h3  style={{color:"teal",textAlign:"center"}}> Aired on : {item.air_date}</h3>
                    <Link onClick={seasonNum} to={`/season/${this.state.seriesName}/${item.season_number} `} target='_blank'><img style={{width:"100%"}} src={`${ImgUrl}/${item.poster_path}`} /> </Link>
                                                                                                                           
                   </div>
                )
            })
        }
    }  

    render() {
        return (
            <div  style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                        {this.renderSeason(this.state.season)}
                </div>
                
        )
    }

    componentDidMount(){
        
        const id = sessionStorage.getItem("tvid")
        
        const  detailUrl = TrailerUrl  + id + "?" + api_key + "&language=en-US"
    
        fetch(detailUrl)
        .then((res) => res.json())
        .then((data) => this.setState({season:data}))

    }
}

export default SeasonDisplay
