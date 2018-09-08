import React, { Component } from 'react';
import PlayerPoints from './playerPoints'

export default class PlayersPoints extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const players = this.props.players;
        const isActive = this.props.isActivetab;
    console.log(players);
    console.log(players[0]);
    return (
      <div className="table table-responsive"> 
        <table id="pla-table" className="table table-sm">
          <thead className="table-dark">
            <tr>
              <th></th>
              {/* <th>Rank</th> */}
              <th>Player</th>
              <th className="text-center"></th>
              { <th>Points</th>
              /*<th>Form</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody >
            {players.map(player =>
              <PlayerPoints key={player.id} player={player} />
            )}
          </tbody>
        </table>

        {players.length==0 && <h4 className="text-center">No players selected.</h4>}
      </div>
    )
  }
}