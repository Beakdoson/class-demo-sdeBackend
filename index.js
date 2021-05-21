// obj to require that the package express be used with this obj
// dotenv syntax as is
// const obj's
require("dotenv").config();
const express = require("express");
const app = express();
const { generateUID } = require("./services");
const fetch = require("node-fetch");
const cors = require("cors");
const API_KEY = process.env.API_KEY;
const { response } = require("express");
const PORT = process.env.PORT || 3000;

// app.use in order to use middleware from express npm package
app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`);
});

let { destinations } = require("./db");

app.get("/destinations", (req, res) => {
  res.send(destinations);
});

// GET /search?name="tower"
app.get("/search", (req, res) => {
  const name = req.query.name;

  // loop over destinations and return the ones with the name matching what the client wants

  const matches = [];
  for (let dest of destinations) {
    if (dest.name === name) {
      matches.push(dest);
    }
  }

  // send matches to the client
  res.send(matches);
});

// CRUD = CREATE, READ, UPDATE, DELETE
// POST =
// async function
app.post("/destinations", async (req, res) => {
  // req.query.search
  console.log(req.body);

  const { name, location } = req.body;
  console.log(name);
  //   // validation
  //   if (name === undefined || location === undefined) {
  //     return res.status(400).send({ error: "name and location are required" });
  //   }

  // Unsplash URL with my client API key
  const URL = `https://api.unsplash.com/photos/?client_id=${API_KEY}`;

  // const API_KEY = process.env.API_KEY

  // pick a random photo from unsplash to the array
  //
  fetch(URL)
    .then((response) => response.json())
    .then((photo) => {
      // console.log(photo[Math.floor(Math.random() * photo.length)].urls.full);
      const myPhoto = photo[Math.floor(Math.random() * photo.length)].urls.full;

      // push oject to db.js
      const pushObj = {
        id: generateUID(),
        name: name,
        location: location,
        photo: myPhoto,
      };
      destinations.push(pushObj);
    });
  res.send("Post route exists and is being hit");
});

// add the user data in my db

app.delete("/destinations/:uid", (req, res) => {
  const { uid } = req.params;

  let filtered = destinations.filter((dest) => {
    if (dest.id !== uid) {
      return true;
    }
  });

  destinations = filtered;
  res.send("Location has been deleted");
});

app.put("/destinations/:id", (req, res) => {
  const { id } = req.params;

  const { name, location, photo } = req.body;
  if (!name && !location && !photo) {
    return res.status(400).json({ status: "no data to update" });
  }

  for (let dest of destinations) {
    if (dest.id === id) {
      dest.name = name ? name : dest.name;
      dest.location = location ? location : dest.location;
      dest.photo = photo ? photo : dest.location;
      console.log(dest.name, dest.location, dest.photo);
    }
  }
  console.log(req.body);
  res.send("Put request completed");
});
