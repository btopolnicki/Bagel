import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import * as firebase from 'firebase/app';

export default class Navigation extends Component{
    constructor(props) {
        super(props);

        this.state = {
            authUser: null
          }

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(authUser => {
          if (authUser) {
            this.setState({ authUser })
            console.log("user:" + authUser);
    
          } else {
            this.setState({ authUser: null, isLoading:false });
            console.log("no user");
          }
        });
    
      }

    render() {

        const {authUser} =  this.state;

        console.log("Render nav")
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Bagel</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                { authUser && 
                    <ul className="navbar-nav mr-auto">
                         <li className="nav-item">
                        <NavLink className="nav-link" to="/">{"Wellcome " + authUser.displayName}</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Your picks <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/leaderBoard">Leaderboard <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signOut">Sign out</NavLink>
                        </li>                    
                    </ul>
                }
                   { !authUser &&   
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/logIn">Sign in </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signUp">Sign up</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logIn">Forgot password <span className="sr-only">(current)</span></NavLink>
                        </li>                    
                    </ul>
                }

                </div>
            </nav>
        )
    }
}