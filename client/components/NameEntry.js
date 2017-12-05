import React, { Component } from 'react';
import axios from 'axios';
import store, {newNameSubmitted} from '../store';

export default class NameEntry extends Component {
    constructor(props) {
        super(props);

    }
   handleChange(event) {
    const action = newNameSubmitted(event.target.value);
    store.dispatch(action)
   }
    render() {
        return (
            <form className="form-inline">
            <label htmlFor="name">Your name:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control"
            />
          </form>
        )
    }
    
}
