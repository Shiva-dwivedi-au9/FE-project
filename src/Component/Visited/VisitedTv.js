import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const ImgUrl = "https://image.tmdb.org/t/p/w300"

export class VisitedTv extends Component {

    constructor ( ) {
        super() 
        this.state = {
            visited: []
        }
    }
    handleClick = (e) => {
        localStorage.removeItem("TVList");
        this.setState({visited:[]})
    }
   
    renderTV = (movies) => {
   
        if(movies) {
            return movies.map((item) => {
    
                const viewMore = (e) => {
                    sessionStorage.setItem("tvid",item.tvid)  
                    sessionStorage.setItem("seriesName",item.name)
                }
    
                return (
                <div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"300px",height:"100%"}} >
                        
                        <h2 style={{color:"#DCDCDC",textAlign:"center"}} >{item.name}</h2>
                        <Link onClick={viewMore} to={`/info/${item.tvid}`}><img style={{width:"100%"}} src={`${ImgUrl}/${item.img}`}></img></Link> 
                
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
                        {this.renderTV (this.state.visited)}
                    </div>
            </div>
        )
    }

    componentDidMount() {
        const TV = JSON.parse(localStorage.getItem('TVList'));
        setTimeout(
            () => this.setState({ visited: TV }), 
            500
          );
    }

}

export default VisitedTv