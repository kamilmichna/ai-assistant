import { ChatGroq } from "@langchain/groq";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { prompt } from "./prompt";
const tools: any = [
  new WikipediaQueryRun({
    topKResults: 5,
    maxDocContentLength: 100,
  }),
];

const model = new ChatGroq({
  apiKey: process.env.LLM_KEY,
  modelName: "mixtral-8x7b-32768",
});

const agent = await createStructuredChatAgent({
  llm: model,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
  returnIntermediateSteps: true,
});

export const respond = async (message: string) => {
  try {
    const res = await agentExecutor.invoke({
      input: message,
      username: process.env.USERNAME,
      date: new Date().toDateString()
    });
    console.log(JSON.stringify(res, null, 2));
    console.log("OUTPUT", res.output)
    return res.output?.final_response || res.output;
  } catch (e) {
    console.error(e);
    return "There was a problem with LLM response";
  }
};
