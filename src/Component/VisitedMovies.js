import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const ImgUrl = "https://image.tmdb.org/t/p/w300"

export class VisitedMovies extends Component {

    constructor ( ) {
        super() 
        this.state = {
            visited: []
        }
    }
   
    handleClick = (e) => {
        localStorage.removeItem("movieList");
        this.setState({visited:[]})
    }
    renderMovies = (movies) => {
   
        if(movies) {
            return movies.map((item) => {
    
                const viewMore = (e) => {
                    sessionStorage.setItem("id",item.id)  
                }
    
                return (
                <div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"400px",height:"100%"}} >
                        
                        <h2 style={{color:"#DCDCDC",textAlign:"center"}} >{item.name}</h2>
                        <Link onClick={viewMore} to={`/details/${item.id}`}><img style={{margin:"30px",padding:"20px"}} src={`${ImgUrl}/${item.img}`}></img></Link> 
                
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
                {this.renderMovies (this.state.visited)}
            </div>
            </div>
        )
    }

    componentDidMount() {
        const movies = JSON.parse(localStorage.getItem('movieList'));
        setTimeout(
            () => this.setState({ visited: movies }), 
            500
          );
    }

}

export default VisitedMovies