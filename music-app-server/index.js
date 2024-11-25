const express = require("express");
const client = require("./config/db");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
// Test connection route
app.get("/", async (req, res) => {
  res.json("Hello world");
});

// Get user by gmail
app.get("/user/:gmail", async (req, res) => {
  const gmail = req.params.gmail;
  const user = await client.db("dbMusicApp").collection("users").findOne({ gmail: gmail });
  res.json(user);
});

//Get collection by id
app.get("/collection/:id", async (req, res) => {
  const id = req.params.id;
  const collection = await client.db("dbMusicApp").collection("collections").findOne({ id: id });
  res.json(collection);
});

// Get topsong by type
app.get("/topSong/:type", async (req, res) => {
  const type = req.params.type;
  const topSong = await client.db("dbMusicApp").collection("topsong").findOne({ type: type });
  res.json(topSong);
});


// Add song to collection
app.post("/addSongToCollection", async (req, res) => {
  const { gmail, collectionId, songId } = req.body;
  const user = await client.db("dbMusicApp").collection("users").findOne({ gmail: gmail });
  res.json(user);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});


// https://ibb.co/d0K7bq6
// https://ibb.co/QrJKMxx
// https://ibb.co/VJ5THYG
// https://ibb.co/kBhyXCp
