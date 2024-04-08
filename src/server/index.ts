// import express from "express";
const express = require('express');

// import * as WebSocket from 'ws';

// import { RACELAB_PORT } from "../main/const";

const RACELAB_PORT = 8080;
const app = express();

const overlayHostPort = RACELAB_PORT;
const overlayHostUrl = `http://localhost:${overlayHostPort}`;


app.listen(RACELAB_PORT, () => {
    console.log(`backend server is listening on port ${RACELAB_PORT}`);
})

app.get("/", (req, res) => {
    res.send("Express Server is working now!");
})