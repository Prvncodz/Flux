require('dotenv').config();
const express = require("express");
const cors=require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
let quotes = [
  { text: "Push yourself, no one else is going to do it for you." },
  { text: "Great things never come from comfort zones." },
  { text: "Dream it. Wish it. Do it." }
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
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));

