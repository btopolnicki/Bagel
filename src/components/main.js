import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login';
import SignUp from './signUp';
import Home from './home';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/" component={Home} />
            </Switch>
        )
    };
}  