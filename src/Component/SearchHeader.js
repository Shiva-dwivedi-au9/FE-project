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
                const viewMovie = (e) => {

                    const New_val  ={ 'id' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}

                    if (localStorage.getItem("movieList") == null) {
                        localStorage.setItem("movieList" , '[]')
                    }
          
                    var Old_val = JSON.parse(localStorage.getItem("movieList"))
                    Old_val.push(New_val)
          
                    localStorage.setItem("movieList" , JSON.stringify(Old_val))

                    sessionStorage.setItem("id",item.id)
                   
                    // if(window.location.pathname.split("/")[1] == "details" || window.location.pathname.split("/")[1] == "info"){
                        // window.location.reload()
                    // }
                    this.setState({val:""})
                    this.setState({suggestions:""})
                }

                const viewTv = (e) => {
                    const New_val  ={ 'tvid' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}

                    if (localStorage.getItem("TVList") == null) {
                        localStorage.setItem("TVList" , '[]')
                    }

                    var Old_val = JSON.parse(localStorage.getItem("TVList"))
                    Old_val.push(New_val)

                    localStorage.setItem("TVList" , JSON.stringify(Old_val))
                    

                    sessionStorage.setItem("tvid",item.id)
                    sessionStorage.setItem("seriesName",item.title || item.name)
                    this.setState({val:""})
                    this.setState({suggestions:""})
                }

                return(
                    <div style={{width:"400px",textAlign:"center"}}>
                     { item.media_type == "movie" &&  <Link onClick={viewMovie} to={`/details/${item.id}`} target="_blank"><h4>{item.name} {item.title}</h4></Link> }
                    {  item.media_type == "tv" &&  <Link onClick={viewTv} to={`/info/${item.id}`} target="_blank"><h4>{item.name}{item.title}</h4></Link> }
                    </div>
                                       
                )
            })
        }
    }
    render() {
        return (
            <div className="scroll" style={{position:"absolute",zIndex:"1",top:"0",right:"0"}}>
                <input onChange={this.handleChange.bind(this)} value={this.state.val} type="text" placeholder="Enter Keywords to search"  style={{width:"90%",marginLeft:"30px"}}/>
                <div style={{overflowY:"scroll",minWidth:"400px",height:"400px"}}>
                    {this.renderSuggestions(this.state.suggestions)}
                </div>
            </div>
        )
    }
}

export default SearchHeader