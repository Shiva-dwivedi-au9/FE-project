    import React, { Component } from 'react';
    import logindetails from './logindetails.json';
    import Googlelogin from 'react-google-login'
    import {Link} from 'react-router-dom'
    import './login.css'

    class glogin extends Component{
        constructor(){
            super()
            this.state={
                name: sessionStorage.getItem('UDetails'),
                isSignedIn:""
            }
        }
        googlelogin = (response) => {
            if(!response || !response.accessToken){
                alert("Error While Login")
            }
            sessionStorage.setItem('UDetails',response.profileObj.name)
            this.setState({isSignedIn:"true"})
            localStorage.setItem("loggedin" , "true")
        }

        render() { 
            return ( 
                <React.Fragment>
                        {this.state.isSignedIn !== "true" ?
                        <Googlelogin
                            clientId={logindetails.clientid}
                            buttonText="Login"
                            onSuccess={this.googlelogin}
                            onFailure={this.googlelogin}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        /> :
                        <div className="logout">
                             <h5>Welcome {this.state.name}</h5>
                        </div>
                        }
                        
                </React.Fragment>
            );
        }
    }
    
    export default glogin;