import React, { Component } from 'react';
import WeekPager from './weekPager';
import CategoryTabs from './categoryTabs';

const API_ATP = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=atp-rankings%40vbarbaresi&rows=200&sort=-current_rank';
const API_WTA = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=wta-rankings%40vbarbaresi&rows=200&sort=-current_rank'

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

    fetch(API_ATP) //change to use week and fetch the players
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log(data);
        const atpPlayers = data.records.map(player => {
          return {
            id: player.recordid,
            rank: player.fields.current_rank,
            givenName: player.fields.player_name,
            familyName: '',
            nationality: player.fields.player_country,
            points: player.fields.player_points,
            selected: false
          }
        })
        this.setState({ atpPlayers: atpPlayers, isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, isLoading: false })
      });

      fetch(API_WTA) //change to use week and fetch the players
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log(data);
        const wtaPlayers = data.records.map(player => {
          return {
            id: player.recordid,
            rank: player.fields.current_rank,
            givenName: player.fields.player_name,
            familyName: '',
            nationality: player.fields.player_country,
            points: player.fields.player_points,
            selected: false
          }
        })
        this.setState({ wtaPlayers: wtaPlayers, isLoading: false });
      })
      .catch(error => {
        console.log(error);
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
