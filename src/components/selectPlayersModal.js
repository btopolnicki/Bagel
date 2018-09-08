import React, { Component } from 'react';
import Players from './players'


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default class SelectPlayersModal extends Component {
    constructor(props) {
        super(props);
        this.state = { playerName: "" };
    }

    onPLayerSelected(selectedPlayer) {
        this.props.onPlayerSelected(selectedPlayer);
        this.setState({ playerName: "" });
    }

    onPLayerDropped(selectedPlayer) {
        this.props.onPlayerDropped(selectedPlayer);
        this.setState({ playerName: "" });
    }

    render() {

        const { playerName } = this.state;
        const atpPlayers = this.props.atpPlayers.filter(player => player.name.toLowerCase().includes(playerName.toLowerCase()));
        const wtaPlayers = this.props.wtaPlayers.filter(player => player.name.toLowerCase().includes(playerName.toLowerCase()));;
        const selectedPlayersRemaining = this.props.selectedPlayersRemaining

        console.log(playerName);


        return (
            <div>
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

                                <div class="input-group mb-3">
                                    <input id="modal-seach" className="form-control modal-search" type="text" placeholder="Search..."
                                        name="modal-seach"
                                        value={playerName}
                                        onChange={event => this.setState(byPropKey('playerName', event.target.value))} />

                                    <div class="input-group-append">
                                        <span class="input-group-text" id="basic-addon1" onClick={event => this.setState(byPropKey('playerName', ""))}><i class="fa fa-remove"></i></span>
                                    </div>
                                </div>


                                {
                                    <div className="" id="tab-content">
                                        <div className="tab-content">
                                            <ul className="nav nav-pills atpwta justify-content-center">
                                                <li className='nav-item active'><a className='nav-link active' data-toggle="pill" href="#ATP">ATP</a></li>
                                                <li className='nav-item'><a className='nav-link' data-toggle="pill" href="#WTA">WTA</a></li>
                                            </ul>
                                            <div id="ATP" className='tab-pane fade show active center'>

                                                <Players onPlayerSelected={selectedPlayerId => this.onPLayerSelected(selectedPlayerId)} onPlayerDropped={selectedPlayerId => this.onPLayerDropped(selectedPlayerId)} players={atpPlayers} />
                                            </div>

                                            <div id="WTA" className='tab-pane fade show center'>

                                                <Players onPlayerSelected={selectedPlayerId => this.onPLayerSelected(selectedPlayerId)} onPlayerDropped={selectedPlayerId => this.onPLayerDropped(selectedPlayerId)} players={wtaPlayers} />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}