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

                        const New_val  ={ 'id' : item.id , 'img' : item.poster_path , 'name' : item.title || item.original_name}

                        if (localStorage.getItem("movieList") == null) {
                            localStorage.setItem("movieList" , '[]')
                        }
              
                        var Old_val = JSON.parse(localStorage.getItem("movieList"))
                        Old_val.push(New_val)
              
                        localStorage.setItem("movieList" , JSON.stringify(Old_val))
    
                        sessionStorage.setItem("id",item.id)

                        sessionStorage.setItem("id",item.id)
                        window.location.reload()
                    }
                  return(
                    <div className="container" style={{margin:"10px",width:"100%"}} >

                            <div className="sub" style={{overflow:"auto"}}>
                            
                            <div className="main">
                            <img style={{width:"100%",height:"600px"}} src={`${ImgUrl}/${item.poster_path}`} alt="pic not available"></img>
                            </div>
                            
                            <div className="right">
                            
                                        <h2 style={{color:"teal",fontSize:"40px"}}>{item.title} {item.original_name}</h2>   
                                        <p style={{color:"#DCDCDC",fontSize:"20px"}}>{item.overview}</p>
                                        <StarRatings
                                                                rating={item.vote_average}
                                                                starRatedColor="blue"
                                                                numberOfStars={10}
                                                                name='rating'
                                                                starDimension="40px"
                                                                starSpacing="10px"
                                                        />
                                                            
                                                            <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Vote Count : </span>{item.vote_count}</h2>
                                                            <h2 style={{color:"teal",fontWeight:"bold"}}><span style={{color:"silver"}}>Release Date :  </span>{item.release_date}{item.first_air_date}</h2>
                                                            <button onClick={viewMore} value={item.id}><Link to={`/details/${item.id}`}>View</Link></button>
                            </div>
                            </div>
                    </div>
                   
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
