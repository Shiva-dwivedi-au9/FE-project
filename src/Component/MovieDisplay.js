import React from 'react'
const ImgUrl = "https://image.tmdb.org/t/p/w300"
 

export default function MovieDisplay(props) {

    const renderMovies = ({display}) => {
        if(display) {
                return display.results.map((item) => {
                  return(
                    < div >
                        <h3>{item.title} {item.original_name}</h3>                   
                        <img style={{margin:"30px"}} src={`${ImgUrl}/${item.poster_path}`} alt="pic not available"></img>
                    </ div>
                   
                  )
                })
          
        }
        else{
            return(
                <>Sorry try something else</>
            )
        }
    }
    return (
        <div>
            <h1>Search Results</h1>
            {renderMovies(props)}
        </div>
    )
}
