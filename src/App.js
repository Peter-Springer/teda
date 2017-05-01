import React, { Component } from 'react';
import { filter } from 'lodash';
import moment from 'moment';
import './App.css';
import Calendar from './Calendar';
import List from './List';
// import axios from 'axios';

let todos = require('./todos.json')
todos = todos.map((item, index) => {
  return {
    due_date: moment(item.due_date),
    description: item.description,
    complete: item.complete,
    id: index,
    hidden: true,
  }
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adding: false,
      date: moment(),
      items: todos,
      yesterday: moment().subtract(1, 'day'),
      tomorrow: moment().add(1, 'day'),
      status: false,
    }
  }

  /*
  * Note on commented out code block below for componentDidMount() { ... }
  * Appears to work with json mock server but test suite fails with XMLHTTPRequest errors
  */

  // componentDidMount() {
  //   axios.get('http://localhost:3001/todos')
  //     .then((response) => {
  //       this.setState({ items: response.data });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // updateHiddenProperty(items) {
  //   this.setState( { items })
  // }

  _createNewItem(description) {
    const { date, status } = this.state

    this.setState({
      items: [...this.state.items, {
        due_date: moment(date),
        description: description,
        complete: status,
        id: new Date().getTime()
       }],
    })
  }

  _today() {
    this.setState({
      date: moment(),
      yesterday: moment().subtract(1, 'day'),
      tomorrow: moment().add(1, 'day'),
    })
  }

  _previous() {
    const { date, yesterday, tomorrow } = this.state
    this.setState({
      date: date.subtract(1, 'day'),
      yesterday: yesterday.subtract(1, 'day'),
      tomorrow: tomorrow.subtract(1, 'day'),
    })
  }

  _next() {
    const { date, tomorrow, yesterday } = this.state
    this.setState({
      date: date.add(1, 'day'),
      tomorrow: tomorrow.add(1, 'day'),
      yesterday: yesterday.add(1, 'day'),
    })
  }

  deleteItem(id) {
    const { items } = this.state
    this.setState({ items: items.filter((item) => item.id !== id) })
  }

  completeTask(id) {
    const { items } = this.state;
    this.setState({ items: items.map((item) => {
        if (item.id === id) {
          item.complete = !item.complete
        }
        return item
      })
    })
  }

  /*
  * Note on commented out code block below for toggleHover
  * WIP-When img is no longer hidden on hover you can no longer click to delete.
  */

  // toggleHover(e, id) {
  //   e.preventDefault()
  //   const { items } = this.state;
  //   this.setState({ items: items.map((item) => {
  //       if (item.id === id) {
  //         item.hidden = !item.hidden
  //       }
  //       return item
  //     })
  //   })
  // }

  render() {
    const { items, date } = this.state
    const listItems = filter(items, (item) => {
      return item.due_date.isSame(date, 'day')
    })

    return (
      <div className="App">
        <Calendar {...this.state}
          today={this._today.bind(this)}
          previous={this._previous.bind(this)}
          next={this._next.bind(this)} />
        <List
          completeTask={this.completeTask.bind(this)}
          items={listItems}
          createNewItem={this._createNewItem.bind(this)}
          remove={this.deleteItem.bind(this)}
        />
      </div>
    );
  }
}

export default App;
