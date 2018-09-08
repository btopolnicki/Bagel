import React, {Component} from 'react';

export default class SelectPlayer extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    handleClick(event){
        event.preventDefault();
        this.props.onPlayerDropped(this.props.player)
        // this.props.player.isSelected = !this.props.player.isSelected;
        // this.setState({player:this.props.player});
        // //HttpRequest to update the selecction in the database
    }

    
    render(){
       
        const player = this.props.player;
         return (
             <tr >
             <td> {player.isSelected && <span className="badge-pill badge-primary" data-toggle="modal" data-target={"#playerDetail" + player.category + player.id} aria-hidden="true">{!player.isSelected ? '' : 'i'}</span>}</td>
             <td className= 'text-center'>{player.rank}</td>
             <td className=''>{player.name}</td>
             <td className='text-center'><span className={player.isoCountry !="" ? "flag-icon flag-icon-"+player.isoCountry : ''}></span></td>
              <td><span onClick={event =>{this.handleClick(event)}} className={!player.isSelected ? 'badge badge-success noselect' : 'badge badge-secondary noselect'}>{!player.isSelected ? '' : 'Drop'}</span></td> 
           </tr>          
        )
    }
}