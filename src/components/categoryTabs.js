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

        return (
            <div className="container">
                <div className="row">
                    <div className="mx-auto">
                        <div className="tab-content">
                            <ul className="nav nav-pills atpwta justify-content-center">
                                <li className="nav-item active"><a className="nav-link active" data-toggle="pill" href="#ATP">ATP</a></li>
                                <li className="nav-item"><a className="nav-link" data-toggle="pill" href="#WTA">WTA</a></li>
                            </ul>
                            <Players players={atpPlayers} category="ATP" isActivetab="true" />
                            <Players players={wtaPlayers} category="WTA" isActivetab="false" />
                        </div>
                    </div>
                </div>
                <PlayerModal players={atpPlayers}/>
            </div>
        )
    }
}