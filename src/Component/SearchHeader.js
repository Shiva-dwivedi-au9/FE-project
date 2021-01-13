import React, { Component } from 'react'
import {Link , Redirect} from 'react-router-dom'

const MultiSearch = "https://api.themoviedb.org/3/search/multi?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query="
const DefaultSearch ="https://api.themoviedb.org/3/search/multi?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query=_"
let url 

export class SearchHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            suggestions : ""
        }
    }
    handleChange=(e) => {
        const val = e.target.value
        if(val){
            url = `${MultiSearch}${val}`
       }
       else{
            url = DefaultSearch
       }
      
       fetch(url)
       .then((res) => res.json())
       .then((data) => {
           this.setState({suggestions:data})
       })

    }
    renderSuggestions = (data) => {
        if(data) {
            return data.results.map((item) => {
                const viewMore = (e) => {
                    sessionStorage.setItem("id",item.id)
                    sessionStorage.setItem("tvid",item.id)
                    this.setState({suggestions:""})
                    if(window.location.pathname.split("/")[1] == "details" || window.location.pathname.split("/")[1] == "info"){
                        window.location.reload()
                    }
                    
                }
                return(
                    <div style={{width:"500px"}}>
                     { item.media_type == "movie" &&  <Link onClick={viewMore} to={`/details/${item.id}`}><h4>{item.name} {item.title}</h4></Link> }
                    {  item.media_type == "tv" &&  <Link onClick={viewMore} to={`/info/${item.id}`}><h4>{item.name}{item.title}</h4></Link>}
                    
                    </div>
                   
                    
                )
            })
        }
    }
    render() {
        console.log("searchresult" , this.state.suggestions)
        return (
            <div style={{position:"absolute",zIndex:"100",bbackgroundColor:' rgba(12, 4, 12, 0.719)',backdropFilter:'blur(5px)',top:"0",right:"0"}}>
                <input onChange={this.handleChange.bind(this)} type="text" placeholder="Enter Keywords to search"  style={{width:"500px"}}/>
                <div >
                    {this.renderSuggestions(this.state.suggestions)}
                </div>
            </div>
        )
    }
}

export default SearchHeader
