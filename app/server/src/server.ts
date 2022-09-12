import express from "express";
import config from 'config';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from "socket.io";
import { getCatFact } from "./apiGetter";

const app = express();
const port = 3001;
const httpServer = http.createServer(app);
app.use(express.static("public"));
app.use(cors(config.get('cors')));
const io = new Server({
  pingInterval: config.get('sockets.pingInterval'),
  pingTimeout: config.get('sockets.pingTimeout'),
  cors: config.get('cors'),
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


httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
