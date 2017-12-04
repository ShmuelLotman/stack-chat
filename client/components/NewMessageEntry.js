import React, { Component } from 'react';
import store, { writeMessage, gotNewMessageFromServer } from '../store';
import axios from 'axios';
import socket from '../socket'
export default class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const content = this.state.newMessageEntry;
    const channelId = this.props.channelId;
    axios.post('/api/messages', { content: content, channelId: channelId })
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    });
  }
  handleChange (event) {
    event.preventDefault();
    const action = writeMessage(event.target.value)
    store.dispatch(action);
  }
  render () {

    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.NewMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
