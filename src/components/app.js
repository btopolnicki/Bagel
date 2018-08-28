import React, { Component } from 'react';
import WeekPager from './weekPager';
import CategoryTabs from './categoryTabs';

const RANKING_URL = ' https://us-central1-bagel-c756a.cloudfunctions.net/api/rankings/';
const SELECTED_URL = ' https://us-central1-bagel-c756a.cloudfunctions.net/api/selected/';
const WEEKSDATA = 'http://localhost:5000/bagel-c756a/us-central1/api/tournaments/weeks/';

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
      error: null
    }

  }

  componentDidMount() {
    //this.getPlayers();
    this.getWeeksData();
  }

  getCurrentWeek(weeks) {
    console.log("in get current week");
    console.log(weeks)
    for (var c = 0; c < weeks.weeks.length; c++) {
      if (weeks.weeks[c].week == weeks.currentWeek) {
        console.log("inner selected week "  + c);
        return c;
      }
    }
  }

  getWeeksData() {

    fetch(WEEKSDATA) //change to use week and fetch the players
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
        console.log(weeks);
        return {weeks, selectedWeek};
      }).then(dataG => {
        return this.getPlayers().then((data)=>{
          console.log("seleddede " + dataG.selectedWeek);
          return this.setState({ atpPlayers:data.atpPlayers, wtaPlayers: data.wtaPlayers, weeks: dataG.weeks, selectedWeek:dataG.selectedWeek, isLoading: false })           
        });
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

        return ({ atpPlayers: atpPlayers, wtaPlayers: wtaPlayers});
        //this.setState({ atpPlayers: atpPlayers, wtaPlayers: wtaPlayers, weeks: this.state.weeks, selectedWeek: this.state.selectedWeek, isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, isLoading: false })
      });
  }

  render() {

    const { atpPlayers, wtaPlayers, atpSelected, wtaSelected, weeks, isLoading, selectedCategory, selectedWeek, error } = this.state;
    if (isLoading) {
      return "Loading...";
    }

    console.log("ssss " + selectedWeek);
    console.log(selectedCategory);

    return (
      <div>
        <WeekPager onSelectedWeekChange={selectedWeek => this.onSelectedWeekChangeh(selectedWeek)} weeks={weeks} selectedWeek={selectedWeek} />
        <CategoryTabs selectedCategory={selectedCategory} week={weeks.weeks[selectedWeek]} atpPlayers={atpPlayers} wtaPlayers={wtaPlayers} onSelectedCategoryChange={selectedCategory => this.onSelectedCategoryChangeh(selectedCategory)} 
        onPlayerSelected={selectedPlayerId => this.onPlayerSelected(selectedPlayerId)}/>
      </div>
    );
  }

  onSelectedWeekChangeh(selectedWeek) {
    this.setState({ selectedWeek: selectedWeek });
    console.log("week changed " + selectedWeek);
    //this.getPlayers(selectedWeek);
  }
  onSelectedCategoryChangeh(selectedCategory) {
    if (selectedCategory != this.state.selectedCategory) {
      this.setState({ selectedCategory: selectedCategory });
      console.log("category changed " + selectedCategory);
    }
  }
  onPlayerSelected(player){
    if (this.state.selectedCategory == "ATP"){
      if (this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.atpSelected.length >= 5){
        return;
      }
      this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.atpSelected.push(player);
    }else{
      if (this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.wtaSelected.length >= 5){
        return;
      }

      this.state.weeks.weeks[this.state.selectedWeek].selectedPlayers.wtaSelected.push(player);
    }
    
    player.isSelected = true;
    this.setState({weeks:this.state.weeks});
    console.log(player.id);
  }

}
