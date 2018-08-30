import React, { Component } from 'react';
import Players from './players';
import PlayersPoints from './playersPoints';
import PlayerModal from './playersModal';
import SelectPlayers from './selectPlayers';
import SelectPlayersModal from './selectPlayersModal';
import Countdown from 'react-countdown-now';

export default class CategoryTabs extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    render() {

        const atpPlayers = this.props.atpPlayers;
        const wtaPlayers = this.props.wtaPlayers;
        const selectedCategory = this.props.selectedCategory;
        const week = this.props.week;
        const isFuture = new Date(this.props.week.start_date) > Date.now();

        if (week.isOpen) {
            this.setSelectedPlayers(atpPlayers, week.selectedPlayers, "atp");
            this.setSelectedPlayers(wtaPlayers, week.selectedPlayers, "wta");

            atpPlayers.sort((p1,p2)=>{
                if (p1.isSelected == true && p2.isSelected == false){
                    return -1;
                }else if (p1.isSelected == false && p2.isSelected == true) {
                    return 1;
                }else return p1.rank - p2.rank;} )


                wtaPlayers.sort((p1,p2)=>{
                if (p1.isSelected == true && p2.isSelected == false){
                    return -1;
                }else if (p1.isSelected == false && p2.isSelected == true) {
                    return 1;
                }else return p1.rank - p2.rank;} )
        }

        return (
            <div className="container">

                <ul title="Tournaments">
                    {week.tournaments.map(tour => <li key={tour.name}>{tour.name}</li>)}
                </ul>

                {week.isOpen &&
                    <div>
                        <SelectPlayers category="ATP" players={week.selectedPlayers} onPlayerDropped={selectedPlayerId => this.props.onPlayerDropped(selectedPlayerId)} />
                        <SelectPlayersModal category="ATP" onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)}
                            onPlayerDropped={selectedPlayerId => this.props.onPlayerDropped(selectedPlayerId)}
                            atpPlayers={atpPlayers}
                            wtaPlayers={wtaPlayers}
                            selectedPlayersRemaining={5 - week.selectedPlayers.length} />
                        <div id="counter"><h6 class="alert-heading">Closes in: <Countdown date={new Date(week.start_date)} /></h6></div>
                    </div>

                }
                {!week.isOpen && !isFuture &&
                    <div>
                        <PlayersPoints players={week.selectedPlayers} />
                    </div>
                }

                {/* {!week.isOpen && isFuture && <div id="counter"><h6 class="alert-heading">Opens in: <Countdown date={new Date(week.start_date)} /></h6></div>}                 */}

                <PlayerModal players={atpPlayers} />

            </div>
        )

    }


    setSelectedPlayers(ranking, selectedP, category) {

        for (const player of ranking) {
            console.log(selectedP.filter(p => p.id === player.id && player.category === category).length);
            if (selectedP.filter(p => p.id === player.id && player.category === category).length > 0) {
                
                player.isSelected = true;
                console.log(player);
            } else {
                player.isSelected = false;
            }
        };
    }
}