import { ChannelType, type Message } from "discord.js";
import { respond } from "@llm/index";
export const onMessageCreated = async (message: Message) => {
  if (message.author.bot) return;
  if (!message.content) return;
  if (message.content === "DELETE") {
    if (message.channel.type === ChannelType.GuildText) {
      let messages = await message.channel.messages.fetch({ limit: 100 });
      message.channel.bulkDelete(messages);
    } else {
      console.log("Bulk delete is not supported in this channel type.");
    }
    return;
  }
  const messageCtx = await message.reply('I`m generating your message...');

  const resp = (await respond(message.content)) as string;
  if (!resp) message.reply('Sorry, I don`t know how to respond to this question. Can you try another one?')
  messageCtx.edit(resp)
  return;
};
