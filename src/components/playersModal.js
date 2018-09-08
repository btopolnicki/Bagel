import React, {Component} from 'react';
import PlayerDetails from './playerDetail';

export default class PlayersModal extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
       
        const players = this.props.players;
        const category = this.props.category
         return (
             players.map(player=>
                <PlayerDetails key={player.id} player={player} category={category}/>         )       
        )
    }
}