import React, { Component } from 'react';

export default class WeekPager extends Component {

    constructor(props) {
        super(props);

        this.state = {selectedWeek:props.selectedWeek};
    }


    getMonth(monthInput){
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return month[monthInput];
    }
    render() {

        const weeks = this.props.weeks;
        const selectedWeek = this.props.selectedWeek;
        console.log('seleted week: ' + selectedWeek);
        if (weeks.length === 0){
            return "Loading...";
        }

        return (
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination  justify-content-between">
                        <li className="page-item ">
                            <a className="page-link" href="#" data-target="#main-carousel1" data-slide="prev" onClick={event => this.onPreviousWeekClick()}>Previous</a>
                        </li>
                        <li className="page-item flex-fill">
                            <div id="main-carousel" class="carousel slide" data-interval="false" data-wrap="false">
                                <div class="carousel-inner">
                                    {weeks.weeks.map(week =>
                                        <div key={week.week}  className={this.isSelectedWeek(weeks, week.week, selectedWeek) ? 'carousel-item active' : 'carousel-item'}>
                                            <div>Week {week.week} <span className={week.isOpen ? 'open' : 'closed'}>{week.isOpen ? '(Open)' : '(Closed)'}</span></div>
                                            <div>{new Date(week.start_date).getDate() + " " + this.getMonth(new Date(week.start_date).getMonth())} to {new Date(week.end_date).getDate() + " " + this.getMonth(new Date(week.end_date).getMonth())}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" data-target="#main-carousel1" data-slide="next" onClick={event => this.onNextWeekClick()}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    isSelectedWeek(weeks, week, selectedWeek){
        return weeks.weeks[selectedWeek].week == week;

    }
    onNextWeekClick() {
        const week = this.props.selectedWeek >= this.props.weeks.weeks.length -1? this.props.selectedWeek : this.props.selectedWeek + 1;
        if (week !== this.props.selectedWeek){
           // this.setState({ selectedWeek: week });
            this.props.onSelectedWeekChange(week);
        }

    }

    onPreviousWeekClick() {
        const week = this.props.selectedWeek <= 0 ? 0 : this.props.selectedWeek - 1;
        if (week !== this.props.selectedWeek){
           // this.setState({ selectedWeek: week });
            this.props.onSelectedWeekChange(week);
        }
    }
}