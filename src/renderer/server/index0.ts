import { RACELAB_PORT } from "../../main/const";
import express from "express";
import irsdk from "node-irsdk";
import * as WebSocket from "ws";
import YAML from "yaml";
import { frontendRouter } from "~/server/frontend";
import { giftedMembershipRouter } from "~/server/routes/giftedmembership/giftedMembershipRouter";

const app = express();

export const overlayHostPort = RACELAB_PORT;
export const overlayHostUrl = `http://localhost:${overlayHostPort}`;

irsdk.init({
  telemetryUpdateInterval: 100,
  sessionInfoUpdateInterval: 100,
  sessionInfoParser: (a: any) => {
    // BEGIN temporarly fix for parsing error when team or driver name starts with @ symbol
    var find = ": @";
    var re = new RegExp(find, "g");
    const aReplaced = a.replace(re, ": ");
    // END temporarly fix

    return YAML.parse(aReplaced);
  },
});

const iracing = irsdk.getInstance();

// --- Mount the api route
// app.use("/api", apiRouter);

// app.use("/auth", authRouter);

// --- Mount the static route, for serving frontend files :
// app.use("/", frontendRouter);

app.listen(overlayHostPort, () => {
  console.log(`backend server is listening on port ${overlayHostPort}!`);
});

app.use("/", frontendRouter);

app.use("/gifted", giftedMembershipRouter);

export let webSocketsSS: {
  [key: string]: {
    clients: { [key: string]: WebSocket };
    listeningOnClients: { [key: string]: boolean };
  };
} = {};
