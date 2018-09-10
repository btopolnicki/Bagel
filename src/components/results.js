import React, { Component } from 'react';
import * as routes from '../routes';
import * as _ from 'lodash';
import MatchResult from './matchResult';
import * as firebase from 'firebase/app';

export default class WeekResults extends Component {
    constructor(props) {
        super(props);

        this.state = { matches: [], isLoading: true };

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

                    me.getWeeksResults()
                        .then(data => {
                            me.setState({ matches: data, isLoading: false });
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
        const matches = this.formatMatches(this.state.matches[selectedWeek]);


        return (

            <div>
                <div id="accordion">
                    {matches.map(tournament =>

                        <div class="card" key={tournament.tournament}>
                            <div class="card-header" id={"heading" + tournament.tournamentId} data-toggle="collapse" data-target={"#" + tournament.tournamentId}>
                                <div class="mb-0">
                                    <button className="touchButton" data-toggle="collapse" data-target={"#" + tournament.tournamentId} aria-expanded="false" aria-controls={tournament.tournament}>{tournament.tournament}</button>
                                </div>
                            </div>

                            <div id={tournament.tournamentId} class="collapse" aria-labelledby={"heading" + tournament.tournamentId} >
                                <div class="card-body">

                                    {tournament.rounds.map(round => <div key={tournament.tournament + round.round}>
                                        <h5>{round.round}</h5>
                                        <div>{}</div>
                                        {round.matches.map(match =>
                                            <MatchResult match={match} key={match.matchId}></MatchResult>
                                        )}
                                    </div>)}
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

            matchesBytournament.push({ tournament: groupedBytournament[key][0].tournamentName, tournamentId:groupedBytournament[key][0].tournamentId.replace(/:/gi,"-"), rounds: matchesByround });
        }


        console.log(matchesBytournament);

        return matchesBytournament;
    }

    getWeeksResults() {

        var myInit = {
            method: 'GET',
            headers: { "Authorization": this.token },
            cache: 'default'
        };

        return fetch(routes.API_ROOT + "points/weekresults/" + this.props.week, myInit) //change to use week and fetch the players
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