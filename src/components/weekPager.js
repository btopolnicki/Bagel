import React, { Component } from 'react';

export default class WeekPager extends Component {

    constructor(props) {
        super(props);

        this.state = { selectedWeek: 10 };
    }

    render() {
        return (
            <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination  justify-content-between">
                    <li className="page-item ">
                        <a className="page-link" href="#" data-target="#main-carousel" data-slide="prev" onClick={event => this.onPreviousWeekClick()}>Previous</a>
                    </li>
                    <li className="page-item flex-fill">
                    <div id="main-carousel" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <div>Week 1</div>
                                <div>cincinnati</div>
                            </div>
                            <div class="carousel-item">

                                <div>Week 2</div>
                                <div>Wimbledon</div>
                            </div>
                            <div class="carousel-item">
                            <div>
                                <div>Week 3</div>
                                <div>Globe summer tournament</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#" data-target="#main-carousel" data-slide="next" onClick={event => this.onNextWeekClick()}>Next</a>
                    </li>
                </ul>
            </nav>
            </div>
        );
    }

    onNextWeekClick() {
         const week = this.state.selectedWeek >= 52 ? 52 : this.state.selectedWeek + 1;
         this.setState({ selectedWeek: week });
         this.props.onSelectedWeekChange(week);
    }

    onPreviousWeekClick() {
        const week = this.state.selectedWeek <= 1 ? 1 : this.state.selectedWeek - 1;
        this.setState({ selectedWeek: week });
        this.props.onSelectedWeekChange(week);
    }
}