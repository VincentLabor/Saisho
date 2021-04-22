const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors');



app.use(cors());


app.get("/", async(req,res)=>{
  const response = await fetch("https://api.jikan.moe/v3/anime/1")
  res.json(await response.json());
console.log(response.json);
})

  app.listen(5000, () => {
    console.log(`listening on port 5000`)
  });