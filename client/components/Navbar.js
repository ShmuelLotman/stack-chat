import React, { Component } from 'react';
import NameEntry from './NameEntry';
import store from '../store';
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState()
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render () {
    return (
      <nav>
        <h3># channelname goes here</h3>
       <NameEntry />
      </nav>
    );
  }
}
