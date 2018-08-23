import React, { Component } from 'react';
import WeekPager from './weekPager';
import CategoryTabs from './categoryTabs';

const API = 'https://ergast.com/api/f1/2018/last/drivers.json';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedWeek: 0,
      atpPlayers: [],
      wtaPlayers: [],
      isLoading: false,
      error: null
    }

    this.getPlayers(1);
  }

  getPlayers(week) {

    fetch(API) //change to use week and fetch the players
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        const atpPlayers = data.MRData.DriverTable.Drivers.map(player => {
          return {
            id: player.driverId,
            rank: player.permanentNumber,
            givenName: player.givenName,
            familyName: player.familyName,
            nationality: player.nationality,
            selected: false
          }
        })

        const wtaPlayers = data.MRData.DriverTable.Drivers.map(player => {
          return {
            id: player.driverId,
            rank: player.permanentNumber,
            givenName: player.givenName,
            familyName: player.familyName,
            nationality: player.nationality,
            selected: false
          }
        })

        this.setState({ atpPlayers: atpPlayers, wtaPlayers: wtaPlayers, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false })
      });
  }

  render() {

    const { atpPlayers, wtaPlayers, isLoading, error } = this.state;

    return (
      <div>
        <WeekPager onSelectedWeekChange={selectedWeek => this.onSelectedWeekChangeh(selectedWeek)} />
        <CategoryTabs atpPlayers={atpPlayers} wtaPlayers={wtaPlayers}/>
      </div>
    );
  }

  onSelectedWeekChangeh(selectedWeek) {
    this.setState({ selectedWeek: selectedWeek });
    this.getPlayers(selectedWeek);
  }

}
