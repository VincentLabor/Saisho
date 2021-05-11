const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  //Req query receives the params from the front end.
  const response = await fetch(
    `https://api.jikan.moe/v3/search/anime?q=${req.query.id}&page=1`
  );
  res.json(await response.json());
  const name = req.body.name;
  console.log(name);

  console.log(req.body.query);
});



app.use("/anime/", async (req, res, next) => {
  const response = await fetch(
    `https://api.jikan.moe/v3/anime/${req.query.id}`
  );
  res.json(await response.json());
  console.log("Hello");
  next();
});

app.listen(5000, () => {
  console.log(`listening on port 5000`);
});
