import React, {Component} from 'react';

export default class PlayerDetails extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const player = this.props.player;

        return (
            <div key={player.id} className="modal fade" id={"playerDetail" + player.id} tabIndex="-1" role="dialog" aria-labelledby={"playerDetail" + player.id} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header bg-success">
                  <h5 className="modal-title"><b>ICON Bagel</b></h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body mx-auto">
                  <span className="bg-alert"><span className="rank">{player.rank}</span> <b>{player.name}</b></span><span className="float-right">{player.nationality}</span>
                  <hr />

                  <div>
                    <ul className="nav nav-pills details justify-content-center">
                      <li className="nav-item active"><a className="nav-link active" data-toggle="pill" href={"#details" + player.id}>Details</a></li>
                      <li className="nav-item"><a className="nav-link" data-toggle="pill" href={"#history" + player.id}>History</a></li>
                    </ul>

                    <div className="tab-content">

                      <div id={"details" + player.id} className="tab-pane show fade active">
                        <table className="table table-responsive details-table">
                          <tbody>
                            <tr>
                              <th className="col cinfo text-center">Week</th>
                              <td className="col cinfo text-center">1</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Total Points</th>
                              <td className="col cinfo text-center">4123</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Tournaments Played</th>
                              <td className="col cinfo text-center">12</td> 
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Average Points</th>
                              <td className="col cinfo text-center">31</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Form</th>
                              <td className="col cinfo text-center">12.4</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Win/Loss</th>
                              <td className="col cinfo text-center">24/5</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Clay %</th>
                              <td className="col cinfo text-center">85</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Grass %</th>
                              <td className="col cinfo text-center">53</td>
                            </tr>
                            <tr>
                              <th className="col cinfo text-center">Hard %</th>
                              <td className="col cinfo text-center">67</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div id={"history" + player.id} className="tab-pane fade show">
                        <table id="history-table" className="table table-responsive table-sm history-table">
                          <thead>
                            <tr>
                              <th>Week</th>
                              <th>Tournament</th>
                              <th>Level</th>
                              <th>Surface</th>
                              <th className="text-center">Rank</th>
                              <th>Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">4</td>
                              <td>Monte-Carlo</td>
                              <td>Masters</td>
                              <td className="text-center">Clay</td>
                              <td className="text-center">7</td>
                              <td className="text-center">360</td>
                            </tr>

                          </tbody>

                        </table>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
    }
}