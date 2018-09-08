import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import * as routes from '../routes';

export default class LeaderBoard extends Component {
    constructor(props) {
        super(props);

        this.state = { leaderBoard: [], loading: true };
        this.token = "";
    }

    componentDidMount() {

        return firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {

                console.log('user auth ok');
                const me = this;
                return authUser.getIdToken().then(function (token) {

                    'Authorization', 'Bearer ' + token
                    me.token = 'Bearer ' + token;

                    return me.fetchData(authUser);
                });

            } else {
                console.log("no user");
                // this.setState({ authUser: null, isLoading: false });
            }
        });
    }


    fetchData() {


        var myInit = {
            method: 'GET',
            headers: { "Authorization": this.token },
            cache: 'default'
        };

        return fetch(routes.API_ROOT + "users/leaderboard/", myInit) //change to use week and fetch the players
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                //console.log(data);
                console.log(data.leaderboard);
                this.setState({ leaderBoard: data.leaderboard, loading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        if (this.state.loading) {
            return "Loading...";
        }

        // console.log(this.state.leaderBoard);

        // this.state.leaderBoard.map(p=>console.log(p));

        return (
            <div className="page-container">
                <div className="container">
                    <h3 className='text-center'>LeaderBoard</h3>
                    <div className="table table-responsive">
                        <table id="pla-table" className="table table-sm">
                            <thead className="table-dark">
                                <tr>
                                    <th className='text-center'>Rank</th>
                                    <th>Player</th>
                                    <th className='text-center'>Points</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.leaderBoard.map(player =>
                                    <tr key={player.position}>
                                        <td className='text-center'>{player.position}</td>
                                        <td >{player.name}</td>
                                        <td className='text-center'>{player.points}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}