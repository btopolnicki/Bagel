import React, { Component } from 'react';
import * as routes from '../routes';
import * as _ from 'lodash';

export default class MatchResult extends Component {
    constructor(props) {
        super(props);

        this.state = { matches: [], isLoading: true };



    }

    render() {

        const match = this.props.match;

        if(!match.competitor1.scores){
            match.competitor1["scores"] = [];
        }
        if(!match.competitor2.scores){
            match.competitor2["scores"] = [];
        }

        return (
            <div>
                <div className="table table-responsive">
                    <table id="pla-table" className="table table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Player</th>
                                <th colSpan={match.competitor1.scores.length}>Result</th>
                                {/* {match.competitor1.scores.map(score=><th></th>)} */}
                            </tr>
                        </thead>
                        <tbody >
                            <tr >
                                <td className ={match.competitor1.isWinner ? "winner":""}>{match.competitor1.name} </td>               
                                {match.competitor1.scores.map(score=><th  className ={match.competitor1.isWinner ? "winner":""}>{score}</th>)}                 
                            </tr>
                            <tr >
                                <td className ={match.competitor2.isWinner ? "winner":""}>{match.competitor2.name} </td>               
                                {match.competitor2.scores.map(score=><th  className ={match.competitor2.isWinner ? "winner":""}>{score}</th>)}                 
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
