import React, { Component } from 'react';
import store, {newChannelWritten} from '../store';
import axios from 'axios';
import socket from '../socket';
import connect from 'react-redux'


const mapDispatchToProps = function (dispatch) {
  return {
    handleChange: (event) => {
      dispatch(newChannelWritten(event.target.value))
    }
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  return {
    newChannelEntry: state.newChannelEntry
  }
}

function NewChannelEntry() {

  render() {
    return (
      <div>
        <h5>{ props.someStuff }</h5> {/* props.someStuff comes from mapStateToProps */}
        <button onClick={props.someMethod}>Click Me</button> {/* props.someMethod comes from mapDispatchToProps */}
        <input
          value={props.newChannelEntry}
          className="form-control"
          type="text"
          name="name"
          placeholder="Enter channel name"
          onChange={props.handleChange}
        />
      </div>
    )
  }
}

const NewChannelEntry = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry)
export default NewChannelEntry
