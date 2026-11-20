import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

// Pendo Agent Analytics: records the Tripwise Assistant's turns and their Anthropic calls. Runs before the server
// starts. Set PENDO_DISABLED=true in the environment to turn it off.
pendo.init({
  apiKey: "edc5701b-2515-4248-8b9a-eafb54e93c17",
  agentId: "q0DyUH7OjvEL-2OajrkajYkzMWU",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

/** Sends the Pendo events still buffered, then exits. */
async function stop(): Promise<void> {
  await pendo.shutdown();
  process.exit(0);
}

process.on("SIGINT", () => void stop());
process.on("SIGTERM", () => void stop());
