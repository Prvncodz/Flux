require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
let quotes = [
  "Push yourself, no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it."
];

app.get("/", (req, res) => {
  res.send("Welcome to Quote Api 🚀");
});

app.get("/quotes",(req,res) => {
 res.json(quotes);
});
app.get("/quotes/random",(req,res) => {
 const randidx=Math.floor(Math.random()*quotes.length);
 res.json(quotes[randidx]);
});
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
