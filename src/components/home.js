import React, { Component } from 'react';
import WeekPager from './weekPager';
import CategoryTabs from './categoryTabs';
import Navigation from './navigation';
import Login from './login';
import { Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import * as routes from '../routes';

export default class Home extends Component {

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

    this.token = "";

  }

  componentDidMount() {

    return firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {

        console.log('user auth ok');
        const me = this;
        return authUser.getIdToken().then(function (token) {

          'Authorization', 'Bearer ' + token
          me.token = 'Bearer ' + token;

          if (authUser.displayName != "") {
           // me.refreshUser(authUser.displayName);
          }
          return me.fetchData(authUser);
        });


      } else {
        console.log("no user");
        this.setState({ authUser: null, isLoading: false });

      }
    });

  }

  fetchData(authUser) {

    try {
      console.log("Calling server");
      Promise.all([this.getWeeksData(), this.getPlayers()]).then((data) => {
        const weeksData = data[0];
        const players = data[1];

        this.setState({ authUser: authUser, atpPlayers: players.atpPlayers, wtaPlayers: players.wtaPlayers, weeks: weeksData.weeks, selectedWeek: weeksData.selectedWeek, isLoading: false })
      })
        .catch(error => {
          console.log("Errror" + error);
          console.log(error);
          this.setState({ error, isLoading: false })
        });;

    } catch (error) {
      console.log("Error");
      this.setState({ error, isLoading: false })
    }

  }

  render() {

    const { atpPlayers, wtaPlayers, atpSelected, wtaSelected, weeks, isLoading, selectedCategory, selectedWeek, error } = this.state;

    if (error) {
      return { error };
    }

    if (!this.state.authUser && !isLoading) {
      return (<Redirect to="/login">login</Redirect>)
    }


    if (isLoading) {
      return "Loading...";
    }

    console.log("RENDER HOME selected week " + selectedWeek);

    return (
      <div className="page-container">

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

    var myInit = {
      method: 'GET',
      headers: { "Authorization": this.token },
      cache: 'default'
    };

    return fetch(routes.API_ROOT + "tournaments/weeks/", myInit) //change to use week and fetch the players
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
        //        this.setState({ error, isLoading: false })
      });

  }

  getPlayers(week) {

    var myInit = {
      method: 'GET',
      headers: { "Authorization": "aaa" },
      mode: 'cors',
      cache: 'default'
    };

    return fetch(routes.API_ROOT + "rankings") 
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
            isoCountry: player.isoCountry,
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
            isoCountry: player.isoCountry,
            isSelected: false,
            category: 'wta'
          }
        })

        return ({ atpPlayers: atpPlayers, wtaPlayers: wtaPlayers });
      })
      .catch(error => {
        console.log(error);
        //this.setState({ error, isLoading: false })
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
    console.log("player selected");
    if (this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.length >= 5) {
      window.alert("No more slots remainig.")
      return;
    }
    this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.push(player);

    player.isSelected = true;
    this.setState({ weeks: this.state.weeks });

    this.savePlayerSelected(player);
  }

  onPlayerDropped(player) {

    const index = this.findPlayerIndex(this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers, player);

    this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.splice(index, 1);

    player.isSelected = false;
    this.setState({ weeks: this.state.weeks });

    console.log(player);
    this.deletePlayerSelected(player);
  }

  findPlayerIndex(players, player) {
    for (let c = 0; c < players.length; c++) {
      if (players[c].id == player.id) {
        return c;
      }
    }
    return 100;
  }

  savePlayerSelected(player) {
    var myInit = {
      method: 'POST',
      headers: { "Authorization": this.token },
      cache: 'default'
    };

    var weekNumber = this.state.weeks.weeks[this.state.selectedWeek].week;
    var url = routes.API_ROOT + "selected/" + weekNumber + "/" + player.category.toLowerCase() + "/" + player.id;

    console.log(url);

    fetch(url, myInit)
      .then(response => {
        if (response.ok) {
          return console.log(response);
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  deletePlayerSelected(player) {
    var myInit = {
      method: 'DELETE',
      headers: { "Authorization": this.token },
      cache: 'default'
    };
    var weekNumber = this.state.weeks.weeks[this.state.selectedWeek].week;

    var url = routes.API_ROOT + "selected/" + weekNumber + "/" + player.category.toLowerCase() + "/" + player.id;

    console.log(url);

    fetch(url, myInit)
      .then(response => {
        if (response.ok) {
          return console.log(response);
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  // refreshUser = function () {
  //   var myInit = {
  //     method: 'POST',
  //     headers: { "Authorization": this.token },
  //     cache: 'default'
  //   };

  //   return fetch(routes.API_ROOT + "users", myInit) //change to use week and fetch the players
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Something went wrong ...');
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
}
