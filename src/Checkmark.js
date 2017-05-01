import React, { Component } from 'react';
import './Checkmark.css'
import checkmark from './images/check-empty.svg'

class Checkmark extends Component {
  render() {
    return (
      <div className="Checkmark">
        <img src={checkmark} alt="No Tasks" />
        <h1>All done for the day!<br />Time to Relax!</h1>
      </div>
    )
  }
}

export default Checkmark
