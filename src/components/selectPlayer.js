import React, {Component} from 'react';

export default class SelectPlayer extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    handleClick(){
        this.props.onPlayerSelected(this.props.player)
        // this.props.player.isSelected = !this.props.player.isSelected;
        // this.setState({player:this.props.player});
        // //HttpRequest to update the selecction in the database
    }

    
    render(){
       
        const player = this.props.player;
         return (
             <tr >
             <td> {player.isSelected && <span className="badge-pill badge-primary" data-toggle="modal" data-target={"#playerDetail" + player.id} aria-hidden="true">{!player.isSelected ? '' : 'i'}</span>}</td>
             <td className= 'text-center'>{player.rank}</td>
             <td className=''>{player.name}</td>
             <td className='text-center'><span class={"flag-icon flag-icon-"+player.isoCountry}></span></td>
             {/* <td className={!player.isSelected ? 'text-center' : 'text-center select'}>{player.points}</td> */}
             {/* <td className={!player.isSelected ? 'text-center' : 'text-center select'}>12.4</td> */}
             <td><span onClick={event =>{this.handleClick()}} className={!player.isSelected ? 'badge badge-success noselect' : 'badge badge-secondary noselect'}>{!player.isSelected ? '' : 'Drop'}</span></td>
           </tr>          
        )
    }
}