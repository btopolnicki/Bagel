import React, { Component } from 'react';
import * as routes from '../routes';
import * as _ from 'lodash';
import MatchResult from './matchResult';
import * as firebase from 'firebase/app';

export default class Tournaments extends Component {
    constructor(props) {
        super(props);

        this.state = { tournaments: [], isLoading: true };

        this.token = "";
    }

    componentWillMount() {

        return firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {

                console.log('user auth ok');
                const me = this;
                return authUser.getIdToken().then(function (token) {

                    'Authorization', 'Bearer ' + token
                    me.token = 'Bearer ' + token;

                    me.gettournaments()
                        .then(data => {
                            console.log("tournaments");
                            console.log(data)
                            me.setState({ tournaments: data, isLoading: false });
                        });
                });


            } else {
                console.log("no user");
                this.setState({ authUser: null, isLoading: false });

            }
        });
    }

    handleTouchStart(event) {
        console.log(event);
        window.alert(event.target.id);
        $(event.target.data - target).toggle()
    }

    render() {

        if (this.state.isLoading) {
            return "loading...";
        }

        const selectedWeek = this.props.selectedWeek;

        if (this.state.tournaments.length == 0){
            return "";
        }

        const tournaments = this.state.tournaments.map(tournament => {
            // console.log(tournament.tournament);
            if (tournament == null){
                return null;
            }
            const tour = tournament;
            tour["formatedId"] = tournament.tournament.id.replace(/:/gi, "-");
            return tour
        });
        console.log(tournaments);

        return (

            <div>
                <br/>
                <h4>Tournament information</h4>
                <div id="accordion">
                    {tournaments.map(tournament =>

                        <div class="card" key={tournament.tournament.name}>
                            <div class="card-header" id={"heading" + tournament.formatedId} data-toggle="collapse" data-target={"#" + tournament.formatedId}>
                                <div class="mb-0">
                                    <button className="touchButton" data-toggle="collapse" data-target={"#" + tournament.formatedId} aria-expanded="false" aria-controls={tournament.formatedId}>{tournament.tournament.name}</button>
                                </div>
                            </div>

                            <div id={tournament.formatedId} class="collapse" aria-labelledby={"heading" + tournament.formatedId} >
                                <div class="card-body">
                                    <div>Category: {tournament.tournament.category.level}</div>
                                    <div>Surface: {tournament.info.surface}</div>
                                    <div>Price money: {tournament.info.prize_currency + tournament.info.prize_money}</div>
                                    <br/>
                                    <div className="table table-responsive tournamentInfo">
                                        <table id="pla-table" className="table table-sm">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Rank</th>
                                                    <th>Player</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {tournament.competitors.map(competitor =>
                                                    <tr key={competitor.name} >
                                                        <td>{competitor.rank}</td> 
                                                        <td >{competitor.name} </td>
                                                    </tr>

                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <table className="table-responsive"></table>


                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }


    formatMatches(matches) {

        var groupedBytournament = _.groupBy(matches, 'tournamentId');

        const matchesBytournament = [];
        for (const key in groupedBytournament) {

            var groupedByRound = _.groupBy(groupedBytournament[key], 'round');

            const matchesByround = [];
            for (const roundKey in groupedByRound) {

                matchesByround.push({ round: roundKey, matches: groupedByRound[roundKey] })
            }

            matchesBytournament.push({ tournament: groupedBytournament[key][0].tournamentName, tournamentId: groupedBytournament[key][0].tournamentId.replace(/:/gi, "-"), rounds: matchesByround });
        }


        console.log(matchesBytournament);

        return matchesBytournament;
    }

    gettournaments() {

        var myInit = {
            method: 'GET',
            headers: { "Authorization": this.token },
            cache: 'default'
        };

        return fetch(routes.API_ROOT + "tournaments/info/" + this.props.selectedWeek, myInit) //change to use week and fetch the players
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .catch(error => {
                console.log(error);
                //        this.setState({ error, isLoading: false })
            });

    }
}