const MediumSpeed = require("./messageHandler/MediumSpeed");


module.exports = function (window, dev, mp4Reader) {
    const {Server} = require("socket.io");

    const MediumSpeed = require('./messageHandler/MediumSpeed')
    const io = new Server(3001, {
        maxHttpBufferSize: 1e8,
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    const mediumSpeed = new MediumSpeed(io)
    const can = require('socketcan');
    const channel = can.createRawChannel("can0", true);
    channel.addListener("onMessage", function ({data, id}) {
        MediumSpeed.parseMessage(data, id);
    });
    channel.start()


    io.on("connection", (socket) => {
        console.log("connection in server!!!!!")
        // send a message to the client
        socket.emit("hello from server", 1, "2", {3: Buffer.from([4])});

        // receive a message from the client
        socket.on("hello from client", (...args) => {
            // ...
        });

        socket.on('devMessage', (data) => {
            mediumSpeed.socketDev.feedData(data)
        })
    })

    setInterval(() => {
        io.emit('time', {minutes: new Date().getMinutes(), seconds: new Date().getSeconds()})
    })
}