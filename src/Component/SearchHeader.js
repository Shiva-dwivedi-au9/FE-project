import React, { Component } from 'react'
import {Link , Redirect} from 'react-router-dom'

const MultiSearch = "https://api.themoviedb.org/3/search/multi?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query="
const DefaultSearch ="https://api.themoviedb.org/3/search/multi?api_key=76a3351cce68be3d7eaa350f43ad5644&language=en-US&page=1&include_adult=false&query=_"
let url 

export class SearchHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            suggestions : "",
            val:""
        }
    }
    handleChange=(e) => {
        const search = e.target.value
        this.setState({val:search})
        if(search){
            url = `${MultiSearch}${search}`
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
                    // if(window.location.pathname.split("/")[1] == "details" || window.location.pathname.split("/")[1] == "info"){
                        // window.location.reload()
                    // }
                    console.log("media_type",item.media_type)
                    this.setState({val:""})
                    this.setState({suggestions:""})
                }
                return(
                    <div style={{width:"400px",textAlign:"center"}}>
                     { item.media_type == "movie" &&  <Link onClick={viewMore} to={`/details/${item.id}`} target="_blank"><h4>{item.name} {item.title}</h4></Link> }
                    {  item.media_type == "tv" &&  <Link onClick={viewMore} to={`/info/${item.id}`} target="_blank"><h4>{item.name}{item.title}</h4></Link> }
                    </div>
                                       
                )
            })
        }
    }
    render() {
        return (
            <div style={{position:"absolute",zIndex:"1",top:"0",right:"0",backdropFilter:'blur(5px)'}}>
                <input onChange={this.handleChange.bind(this)} value={this.state.val} type="text" placeholder="Enter Keywords to search"  style={{width:"90%"}}/>
                <div >
                    {this.renderSuggestions(this.state.suggestions)}
                </div>
            </div>
        )
    }
}

export default SearchHeader