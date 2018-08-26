import React, { Component } from 'react';
import Players from './players';
import PlayerModal from './playersModal';

export default class CategoryTabs extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const atpPlayers = this.props.atpPlayers;
        const wtaPlayers = this.props.wtaPlayers;
        const atpSelected = this.props.atpSelected;
        const wtaSelected = this.props.wtaSelected;

        return (
            <div className="container">
                <div className="row">
                    <div className="mx-auto">
                        <div className="tab-content">
                            <ul className="nav nav-pills atpwta justify-content-center">
                                <li className="nav-item active"><a className="nav-link active" data-toggle="pill" href="#ATP">ATP</a></li>
                                <li className="nav-item"><a className="nav-link" data-toggle="pill" href="#WTA">WTA</a></li>
                            </ul>
                            <div id="ATP" className='tab-pane fade show active'>
                                {/* <Players players={atpSelected}/> */}
                                <Players players={atpPlayers}/>
                            </div>
                            <div id="WTA" className='tab-pane fade show'>    
                                {/* <Players players={wtaSelected}/> */}
                                <Players players={wtaPlayers}/>
                            </div>
                        </div>
                    </div>
                </div>
                <PlayerModal players={atpPlayers}/>
            </div>
        )
    }
}