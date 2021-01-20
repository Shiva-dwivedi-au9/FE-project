import React, { Component } from 'react';
import logindetails from './logindetails.json';
import Googlelogin from 'react-google-login'
import './login.css'

const status = localStorage.getItem("loggedin")

    class glogin extends Component{
        constructor(){
            super()
            this.state={
                name: sessionStorage.getItem('UDetails'),
            }
        }
        googlelogin = (response) => {
            if(!response || !response.accessToken){
                alert("Error While Login")
            }
            sessionStorage.setItem('UDetails',response.profileObj.name)
            localStorage.setItem("loggedin" , "true")
            console.log(sessionStorage.getItem('UDetails'))
            window.location.reload()
        }

        logout = () => {
            localStorage.removeItem('udetails');
            localStorage.removeItem("loggedin" , "false")
            window.location.reload()
        }

        render() { 
            return ( 
                <React.Fragment>
                                       
                        {status !== "true" ?
                        <Googlelogin
                            clientId={logindetails.clientid}
                            buttonText="Login"
                            onSuccess={this.googlelogin}
                            onFailure={this.googlelogin}
                            cookiePolicy={'single_host_origin'}
                            /> :
                            <div className="logout">
                            <h5>Welcome {this.state.name}</h5>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                        }
                   
                </React.Fragment>
            );
        }
    }
    
    export default glogin;