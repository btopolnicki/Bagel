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

    render() {

        if (this.state.isLoading) {
            return "loading...";
        }

        const selectedWeek = this.props.selectedWeek;
        const matches = this.formatMatches(this.state.matches[selectedWeek]);


        return (
            //             <div id="accordion">
            //   <div class="card">
            //     <div class="card-header" id="heading One">
            //       <h5 class="mb-0">
            //         <button class="btn btn-link" data-toggle="collapse" data-target="#collapse One" aria-expanded="true" aria-controls="collapse One">
            //           Collapsible Group Item #1
            //         </button>
            //       </h5>
            //     </div>

            //     <div id="collapse One" class="collapse show" aria-labelledby="heading One" data-parent="#accordion">
            //       <div class="card-body">
            //         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            //       </div>
            //     </div>
            //   </div>

            //   <div class="card">
            //     <div class="card-header" id="headingTwo">
            //       <h5 class="mb-0">
            //         <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            //           Collapsible Group Item #2
            //         </button>
            //       </h5>
            //     </div>
            //     <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            //       <div class="card-body">
            //         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            //       </div>
            //     </div>
            //   </div>

            // </div>

            <div>
                <h3>Results</h3>
                <div id="accordion">
                    {matches.map(tournament =>

                        <div class="card" key={tournament.tournament}>
                            <div class="card-header" id={"heading" + tournament.tournament.replace(/\s/g, '')} data-toggle="collapse" data-target={"#" + tournament.tournament.replace(/\s/g, '')} >
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target={"#" + tournament.tournament.replace(/\s/g, '')} aria-expanded="false" aria-controls={tournament.tournament}>
                                        {tournament.tournament}
                                    </button>
                                </h5>
                            </div>

                            <div id={tournament.tournament.replace(/\s/g, '')} class="collapse" aria-labelledby={"heading" + tournament.tournament.replace(/\s/g, '')} data-parent="#accordion">
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

            matchesBytournament.push({ tournament: groupedBytournament[key][0].tournamentName, rounds: matchesByround });
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