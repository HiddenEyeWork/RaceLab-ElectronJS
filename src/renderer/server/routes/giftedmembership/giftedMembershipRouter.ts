import express from "express";

// import { RendererEvents } from "~/server/events/RendererEvents";

export const giftedMembershipRouter = express.Router();

// define the home page route
giftedMembershipRouter.get("/success", async function (req: any, res: any) {
  // RendererEvents.giftedSubscriptionSuccess.emit();
  // RendererEvents.bringAppToFocus.emit();
  console.log("gift works");
  res.send("works");
});

giftedMembershipRouter.get("/abort", async function (req: any, res) {
  // RendererEvents.giftedSubscriptionCancelled.emit();
  // RendererEvents.bringAppToFocus.emit();
  console.log("gift works");
  res.send("works");
});
