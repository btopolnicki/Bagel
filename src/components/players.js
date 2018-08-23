import React, { Component}  from 'react';
import Player from './player'

export default class Players extends Component {
    constructor (props){
        super(props);

    }

    render(){

        const players = this.props.players;
        const category = this.props.category;
        const isActive = this.props.isActivetab;
      console.log(isActive);
        return (
        <div id={category} className={isActive == "true" ? 'tab-pane fade show active' : 'tab-pane fade show'}>
          <table id="pla-table" className="table table-responsive table-sm pla-table">
            <thead className="table-dark">
              <tr>
                <th></th>
                <th>Rank</th>
                <th>Player</th>
                <th className="text-center">Nationality</th>
                <th>Points</th>
                <th>Form</th>
                <th></th>
              </tr>
            </thead>
            <tbody >
            {players.map(player =>
                <Player key={player.id} player={player}/>              
              )}
              </tbody>
          </table>
        </div>
        )
    }
}