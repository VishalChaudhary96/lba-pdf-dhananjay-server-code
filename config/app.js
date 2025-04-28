const cors = require("cors");
const express = require("express");
const path = require("path");

module.exports = (app) => {
  // Enable CORS for cross-origin requests
  app.use(cors());

  // Parse incoming JSON data
  app.use(express.json());

  // Parse URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  // Add additional global middleware if needed
  console.log("App configurations loaded");
};
