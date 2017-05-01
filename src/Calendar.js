import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Calendar.css';

class Calendar extends Component {
  render() {
    const { date, yesterday, tomorrow, previous, today, next } = this.props

    return (
      <div className="Calendar">
        <div className="current">
          <a onClick={() => today()}>Today</a>
        </div>
        <div className="row">
          <div className="previous">
            <span className="yesterday">
              <a onClick={() => previous()}>{yesterday.format('D MMM')}</a>
            </span>
          </div>
          <div className="date">
            <a onClick={() => today()}>
              <span className="days">{date.format('ddd')}</span>
              <span>{date.format('D')}</span>
              <span className="days">{date.format('MMM')}</span>
            </a>
          </div>
          <div className="next">
            <a onClick={() => next()}>
              <span className="tomorrow">{tomorrow.format('D MMM')}</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

Calendar.propTypes = {
  date: PropTypes.object,
  yesterday: PropTypes.object,
  tomorrow: PropTypes.object,
  previous: PropTypes.func,
  today: PropTypes.func,
  next: PropTypes.func,
};

export default Calendar;
