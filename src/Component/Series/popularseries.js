import React, { Component } from 'react'
import  '../../Main/Main.css'
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import loader from '../../Images/loader.gif'
const PopularURL = "https://api.themoviedb.org/3/tv/popular?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1"
const ImgUrl = "https://image.tmdb.org/t/p/w300"


export default class Popular extends Component {

    constructor(){
        super()
        this.state = {
            popular:""
        }
      }

      renderPopular=(data) => {
        if(data){
          return data.results.map((item) => {
            const  viewMore = (e) =>{

                const New_val  ={ 'tvid' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}

                if (localStorage.getItem("TVList") == null) {
                    localStorage.setItem("TVList" , '[]')
                }

                var Old_val = JSON.parse(localStorage.getItem("TVList"))
                Old_val.push(New_val)

                localStorage.setItem("TVList" , JSON.stringify(Old_val))

                
              sessionStorage.setItem("tvid",item.id)  
              sessionStorage.setItem("seriesName",item.title || item.original_name)

            }
            return(
              < div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px",height:"100%"}} >
                 <h2 style={{color:"teal",textAlign:"center"}} key={item.id}>||| {item.original_name}{item.title} |||</h2>
                <Link onClick={viewMore} to={`/info/${item.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> 
                <div style={{margin:"55px"}}>
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Popularity : </span>  {item.popularity}</h4> 
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Release Date : </span> {item.release_date} {item.first_air_date}</h4>
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Average: </span> </h4> 
                    <StarRatings
                        rating={item.vote_average}
                        starRatedColor="blue"
                        numberOfStars={10}
                        name='rating'
                        starDimension="25px"
                        starSpacing="2px"
                  />
                    <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Count : </span>{item.vote_count} </h4>
                </div>
              
              </ div>
             
            )
          })
    
        }else{
          return(
            <div>
              <img src={loader} />
            </div>
          )
        }
      }
      
    render() {
        return (
            <div className="trending">
                     <div  style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                    {this.renderPopular(this.state.popular)}
            </div>
            </div>
        )
    }

    componentDidMount(){
        fetch(PopularURL)
        .then((res)=>res.json())
        .then((data) => {
          this.setState({popular:data})
      })

    }
}