import React, { Component } from 'react';
import store, {newMessageWritten, newMessageReceived, gotMessagesFromServer, postMessages} from '../store';
import axios from 'axios';
import socket from '../socket';
export default class NewMessageEntry extends Component {
constructor() {
  super();
  this.state = store.getState();
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit  = this.handleSubmit.bind(this);
}
componentDidMount() {
  this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
}
componentWillUnmount() {
  this.unsubscribe();
}
handleChange(event) {
  const action = newMessageWritten(event.target.value);
  store.dispatch(action)
}
handleSubmit(event) {
  event.preventDefault();
  const content = this.state.newMessageEntry;
  const name = this.state.submittedName;
  const message = { content: content, channelId: this.props.channel, name: name}
  const thunkPost = postMessages(message);
  store.dispatch(thunkPost);
  
}
  render () {
    console.log(this.props)
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value = {this.state.newMessageEntry}
            onChange = {this.handleChange}
            
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
