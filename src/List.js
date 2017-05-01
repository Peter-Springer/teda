import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Summary from './Summary';
import CreateItemButton from './CreateItemButton';
import Checkmark from './Checkmark';
import Delete from './images/delete.svg';
import Check from './images/check.svg';
import './List.css';

class List extends Component {

  render() {
    const { items, createNewItem, remove, completeTask } = this.props

    return (
      <div className="List">
        <Summary {...this.props} />
        <CreateItemButton newItem={createNewItem} />
        <hr />
        {items.length < 1 ?
            <Checkmark /> :
            <ul>
              {items.map((item) => {
                return (
                  <li key={item.id}>
                    <img
                      className='delete'
                      alt='delete'
                      src={Delete}
                      onClick={() => remove(item.id)}
                    />
                    <p
                      style={
                        item.complete ?
                        {color: 'rgb(226, 226, 226)'} :
                        {color: 'rgb(60, 60, 59)'}
                      }
                    >
                      {item.description}
                    </p>
                    { item.complete ?
                      <img
                        alt='check mark'
                        className='check'
                        onClick={() => completeTask(item.id)}
                        src={Check}
                      />
                      :
                      <button
                        className='before-checked'
                        onClick={() => completeTask(item.id)}
                      />
                    }
                  </li>
                )
              })}
            </ul>}
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array,
  createNewItem: PropTypes.func,
  remove: PropTypes.func,
  completeTask: PropTypes.func,
};

export default List
