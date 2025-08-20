import { createAgent, grok } from '@inngest/agent-kit';
import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { getSandbox } from './utils';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-jovi");
      return sandbox.sandboxId;
    })      

    const summarizer = createAgent({
      name: 'summarizer',
      system:
        "You are a summarizer. You are given a text and you need to summarize it.",
      model: grok({ model: "grok-4" }),
    });

    const { output } = await summarizer.run(
      'Summarize the following text: ' + event.data.value
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000)
      return `http://${host}`;
    })

    return { output, sandboxUrl };
  },
);