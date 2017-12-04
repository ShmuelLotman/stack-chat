import React, { Component } from 'react';
import store, { writeName } from '../store';

export default class NameEntry extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange (event) {
    event.preventDefault();
    const action = writeName(event.target.value)
    store.dispatch(action);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const nameEntry = this.state.nameEntry;
    store.setState({
      nameEntry
    })
  }
  render() {
    return (
      <form className="form-inline">
      <label htmlFor="name">Your name:</label>
      <input
        type="text"
        name="name"
        onChange={ this.handleChange }
        placeholder="Enter your name"
        className="form-control"
      />
    </form>
    );
  }
}
