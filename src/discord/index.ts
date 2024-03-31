// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { onMessageCreated } from "./events";
// Create a new client instance
export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

export const setupClient = async () => {
  client.once(Events.ClientReady, (readyClient: { user: { tag: any } }) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  client.on(Events.MessageCreate, await onMessageCreated);
  
  client.login(process.env.DISCORD_TOKEN);
  return client;
};
