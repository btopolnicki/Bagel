import React, { Component } from 'react';
import WeekPager from './weekPager';
import CategoryTabs from './categoryTabs';

const RANKING_URL = ' https://us-central1-bagel-c756a.cloudfunctions.net/api/rankings/';
const SELECTED_URL = ' https://us-central1-bagel-c756a.cloudfunctions.net/api/selected/';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedWeek: 0,
      atpPlayers: [],
      wtaPlayers: [],
      atpSelected: [],
      wtaSelected: [],
      isLoading: false,
      error: null
    }

    this.getPlayers(10);
  }

  getPlayers(week) {

    fetch(RANKING_URL) //change to use week and fetch the players
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log(data);
        const atpPlayers = data.atpRanking.map(player => {
          return {
            id: player.id,
            rank: player.rank,
            name: player.name,
            familyName: '',
            nationality: player.nationality,
            points: player.points,
            isoCountry: "es",
            isSelected: false
          }
        })

        const wtaPlayers = data.wtaRanking.map(player => {
          return {
            id: player.id,
            rank: player.rank,
            name: player.name,
            familyName: '',
            nationality: player.nationality,
            points: player.points,
            isoCountry: "us",
            isSelected: false
          }
        })

        this.setState({ atpPlayers: atpPlayers, wtaPlayers:wtaPlayers, isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, isLoading: false })
      });

      // fetch(SELECTED_URL+week) 
      // .then(response => {
      //   if (response.ok) {
      //     return response.json();
      //   } else {
      //     throw new Error('Something went wrong ...');
      //   }
      // })
      // .then(data => {
      //   console.log(data);
      //   const atpSelected = data.atpSelected.map(player => {
      //     return {
      //       id: player.id,
      //       rank: player.rank,
      //       name: player.name,
      //       nationality: player.nationality,
      //       points: player.points,
      //       isSelected: true
      //     }
      //   })

      //   const wtaSelected = data.wtaSelected.map(player => {
      //     return {
      //       id: player.id,
      //       rank: player.rank,
      //       name: player.name,
      //       nationality: player.nationality,
      //       points: player.points,
      //       isSelected: true
      //     }
      //   })

      //   this.setState({ atpSelected, wtaSelected });

      //   console.log(atpSelected);
      // })
      // .catch(error => {
      //   console.log(error);
      //   this.setState({ error, isLoading: false })
      // });


  }

  render() {

    const { atpPlayers, wtaPlayers, atpSelected, wtaSelected, isLoading, error } = this.state;

    return (
      <div>
        <WeekPager onSelectedWeekChange={selectedWeek => this.onSelectedWeekChangeh(selectedWeek)} />
        <CategoryTabs atpPlayers={atpPlayers} wtaPlayers={wtaPlayers} atpSelected={atpSelected} wtaSelected={wtaSelected}/>
      </div>
    );
  }

  onSelectedWeekChangeh(selectedWeek) {
    this.setState({ selectedWeek: selectedWeek });
    this.getPlayers(selectedWeek);
  }

}
