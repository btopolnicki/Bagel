import React, { Component } from 'react';
import Player from './player'

export default class Players extends Component {
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
              <Player onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)} key={player.id} onPlayerDropped={selectedPlayerId => this.props.onPlayerDropped(selectedPlayerId)} player={player} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}