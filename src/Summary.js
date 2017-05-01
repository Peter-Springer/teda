import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Summary.css';

class Summary extends Component {
  _buildStatement(items) {
    const completeTasks = items.filter((item) => item.complete === false)
    let statement = `Only <span>${completeTasks.length}</span> Tasks. Relax or add one below.`

    if (completeTasks.length === 1) {
      statement = 'Only <span>1</span> Task Left Today! Awesome!'
    } else if (completeTasks.length > 1) {
      statement = `Only <span>${completeTasks.length}</span> Tasks Left Today! Awesome!`
    }

    return {__html: statement}
  }

  render() {
    const { items, } = this.props

    return (
      <div className="Summary">
        <div className="wrapper">
          <p className="statement" dangerouslySetInnerHTML={this._buildStatement(items)} />
        </div>
      </div>
    )
  }
}

Summary.propTypes = {
  items: PropTypes.array,
};

export default Summary
