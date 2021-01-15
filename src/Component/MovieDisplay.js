import React from 'react'
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import '../Main.css'
const ImgUrl = "https://image.tmdb.org/t/p/w300"
 

export default function MovieDisplay(props) {

    const renderMovies = ({display}) => {
        if(display) {
                return display.results.map((item) => {
                    const  viewMore = (e) =>{
                        sessionStorage.setItem("id",item.id)
                        window.location.reload()
                    }
                  return(
                    < div style={{background:"burlywood",margin:"20px",width:"100%",backgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)'}} >
                        <h2 style={{marginLeft:"30px",color:"teal",fontSize:"40px"}}>{item.title} {item.original_name}</h2>   
                        <div style={{display:"flex"}}>
                            <img style={{margin:"30px"}} src={`${ImgUrl}/${item.poster_path}`} alt="pic not available"></img>
                            <p style={{marginTop:"50px",fontSize:"20px",fontWeight:'bold'}}>
                                <p style={{color:"silver"}}>{item.overview}</p>
                                <h4>Popularity : {item.popularity}</h4>
                                <h4><span style={{color:"teal",fontSize:"20px"}}>Vote Average: </span> </h4> 
                                <StarRatings
                                    rating={item.vote_average}
                                    starRatedColor="blue"
                                    numberOfStars={10}
                                    name='rating'
                                    starDimension="40px"
                                    starSpacing="10px"
                            />
                                <h4>Vote Count : {item.vote_count}</h4>
                                <h4>Release Date : {item.release_date}{item.first_air_date}</h4>
                                <button onClick={viewMore} value={item.id}><Link to={`/details/${item.id}`}>View</Link></button>
                            </p>

                        </div>                
                        
                    </ div>
                   
                  )
                 
                })
          
        }
            
    }
   
    return (
        <div >
            <div   style={{display:"flex",flexWrap:"wrap"}}>
                   {renderMovies(props)}
            </div>
        </div>
    )
}
