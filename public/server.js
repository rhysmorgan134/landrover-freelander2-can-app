

module.exports = function (window, dev, mp4Reader) {
    const {Server} = require("socket.io");

    const io = new Server(3001, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("connection")
        // send a message to the client
        socket.emit("hello from server", 1, "2", {3: Buffer.from([4])});

        // receive a message from the client
        socket.on("hello from client", (...args) => {
            // ...
        });
    })

    setInterval(() => {
        io.emit('time', {minutes: new Date().getMinutes(), seconds: new Date().getSeconds()})
    })
}