import React, { Component } from 'react';

export default class WeekPager extends Component {

    constructor(props) {
        super(props);

        this.state = { selectedWeek: 10 };
    }

    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination  justify-content-between">
                    <li className="page-item ">
                        <a className="page-link" href="#" tabIndex="-1" onClick={event=>this.onPreviousWeekClick()}>Previous</a>
                    </li>
                    <span className="page-link" >Week: {this.state.selectedWeek}</span>
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={event=>this.onNextWeekClick()}>Next</a>
                    </li>
                </ul>
            </nav>
        );
    }

    onNextWeekClick() {        
        const week = this.state.selectedWeek >= 52 ? 52 : this.state.selectedWeek + 1;
        this.setState({ selectedWeek:week });
        this.props.onSelectedWeekChange(week);
    }

    onPreviousWeekClick() {        
        const week = this.state.selectedWeek <= 1 ? 1 : this.state.selectedWeek - 1;
        this.setState({ selectedWeek:week });
        this.props.onSelectedWeekChange(week);
    }
}