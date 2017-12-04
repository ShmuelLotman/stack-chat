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


import { createStore } from 'redux';

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

// ACTION CREATORS
export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  };
}

export function writeMessage(input) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: input
  };
}

export function gotNewMessageFromServer(message) {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message
    // or message: message
  };
}

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: ''
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
    default:
       return state;
  }
}

// STORE
const store = createStore(reducer);
export default store;
