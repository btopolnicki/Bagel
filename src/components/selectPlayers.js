import React, { Component } from 'react';
import SelectPlayer from './selectPlayer'

export default class SelectPlayers extends Component {
  constructor(props) {
    super(props);

  }

  fillGaps(players){
    var newPlayers = []
    

      for (let c=0; c <5; c++){
        if (c< players.length){
          newPlayers.push(players[c])
        }else{
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
              <SelectPlayer onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)} key={player.id} player={player} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}