import React, {Component} from 'react';

export default class Player extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    handleClick(){
        this.props.player.isSelected = !this.props.player.isSelected;
        this.setState({player:this.props.player});
        //HttpRequest to update the selecction in the database
    }

    render(){
       
        const player = this.props.player;
         return (
             <tr >
             <td><span className="badge-pill badge-primary" data-toggle="modal" data-target="#playerModal" aria-hidden="true">i</span></td>
             <td className={!player.isSelected ? 'text-center' : 'text-center select'}>{player.rank}</td>
             <td className={!player.isSelected ? '' : 'select'}>{player.givenName} {player.familyName}</td>
             <td className={!player.isSelected ? 'text-center' : 'text-center select'}>{player.nationality}</td>
             <td className={!player.isSelected ? 'text-center' : 'text-center select'}>2053</td>
             <td className={!player.isSelected ? 'text-center' : 'text-center select'}>12.4</td>
             <td><span onClick={event =>{this.handleClick()}} className={!player.isSelected ? 'badge badge-success noselect' : 'badge badge-secondary noselect'}>{!player.isSelected ? 'Select' : 'Drop'}</span></td>
           </tr>          
        )
    }
}