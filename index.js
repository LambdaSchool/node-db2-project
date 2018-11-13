const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db("zoos")
    .insert(zoo)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error posting to zoos" });
    });
});

server.get("/api/zoos", (req, res) => {
  db("zoos").then(zoos => {
    res.status(200).json(zoos);
  });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
