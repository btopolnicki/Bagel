import React, { Component } from 'react';
import WeekPager from './weekPager';
import CategoryTabs from './categoryTabs';
import Navigation from './navigation';
import { auth } from '../firebase';

const RANKING_URL = 'https://us-central1-bagel-c756a.cloudfunctions.net/api/rankings/';
const SELECTED_URL = 'https://us-central1-bagel-c756a.cloudfunctions.net/api/selected/';
const WEEKSDATA = 'https://us-central1-bagel-c756a.cloudfunctions.net/api/tournaments/weeks/';
//const WEEKSDATA = 'http://localhost:5000/bagel-c756a/us-central1/api//tournaments/weeks/'



export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedWeek: 0,
      atpPlayers: [],
      wtaPlayers: [],
      atpSelected: [],
      wtaSelected: [],
      weeks: [],
      selectedCategory: "ATP",
      isLoading: true,
      error: null,
      authUser: null
    }
  }

  componentDidMount() {

    try {

      auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });


      Promise.all([this.getWeeksData(), this.getPlayers()]).then((data) => {
        const weeksData = data[0];
        const players = data[1];

        this.setState({ atpPlayers: players.atpPlayers, wtaPlayers: players.wtaPlayers, weeks: weeksData.weeks, selectedWeek: weeksData.selectedWeek, isLoading: false })
      })
        .catch(error => {
          console.log(error);
          this.setState({ error, isLoading: false })
        });;

    } catch (error) {
      this.setState({ error, isLoading: false })
    }


  }

  render() {

    const { atpPlayers, wtaPlayers, atpSelected, wtaSelected, weeks, isLoading, selectedCategory, selectedWeek, error } = this.state;

    if (error) {
      return { error };
    }
    if (isLoading) {
      return "Loading...";
    }

    console.log("ssss " + selectedWeek);
    console.log(selectedCategory);

    return (
      <div>
        <Navigation />
        <div className="container">
        <WeekPager onSelectedWeekChange={selectedWeek => this.onSelectedWeekChangeh(selectedWeek)} weeks={weeks} selectedWeek={selectedWeek} />
        <CategoryTabs selectedCategory={selectedCategory} week={weeks.weeks[selectedWeek]} atpPlayers={atpPlayers} wtaPlayers={wtaPlayers} onSelectedCategoryChange={selectedCategory => this.onSelectedCategoryChangeh(selectedCategory)}
          onPlayerSelected={selectedPlayerId => this.onPlayerSelected(selectedPlayerId)}
          onPlayerDropped={selectedPlayerId => this.onPlayerDropped(selectedPlayerId)} />
      </div>
      </div>
    );
  }

  getCurrentWeek(weeks) {
    console.log("in get current week");
    console.log(weeks)
    for (var c = 0; c < weeks.weeks.length; c++) {
      if (weeks.weeks[c].week == weeks.currentWeek) {
        console.log("inner selected week " + c);
        return c;
      }
    }
  }

  getWeeksData() {

    return fetch(WEEKSDATA) //change to use week and fetch the players
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        const weeks = data.weeks;
        const selectedWeek = this.getCurrentWeek(weeks);
        return { weeks, selectedWeek };
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, isLoading: false })
      });

  }

  getPlayers(week) {

    return fetch(RANKING_URL) //change to use week and fetch the players
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
            isSelected: false,
            category: 'atp'
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
            isSelected: false,
            category: 'wta'
          }
        })

        return ({ atpPlayers: atpPlayers, wtaPlayers: wtaPlayers });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, isLoading: false })
      });
  }

  onSelectedWeekChangeh(selectedWeek) {
    this.setState({ selectedWeek: selectedWeek });
    console.log("week changed " + selectedWeek);
  }
  onSelectedCategoryChangeh(selectedCategory) {
    if (selectedCategory != this.state.selectedCategory) {
      this.setState({ selectedCategory: selectedCategory });
      console.log("category changed " + selectedCategory);
    }
  }
  onPlayerSelected(player) {

    if (this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.length >= 5) {
      return;
    }
    this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.push(player);

    player.isSelected = true;
    this.setState({ weeks: this.state.weeks });
    console.log(player.id);
  }

  onPlayerDropped(player) {

    console.log(this.state);
    const index = this.findPlayerIndex(this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers, player);

    this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.splice(index, 1);

    player.isSelected = false;
    this.setState({ weeks: this.state.weeks });
  }

  findPlayerIndex(players, player) {
    for (let c = 0; c < players.length; c++) {
      if (players[c].id == player.id) {
        return c;
      }
    }
    return 100;
  }
}
