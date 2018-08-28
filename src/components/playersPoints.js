import React, { Component } from 'react';
import PlayerPoints from './playerPoints'

export default class PlayersPoints extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const players = this.props.players;
    const isActive = this.props.isActivetab;
    console.log(isActive);
    return (
      <div className="table table-responsive"> 
        <table id="pla-table" class="table table-sm">
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
      </div>
    )
  }
}