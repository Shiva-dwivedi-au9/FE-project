import React, { Component } from 'react'
const CreditMoviesURL = "https://api.themoviedb.org/3/tv/"
const url2 = "/credits?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const ImgUrl = "https://image.tmdb.org/t/p/w300"

export default class CreditMovies extends Component {
    constructor(){
        super()
        this.state = {
            Credit : ""
        }
    }
    renderCredit = (data) => {
        if(data){
          return data.cast.map((item) => {
          
            return(
              < div style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px"}} >
                     <h2 style={{color:"teal",textAlign:"center"}} key={item.id}>{item.name}</h2>
                     <h2 style={{color:"white",textAlign:"center"}}>Role played : {item.character}</h2>
                    <img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.profile_path}`}></img>
              </ div>
            )
          })
        }
      }
    render() {
     
        return (
            <div>
                <h1>Credit</h1>
                <div style={{display:"flex",flexWrap:"wrap",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',justifyContent:"center",alignItems:"center"}} >
                {this.renderCredit(this.state.Credit)}
                </div>
            </div>
        )
    }
    
    componentDidMount(){
        const Credit_id = sessionStorage.getItem("tvid")
        const CreditURL = CreditMoviesURL  + Credit_id + url2

        fetch(CreditURL)
        .then((res) => res.json())
        .then((data) => {this.setState({Credit:data})})
    }
}
