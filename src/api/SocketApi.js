import socket from 'socket.io-client'

class SocketApi{
    socket = null;

    init(token) {
        console.log(token)
        this.socket = socket('http://localhost:3000/', {
            query: {
                token,
            },
            //transports: ['websocket'],
        });

        this.socket.on('connect', () => {
            consol.log('Connected');
            consol.log({ socket });
        })
    }

    handleMessages(handler) {
        this.socket.on('message', (message) => {
            handler(JSON.parse(message))
        })
    }
}

export default new SocketApi();