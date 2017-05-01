import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CreateItemButton.css'

class CreateItemButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adding: false,
      itemDescription: '',
    }
  }

  _toggleAdding() {
    this.setState({
      adding: !this.state.adding,
    })
  }

  handleInput(e) {
    this.setState({itemDescription: e.target.value})
  }

  handleAdd() {
    const { itemDescription } = this.state
    if (itemDescription) {
      this.props.newItem(itemDescription)
      this._toggleAdding()
      this.setState({ itemDescription: ''})
    }
  }

  render() {
    const { adding } = this.state

    return (
      <div className="CreateItemButton">
        {adding ?
          <p>
            <input
            className='new-task-input'
              placeholder='create new task'
              onChange={(e) => this.handleInput(e)}
              />
            <a
              className="addButton"
              onClick={() => this.handleAdd()}
            >
              Add
            </a>
          </p> :
          <p onClick={this._toggleAdding.bind(this)}>
            <span className="plus-sign">+</span>
             Add New Task
             <a
             className="addButton"
             onClick={() => this.handleAdd()}
             >
             Add
             </a>
          </p>
        }
      </div>
    )
  }
}

CreateItemButton.propTypes = {
  newItem: PropTypes.func,
};

export default CreateItemButton
