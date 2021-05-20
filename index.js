// obj to require that the package express be used with this obj
const express = require("express");
const app = express();
const { id } = require("./services");

// app.use in order to use middleware from express npm package
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`);
});

const { destinations } = require("./db");

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
app.post("/destinations", (req, res) => {
  // req.query.search
  console.log(req.body);
  //   res.send("Post route exists and is being hit");

  const { name, location, photo } = req.body;
  console.log(name);
  //   // validation
  //   if (name === undefined || location === undefined) {
  //     return res.status(400).send({ error: "name and location are required" });
  //   }

  destinations.push({
    name: name,
    location: location,
    photo: photo !== undefined ? photo : "",
  });
  res.send({ status: "success" });
});

// add the user data in my db

app.delete("/destinations", (req, res) => {
  const { uid } = req.params;

  const filtered = destinations.filter((dest) => {
    if (dest.id !== id) {
      return true;
    }
  });

  destinations = filtered;
});
