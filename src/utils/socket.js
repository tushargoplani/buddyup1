

import io from 'socket.io-client';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://react-chat-express.herokuapp.com/'
const socket = io(BASE_URL,{ transports : ['websocket'] });

socket.on('connect', (e) => {
    console.log("your are connected with socket");
    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});

export default socket;