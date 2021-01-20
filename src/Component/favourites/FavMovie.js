import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const ImgUrl = "https://image.tmdb.org/t/p/w300"

export class FavMovie extends Component {

    constructor ( ) {
        super() 
        this.state = {
            favourite: []
        }
    }
    handleClick = (e) => {
        localStorage.removeItem("FavouriteMovie");
        this.setState({favourite:[]})
    }
   
    renderMovie = (movie) => {
   
        if(movie) {
            return movie.map((item) => {
    
                const viewMore = (e) => {
                    sessionStorage.setItem("id",item.id)  
                }
    
                return (
                <div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"300px",height:"100%"}} >
                        
                        <h2 style={{color:"#DCDCDC",textAlign:"center"}} >{item.name}</h2>
                        <Link onClick={viewMore} to={`/details/${item.id}`}><img style={{width:"100%"}} src={`${ImgUrl}/${item.img}`}></img></Link> 
                
                </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                    <button onClick={this.handleClick}>CLEAR LIST</button>
                    <div  style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                        {this.renderMovie (this.state.favourite)}
                    </div>
            </div>
        )
    }

    componentDidMount() {
        const Movie = JSON.parse(localStorage.getItem('FavouriteMovie'));

        setTimeout(
            () => this.setState({ favourite: Movie }), 
            500
          );
    }

}

export default FavMovie