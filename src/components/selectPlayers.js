import React, { Component } from 'react';
import SelectPlayer from './selectPlayer'

export default class SelectPlayers extends Component {
    constructor(props) {
        super(props);

    }

    fillGaps(players) {
        var newPlayers = []


        for (let c = 0; c < 5; c++) {
            if (c < players.length) {
                
                newPlayers.push({
                    id: players[c].id,
                    rank: players[c].rank,
                    name: players[c].name,
                    familyName: '',
                    nationality: players[c].nationality,
                    points: "",
                    isoCountry: players[c].isoCountry,
                    isSelected: true,
                    category:players[c].category
                });
            } else {
                newPlayers.push({
                    id: c,
                    rank: "",
                    name: "{empty slot}",
                    familyName: '',
                    nationality: "",
                    points: "",
                    isoCountry: "",
                    isSelected: false
                });
            }

        }

        return newPlayers;

    }
    render() {

        const players = this.fillGaps(this.props.players);
        const isActive = this.props.isActivetab;
        console.log(isActive);
        return (
            <div>
                <div className="table table-responsive">
                    <table id="pla-table" className="table table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th></th>
                                <th>Rank</th>
                                <th>Player</th>
                                <th className="text-center"></th>
                                {/* <th>Points</th>
              <th>Form</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            {players.map(player =>
                                <SelectPlayer  onPlayerDropped={selectedPlayerId => this.props.onPlayerDropped(selectedPlayerId)} key={player.id} player={player} />
                            )}

                        </tbody>
                    </table>
                </div>
                <button type="button" data-toggle="modal" data-target={"#selectPlayersModal"}  className="btn btn-primary btn-sm btn-block">Select players</button>
            </div>
        )
    }
}