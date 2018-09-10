import React, {Component} from 'react';

export default class Player extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    handleClick(event){
        event.preventDefault();

        if (this.props.player.isSelected){
            this.props.onPlayerDropped(this.props.player)
        }else{
            this.props.onPlayerSelected(this.props.player)
        }
      
    }

    
    render(){
       
        const player = this.props.player;
         return (
             <tr >
             <td><span className="badge-pill badge-primary" data-toggle="modal" data-target={"#playerDetail" + player.category + player.id} aria-hidden="true">i</span></td>
             <td className={!player.isSelected ? 'text-center' : 'text-center select'}>{player.rank}</td>
             <td className={!player.isSelected ? '' : 'select'}>{player.name} {player.isConfirmed && <i class="fa fa-thumbs-up player-confirmed-icon"></i>}</td>
             <td className={!player.isSelected ? 'text-center' : 'text-center select'}><span className={player.isoCountry !="" ? "flag-icon flag-icon-"+player.isoCountry : ''}></span></td>
             <td><span onClick={event =>{this.handleClick(event)}} className={!player.isSelected ? 'badge badge-success noselect' : 'badge badge-secondary noselect'}>{!player.isSelected ? 'Select' : 'Drop'}</span></td>
           </tr>          
        )
    }
}