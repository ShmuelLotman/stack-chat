import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware  from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM-SERVER';
const NEW_MESSAGE_WRITTEN = 'NEW_MESSAGE_WRITTEN';
const NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED';
const NEW_NAME_SUBMITTED = 'NEW_NAME_SUBMITTED';
const GOT_CHANNELS = 'GOT_CHANNELS';

const NEW_CHANNEL_WRITTEN = 'NEW_CHANNEL_WRITTEN';
const NEW_CHANNEL_RECEIVED = 'NEW_CHANNEL_RECEIVED'

export const newChannelWritten = (newChannel) => ({
  type: NEW_CHANNEL_WRITTEN,
  newChannel
})
export const newChannelReceived = (newChannel) => ({
  type: NEW_CHANNEL_RECEIVED,
  received
})

export const gotMessagesFromServer = (messages) => ({
    type: GOT_MESSAGES_FROM_SERVER,
    messages
});
export const newMessageWritten = (newMessage) => ({
    type: NEW_MESSAGE_WRITTEN,
    newMessage
})
export const newMessageReceived = (received) => ({
    type: NEW_MESSAGE_RECEIVED,
    received
})
export const newNameSubmitted = (name) => ({
    type: NEW_NAME_SUBMITTED,
    name
})
export const gotChannels = (channelsList) => ({
    type: GOT_CHANNELS,
    channelsList
})
export const fetchMessages = () => {

    return function thunk(dispatch){
       return axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => {
          const action = gotMessagesFromServer(messages);
          dispatch(action)
        });
    }
}
export const postMessages = (message) => {
    return function thunk(dispatch) {
      return axios.post('/api/messages', message)
        .then(res => res.data)
        .then(message => {
          const action = newMessageReceived(message)
          dispatch(action)
          socket.emit('new-message', message);
        });
    }
}
export const postChannels = (channel) => {
  return function thunk(dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(channel => {
        const action = newChannelReceived(channel)
        dispatch(action)
        socket.emit('new-channel', channel);
      });
  }
}
export const fetchChannels = () => {
    return function thunk(dispatch) {
        return axios.get('/api/channels')
        .then(res => res.data)
        .then(channels => {
            const action = gotChannels(channels)
            dispatch(action);
        })
    }
}
const initialState = {
    messages: [],
    newMessageEntry: '',
    newChannelEntry: '',
    submittedName: '',
    channelsList: []
}
const messagesReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GOT_MESSAGES_FROM_SERVER:
        return {...prevState, messages: [...prevState.messages, ...action.messages]};

        case NEW_MESSAGE_WRITTEN:
        return{...prevState, newMessageEntry: action.newMessage};

        case NEW_MESSAGE_RECEIVED:
        return {...prevState, messages: [...prevState.messages, action.received]};

        case NEW_CHANNEL_WRITTEN:
        return {...prevState, channelsList: [...prevState.channelsList, action.newChannel]}

        case NEW_CHANNEL_RECEIVED:
        return {...prevState, channelsList: [...prevState.channelsList, action.received]}

        case NEW_NAME_SUBMITTED:
        return {...prevState, submittedName: action.name};

        case GOT_CHANNELS:
        return {...prevState, channelsList: [...prevState.channelsList, ...action.channelsList]}
        default:
        return prevState;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    messagesReducer, initialState, composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleware))
);
export default store;
