import { createStore } from 'redux';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM-SERVER';
const NEW_MESSAGE_WRITTEN = 'NEW_MESSAGE_WRITTEN';
const NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED';
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
const initialState = {
    messages: [],
    newMessageEntry: ''
}
const messagesReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GOT_MESSAGES_FROM_SERVER:
        return {...prevState, messages: action.messages};

        case NEW_MESSAGE_WRITTEN: 
        return{...prevState, newMessageEntry: action.newMessage};

        case NEW_MESSAGE_RECEIVED:
        return {...prevState, messages: [...prevState.messages, action.received]}
        default: 
        return prevState;
    }
}

const store = createStore(messagesReducer)
export default store;