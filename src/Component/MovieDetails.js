import React, { Component } from 'react'
import SimilarMovies from './SimilarMovies'
import Movies from './RecommendedMovies'
import Credit from './MovieCredits'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const api_key = "api_key=76a3351cce68be3d7eaa350f43ad5644"
const TrailerUrl = "https://api.themoviedb.org/3/movie/"
const YoutubeUrl = "https://www.youtube.com/embed/"

export default class MovieDetails extends Component {
    constructor(){
        super()
        this.state = {
            details : "",
            moreDetails:""
        }
    }
    renderDetails =(details) => {
        if(details) {
            return details.results.map((item) => {
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
        console.log( this.state.moreDetails)
        return (
            <div>
                {this.renderDetails(this.state.details)}
                <button onClick={this.handleBack}>Go back</button>
                
                <Tabs>
                    <TabList>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Cast</Tab>
                            <Tab style={{fontSize:"25px",fontWeight:"bold"}}>Similar Movies</Tab>
                            <Tab  style={{fontSize:"25px",fontWeight:"bold"}}>Recommended Movies</Tab>

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
                </Tabs>
            </div>
        )
    }

    componentDidMount(){
        const id = sessionStorage.getItem("id")
        URL = TrailerUrl + id +  "/videos?"+ api_key + "&language=en-US"

       const  detailUrl = TrailerUrl  + id + "?" + api_key + "&language=en-US"
        console.log("new id " , id)
        console.log("real url " , detailUrl)
        fetch(URL)
        .then((res) => res.json())
        .then((data) => this.setState({details:data}))

        fetch(detailUrl)
        .then((res) => res.json())
        .then((data) => this.setState({moreDetails:data}))

    }
}
