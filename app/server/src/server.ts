import express from "express";
import { getCatFact } from "./apiGetter";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
})

app.get('/cats', (req, res) => {
  console.log('cat request');
  getCatFact().then((someFacxt) => {
    console.log('got the fact');
    res.json(someFacxt);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
