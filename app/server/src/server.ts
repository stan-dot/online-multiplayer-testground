import express from "express";
import http from 'http';
import { Server, Socket } from "socket.io";
import { getCatFact } from "./apiGetter";

const app = express();
const port = 3001;
const httpServer = http.createServer(app);
app.use(express.static("public"));

const io = new Server({
  pingInterval: 50000,
  pingTimeout: 50000,
});
let users: any[] = [];

io.attach(httpServer);

io.on('connection', (socket) => {
  console.log("made socket connection", socket.id);
  socket.on("join", (data) => {
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

app.get('/', (req, res) => {
  res.send('Hello world!');
})

app.get('/api/cats', (req, res) => {
  console.log('cat request');
  getCatFact().then((someFacxt) => {
    console.log('got the fact');
    res.json(someFacxt);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
