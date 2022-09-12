let users: any[] = [];

io.attach(httpServer);

io.on('connection', (socket) => {
  console.log("made socket connection", socket.id);
  socket.on("join", (data) => {
    if (users.length > 4) {
      users = []
    }
    users.push(data);
    io.sockets.emit("join", data);
  });

  socket.on("joined", () => {
    socket.emit("joined", users);
  });

  socket.on("rollDice", (data) => {
    users[data.id].pos = data.pos;
    const turn = data.num != 6 ? (data.id + 1) % users.length : data.id;
    io.sockets.emit("rollDice", data, turn);
  });

  socket.on("restart", () => {
    users = [];
    io.sockets.emit("restart");
  });
});