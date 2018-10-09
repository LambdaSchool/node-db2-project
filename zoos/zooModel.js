const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();
