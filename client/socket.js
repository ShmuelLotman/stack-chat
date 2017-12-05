import io from 'socket.io-client';
import {newMessageReceived} from './store';
import store from './store';



const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', (message) => {
    console.log('client side', message);
    store.dispatch(newMessageReceived(message));
  });

  socket.on('new-channel', (channel) => {
    console.log('client side', channel);
    store.dispatch(newChannelReceived(channel));
  });

});

export default socket;
