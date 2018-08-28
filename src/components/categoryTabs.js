import React, { Component } from 'react';
import Players from './players';
import PlayersPoints from './playersPoints';
import PlayerModal from './playersModal';
import SelectPlayers from './selectPlayers';

export default class CategoryTabs extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const atpPlayers = this.props.atpPlayers;
        const wtaPlayers = this.props.wtaPlayers;
        const selectedCategory = this.props.selectedCategory;
        const week = this.props.week;

        return (
            <div className="container">
                {<div className="row">
                    <div className="" id="tab-content">
                        <div className="tab-content">
                            <ul className="nav nav-pills atpwta justify-content-center">
                                <li className={selectedCategory === 'ATP' ? 'nav-item active' : 'nav-item'}><a className={selectedCategory === 'ATP' ? 'nav-link active' : 'nav-link'} data-toggle="pill" href="#ATP" onClick={event => this.props.onSelectedCategoryChange('ATP')}>ATP</a></li>
                                <li className={selectedCategory === 'WTA' ? 'nav-item active' : 'nav-item'}><a className={selectedCategory === 'WTA' ? 'nav-link active' : 'nav-link'} data-toggle="pill" href="#WTA" onClick={event => this.props.onSelectedCategoryChange('WTA')}>WTA</a></li>
                            </ul>
                            <div id="ATP" className={selectedCategory === 'ATP' ? 'tab-pane fade show active center' : 'tab-pane fade show center'}>
                                <ul title="Tournaments">
                                    {week.atpTournaments.map(tour => <li key={tour.name}>{tour.name}</li>)}
                                </ul>

                                {week.isOpen &&
                                    <div>
                                        <SelectPlayers players={week.selectedPlayers.atpSelected} />
                                        <Players onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)} players={atpPlayers} />
                                    </div>
                                }
                                {!week.isOpen &&
                                    <div>
                                        <PlayersPoints players={week.selectedPlayers.atpSelected} />
                                    </div>
                                }

                            </div>
                            <div id="WTA" className={selectedCategory === 'WTA' ? 'tab-pane fade show active center' : 'tab-pane fade show center'}>
                                <ul title="Tournaments">
                                    {week.wtaTournaments.map(tour => <li key={tour.name}>{tour.name}</li>)}
                                </ul>
                                {week.isOpen &&
                                    <div>
                                        <SelectPlayers players={week.selectedPlayers.wtaSelected} />
                                        <Players onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)} players={wtaPlayers} />
                                    </div>
                                }
                                {!week.isOpen &&
                                    <div>
                                        <PlayersPoints players={week.selectedPlayers.wtaSelected} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>}

                <PlayerModal players={atpPlayers} />
            </div>
        )
    }
}