// import { createStore } from 'redux'
//
// const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
// const initialState = {
//   messages: []
// }
//
//
// const reducer = (prevState = initialState, action) => {
//   console.log(action)
//   switch(action) {
//     case GOT_MESSAGES_FROM_SERVER:
//       return { ...prevState, messages: action.messages }
//     default:
//       return prevState
//   }
// }
//
// export const gotMessagesFromServer = (messages) => {
//   return { type: GOT_MESSAGES_FROM_SERVER, messages }
// }
// const store = createStore(reducer)
// export default store


import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket'


// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_NAME = 'WRITE_NAME'

// ACTION CREATORS
export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  };
}

export function writeMessage(newMessageEntry) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry
  };
}

export function gotNewMessageFromServer(message) {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message
    // or message: message
  };
}

export function writeName (nameEntry) {
  return {
    type: WRITE_NAME,
    nameEntry
  }

}

export function fetchMessages() {
  return function thunk (dispatch) {
    axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      const action = gotMessagesFromServer(messages)
      dispatch(action)
    });
  }
}

export function postMessage(content, nameEntry) {
  return function thunk(dispatch) {
    axios.post('/api/messages', {
      content: content,
      nameEntry: nameEntry,
    })
    .then(res => res.data)
    .then(message => {
      dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    });
  }

}

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
  nameEntry: ''
};

// REDUCER
function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    case WRITE_MESSAGE:
      return Object.assign({}, state, {newMessageEntry: action.newMessageEntry})
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, state, { messages: state.messages.concat(action.message) });
    case WRITE_NAME:
      return Object.assign({}, state, {nameEntry: action.nameEntry})
      default:
       return state;
  }
}

const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);
// STORE
const store = createStore(reducer, middleware);
export default store;
