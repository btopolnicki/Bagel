import React, { Component } from 'react';
import Players from './players'

export default class SelectPlayersModal extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        const atpPlayers = this.props.atpPlayers;
        const wtaPlayers = this.props.wtaPlayers;
        const selectedPlayersRemaining = this.props.selectedPlayersRemaining

        console.log(wtaPlayers);

        return (

            <div className="modal" id={"selectPlayersModal"} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {<div className="modal-header sm-success">
                            {<span className="modal-title"><b>{selectedPlayersRemaining} slots remaining</b></span>}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>}

                        <div className="modal-body mx-auto">
                            {
                                <div className="" id="tab-content">
                                    <div className="tab-content">
                                        <ul className="nav nav-pills atpwta justify-content-center">
                                            <li className='nav-item active'><a className='nav-link active' data-toggle="pill" href="#ATP">ATP</a></li>
                                            <li className='nav-item'><a className='nav-link' data-toggle="pill" href="#WTA">WTA</a></li>
                                        </ul>
                                        <div id="ATP" className='tab-pane fade show active center'>

                                            <Players onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)} onPlayerDropped={selectedPlayerId => this.props.onPlayerDropped(selectedPlayerId)} players={atpPlayers} />
                                        </div>

                                        <div id="WTA" className='tab-pane fade show center'>

                                            <Players onPlayerSelected={selectedPlayerId => this.props.onPlayerSelected(selectedPlayerId)} onPlayerDropped={selectedPlayerId => this.props.onPlayerDropped(selectedPlayerId)} players={wtaPlayers} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}