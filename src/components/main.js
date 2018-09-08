import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login';
import SignUp from './signUp';
import Home from './home';
import SignOut from './signOut';
import LeaderBoard from './leaderBoard';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signUp" component={SignUp} />
                <Route exact path="/signOut" component = {SignOut}/>
                <Route exact path="/leaderBoard" component = {LeaderBoard}/>
                <Route path="/" component={Home} />
            </Switch>
        )
    };
}  